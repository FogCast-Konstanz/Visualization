import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { formatStationDatetime, toUtcIsoString } from "../time";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";

export type StationResponseFormat = {
    time: string,
    humidity: number,
    temperature: number,
    water_temperature: number
};

// Format of timestamps: 2024-05-22T23:59:59Z
export async function fetchStationData(startTime: Date, stopTime: Date): Promise<StationResponseFormat[] | null> {
    const startString = formatStationDatetime(startTime);
    const stopString = formatStationDatetime(stopTime);

    try {
        const response = await axios.get(`${BACKEND_API_URL}/weatherstation`, {
        // const response = await axios.get(`https://fogcast.in.htwg-konstanz.de/api/weatherstation`, {
            params: { start: startString, stop: stopString },
            headers: { Accept: "application/json" },
        });

        return response.data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        return null
    }
};

export async function fetchCurrentStationData(): Promise<StationResponseFormat | null> {

    // Request data from a week ago
    const now = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    const future = new Date("2100-01-01T00:00:00")

    const data = await fetchStationData(now, future)

    if (data && data.length > 0) {
        return data[data.length - 1]
    }
    return null
}

export function parseWeatherStationToXYFormat(response: StationResponseFormat[], value: 'temperature' | 'water_temperature' | 'humidity', name?: string): PlotlyChartBasicFormat {
    return {
        x: response.map(entry => toUtcIsoString(new Date(entry.time))),
        y: response.map(entry => entry[value]),
        name: name ? name : value
    };
}
