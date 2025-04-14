import { ForcastCardProps } from "@/pages/startingPage/ForcastCard";
import axios from "axios";
import { PlotlyChartBasicFormat } from "../../plotly/PlotlyChartFormat";

const DWD_BASE_URL = "https://dwd.api.proxy.bund.dev/v30";

const weatherIcons: Record<number, string> = {
  1: "sunny", 2: "mostlySunny", 3: "partlySunny", 4: "cloudy",
  5: "rainy", 6: "thunder", 7: "rainy", 8: "foggy"
};

const weatherSymbols: Record<number, { day: string; night: string }> = {
  1: { day: "🌞", night: "🌙" }, 2: { day: "🌤️", night: "🌖" },
  3: { day: "⛅️", night: "🌘" }, 4: { day: "☁️", night: "☁️" },
  5: { day: "🌧️", night: "🌧️" }, 6: { day: "⛈️", night: "⛈️" },
  7: { day: "🌨️", night: "🌨️" }, 8: { day: "🌫️", night: "🌫️" }
};

class DWDForcast {
  private static instance: DWDForcast = new DWDForcast();
  private temperatureHourly: PlotlyChartBasicFormat | null = null;
  private humidityHourly: PlotlyChartBasicFormat | null = null;
  private weatherSymbolsHourly: PlotlyChartBasicFormat | null = null;
  private hourlyForcastWithIcons: ForcastCardProps[] | null = null;

  private constructor() { }

  static getInstance(): DWDForcast {
    return DWDForcast.instance;
  }

  async fetchData(stationId: string): Promise<void> {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/dwd-proxy`, {
        params: { url: `${DWD_BASE_URL}/stationOverviewExtended`, stationIds: stationId },
        headers: { Accept: "application/json" },
      });

      this.temperatureHourly = this.extractHourlyData(data, "temperature", "Temperature", 10);
      this.humidityHourly = this.extractHourlyData(data, "humidity", "Humidity", 10);
      this.weatherSymbolsHourly = this.extractWeatherSymbolsHourly(data);
      this.hourlyForcastWithIcons = this.extractHourlyForcast(data);

      console.log(this.hourlyForcastWithIcons)
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  }

  private extractHourlyData(data: any, key: string, name: string, divisor = 1): PlotlyChartBasicFormat {
    const { start, timeStep } = data[Object.keys(data)[0]].forecast1;
    return {
      x: Array.from({ length: data[Object.keys(data)[0]].forecast1[key].length }, (_, i) => new Date(start + i * timeStep).toISOString()),
      y: data[Object.keys(data)[0]].forecast1[key].map((v: number) => v / divisor),
      name,
    };
  }

  private extractWeatherSymbolsHourly(data: any): PlotlyChartBasicFormat {
    const { start, timeStep, isDay, icon, temperature } = data[Object.keys(data)[0]].forecast1;
    return {
      x: temperature.map((_: any, i: number) => new Date(start + i * timeStep).toISOString()),
      y: icon.map((v: number, i: number) => (isDay[i] ? weatherSymbols[v]?.day : weatherSymbols[v]?.night) || "❔"),
      name: "symbol",
    };
  }

  private extractHourlyForcast(data: any): ForcastCardProps[] {
    const { start, timeStep, temperature, humidity, icon1h, isDay } = data[Object.keys(data)[0]].forecast1;
    
    return temperature.map((temp: number, i: number) => ({
      time: new Date(start + i * timeStep),
      temperature: `${temp / 10}`,
      weather: weatherIcons[icon1h[i]] || "unknown",
      humidity: `${humidity[i] / 10}`,
      isDay: isDay[i],
    })).filter((entry: ForcastCardProps) => entry.temperature && entry.humidity && entry.weather);
  }

  private filterNextXDays(times: string[], values: any[], days: number): { times: string[]; values: any[] } {
    const now = new Date();
    const limit = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const firstIndex = times.findIndex(t => new Date(t) > now);
    const lastIndex = times.findIndex(t => new Date(t) > limit);
    return { times: times.slice(firstIndex, lastIndex), values: values.slice(firstIndex, lastIndex) };
  }

  getHourlyValues(): PlotlyChartBasicFormat[] {
    return [this.temperatureHourly, this.humidityHourly].filter(Boolean) as PlotlyChartBasicFormat[];
  }

  getNextXDaysValues(days: number): PlotlyChartBasicFormat[] {
    return this.getHourlyValues().map(({ x, y, name }) => ({ x: this.filterNextXDays(x, y, days).times, y: this.filterNextXDays(x, y, days).values, name }));
  }

  getNextXDaysTemperature(days: number): PlotlyChartBasicFormat | null {
    return this.temperatureHourly ? this.getNextXDaysValues(days).find(d => d.name === "Temperature") || null : null;
  }

  getNextXDaysHumidity(days: number): PlotlyChartBasicFormat | null {
    return this.humidityHourly ? 
    this.getNextXDaysValues(days).find(d => d.name === "Humidity") || null : null;
  }

  getWeatherSymbolsHourlyNextXDays(days: number): PlotlyChartBasicFormat | null {
    console.log(this.weatherSymbolsHourly)
    if (!this.weatherSymbolsHourly || !this.temperatureHourly) return null;
    const { times, values } = this.filterNextXDays(this.weatherSymbolsHourly.x, this.weatherSymbolsHourly.y, days);
    
    return { 
      x: times, 
      y: Array(times.length).fill(Math.max(...this.temperatureHourly.y) + 5), 
      name: this.weatherSymbolsHourly.name, text: values 
    };
  }

  getHourlyForcastValuesIcon(days?: number): ForcastCardProps[] {
    if (!this.hourlyForcastWithIcons) return [];
    if (!days) return this.hourlyForcastWithIcons;
    
    /** Filter the current Time */
    const now = new Date();
    const limit = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return this.hourlyForcastWithIcons.filter(forecast => {
      return forecast.time <= limit && forecast.time > now;
    });
  }
}

export default DWDForcast.getInstance();
