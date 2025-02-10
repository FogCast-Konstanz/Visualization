import axios from "axios";

const API_BASE_URL = "https://dwd.api.proxy.bund.dev/v30";

import { LineGraphData } from "../plotly/LineGraph";
import { ForcastCardProps } from "@/pages/startingPage/ForcastCard";

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

class DWDForcast {
  private static instance: DWDForcast;
  private temperatureHourly: LineGraphData | null = null;
  private humidityHourly: LineGraphData | null = null;

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
      const response = await axios.get(`${API_BASE_URL}/stationOverviewExtended`, {
        params: { stationIds: stationId },
        headers: { Accept: "application/json" },
      });

      this.temperatureHourly = this.extractTermperatureHourly(response.data);
      this.humidityHourly = this.extractHumidityHourly(response.data)
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

    let formattedData: ForcastCardProps[] = [];
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

  getHourlyForcastValuesIcon(): ForcastCardProps[] {
    if (this.hourlyForcastWithIcons) {
      return this.hourlyForcastWithIcons
    }
    return []
  }
}

export default DWDForcast.getInstance();
