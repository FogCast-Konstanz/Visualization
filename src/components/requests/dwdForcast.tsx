import axios from "axios";
import { API_BASE_URL } from "./helpers";

const DWD_BASE_URL = "https://dwd.api.proxy.bund.dev/v30";

import { ForcastCardProps } from "@/pages/startingPage/ForcastCard";
import { LineGraphData } from "../plotly/LineGraph";

const weatherIcons: { [key: number]: "cloudy" | "rainy" | "sunny" | "partlySunny" | "mostlySunny" | "foggy" | "thunder" | "snowy" | "unkown" } = {
  1: "sunny",
  2: "mostlySunny",
  3: "partlySunny",
  4: "cloudy",
  5: "rainy",
  6: "thunder",
  7: "snowy",
  8: "foggy",
};


const weatherSymbols: { [key: number]: string } = {
  1: "🌞", // Clear sky
  2: "🌤️", // Few clouds
  3: "⛅️", // Scattered clouds
  4: "☁️", // Cloudy
  5: "🌧️", // Rainy
  6: "⛈️", // Thunderstorm
  7: "❄️", // Snowy
  8: "🌫️", // Foggy
};
class DWDForcast {
  private static instance: DWDForcast;
  private temperatureHourly: LineGraphData | null = null;
  private humidityHourly: LineGraphData | null = null;
  private weatherSymbolsHourly: LineGraphData | null = null;

  private hourlyForcastWithIcons: ForcastCardProps[] | null = null

  private constructor() { }

  static getInstance(): DWDForcast {
    if (!DWDForcast.instance) {
      DWDForcast.instance = new DWDForcast();
    }
    return DWDForcast.instance;
  }

  async fetchData(stationId: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/dwd-proxy`, {
        params: {
          url: `${DWD_BASE_URL}/stationOverviewExtended`,
          stationIds: stationId
        },
        headers: { Accept: "application/json" },
      });

      this.temperatureHourly = this.extractTermperatureHourly(response.data);
      this.humidityHourly = this.extractHumidityHourly(response.data);
      this.weatherSymbolsHourly = this.extractWeatherSymbolsHourly(response.data);
      this.hourlyForcastWithIcons = this.extractHourlyForcast(response.data)
      console.log(this.temperatureHourly)
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  }

  private extractTermperatureHourly(data: any): LineGraphData {
    const stationId = Object.keys(data)[0];
    const forecast = data[stationId].forecast1;
    const startDate = new Date(forecast.start);
    const timeStep = forecast.timeStep;

    const x = forecast.temperature.map((_: any, index: any) =>
      new Date(startDate.getTime() + index * timeStep).toISOString()
    );
    const y = forecast.temperature.map((temp: number) => temp / 10);

    return { x, y, name: "Temperature" };
  }


  private extractWeatherSymbolsHourly(data: any): LineGraphData {
    const stationId = Object.keys(data)[0];
    const forecast = data[stationId].forecast1;
    const startDate = new Date(forecast.start);
    const timeStep = forecast.timeStep;

    const x = forecast.temperature.map((_: any, index: any) =>
      new Date(startDate.getTime() + index * timeStep).toISOString()
    );
    const y = forecast.icon.map((value: any, index: any) =>
      weatherSymbols[value] || "❔",
    );
    return { x, y, name: "miau" };
  }

  private extractHumidityHourly(data: any): LineGraphData {
    const stationId = Object.keys(data)[0];
    const forecast = data[stationId].forecast1;
    const startDate = new Date(forecast.start);
    const timeStep = forecast.timeStep;

    const x = forecast.humidity.map((_: any, index: any) =>
      new Date(startDate.getTime() + index * timeStep).toISOString()
    );
    const y = forecast.humidity.map((hum: number) => hum / 100)

    return { x, y, name: "Humidity / 10" };
  }

  private extractHourlyForcast(data: any): ForcastCardProps[] {
    const stationId = Object.keys(data)[0];
    const forecast = data[stationId].forecast1;
    const { temperature, humidity, icon, start, timeStep } = forecast;

    const formattedData: ForcastCardProps[] = [];
    const currentTime = Date.now();

    for (let i = 0; i < temperature.length; i++) {
      const entryTime = start + i * timeStep;
      if (entryTime < currentTime) continue;
      if (!temperature[i] || !humidity[i] || !icon[i]) break;

      const time = new Date(start + i * timeStep).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });

      formattedData.push({
        time,
        temperature: `${temperature[i] / 10}`,
        weather: weatherIcons[icon[i]] || "unknown",
        humidity: `${humidity[i] / 10}`,
      });
    }

    return formattedData;
  }

  getTemperatureHourly() {
    return this.temperatureHourly;
  }

  getHourlyValues(): LineGraphData[] {
    if (this.humidityHourly && this.temperatureHourly) {
      return [this.temperatureHourly, this.humidityHourly]
    }
    return []
  }

  getWeatherSymbolsHourly(): LineGraphData | null {
    return this.weatherSymbolsHourly;
  }

  getWeatherSymbolsHourlyNextXDays(days: number) : LineGraphData | null {
    if (this.weatherSymbolsHourly) {
      const icons24 = this.filterNextXDays(this.weatherSymbolsHourly.x, this.weatherSymbolsHourly.y, days)
      
      return {x: icons24.times, y: icons24.values, name: this.weatherSymbolsHourly.name}
    }
    return null
  }


  filterNextXDays(times: string[], values: number[], days: number): {times: string[], values: number[]} {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    let firstIndex = times.findIndex(time => new Date(time) > now)
    let lastIndex = times.findIndex(time => new Date(time) > twentyFourHoursAgo);

    if (lastIndex === -1) {
      return {times: times, values: values}
    } else {
      return {times: times.slice(firstIndex, lastIndex), values: values.slice(firstIndex, lastIndex)}
    }
  }

  getNextXDaysValues(days: number): LineGraphData[] {
    if (this.humidityHourly && this.temperatureHourly && this.weatherSymbolsHourly) {
      const humidity24 = this.filterNextXDays(this.humidityHourly.x, this.humidityHourly.y, days)
      const temperature24 = this.filterNextXDays(this.temperatureHourly.x, this.temperatureHourly.y, days)
      
      return [{x: temperature24.times, y: temperature24.values, name: this.temperatureHourly.name}, {x: humidity24.times, y: humidity24.values, name: this.humidityHourly.name}]
    }
    
    return []
  }



  getHourlyForcastValuesIcon(): ForcastCardProps[] {
    if (this.hourlyForcastWithIcons) {
      return this.hourlyForcastWithIcons
    }
    return []
  }
}

export default DWDForcast.getInstance();
