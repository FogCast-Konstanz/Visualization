import axios from "axios";
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { BACKEND_API_URL } from "../constants";
import { formatStationDatetime, toUtcIsoString } from "../time";

export type StationResponseFormat = {
    time: string,
    humidity: number,
    temperature: number,
    water_temperature: number
};

// Format of timestamps: 2024-05-22T23:59:59Z
export async function fetchStationData(startTime: Date, stopTime: Date): Promise<StationResponseFormat[]> {
    const startString = formatStationDatetime(startTime);
    const stopString = formatStationDatetime(stopTime);

    try {
        const response = await axios.get(`${BACKEND_API_URL}/weatherstation`, {
            params: { start: startString, stop: stopString },
            headers: { Accept: "application/json" },
        });

        return response.data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};

export async function fetchCurrentStationData(): Promise<StationResponseFormat | null> {
    
    // TODO: Fix this!!!
    const now = new Date("2025-01-01T00:00:00")
    const future = new Date("2100-01-01T00:00:00")
    
    const data = await fetchStationData(now, future)

    if (data.length > 0) {
        return data[0]
    }
    return null
}