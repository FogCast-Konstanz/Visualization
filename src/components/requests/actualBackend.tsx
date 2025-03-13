import axios from "axios";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { API_BASE_URL, formatGermanDate } from "./helpers";

type ActualResponseFormat = {
    date: string,
    name: string,
    quality: string,
    value: string
};

export async function fetchTemperatureHistoryDWD(start: string, stop: string, frequency: "daily" | "hourly" | "10-minutes"): Promise<ActualResponseFormat[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/actual/temperature-history`, {
            params: { start: start, stop: stop, frequency: frequency },
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (typeof (data) == 'string') {
            data = data.replace(/NaN/g, "null");
            data = JSON.parse(data)
        }

        return data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};


export async function fetchFogDaysHistoryDWD(start: string, stop: string, frequency: "monthly" | "yearly"): Promise<ActualResponseFormat[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/actual/fog-count-history`, {
            params: { start: start, stop: stop, frequency: frequency },
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (typeof (data) == 'string') {
            data = data.replace(/NaN/g, "null");
            data = JSON.parse(data)
        }

        return data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};


export async function fetchWaterLevelHistory(): Promise<ActualResponseFormat[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/actual/water-level-history`, {
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (typeof (data) == 'string') {
            data = data.replace(/NaN/g, "null");
            data = JSON.parse(data)
        }

        return data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};

export async function fetchActualWeather(): Promise<ActualResponseFormat[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/actual/live-data`, {
            headers: { Accept: "application/json" },
        });
        
        return response.data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};


export function convertToPlotlyGraph(response: ActualResponseFormat[], name?: string): PlotlyChartBasicFormat {
    return {
        x: response.map(entry => new Date(entry.date).toISOString()),
        y: response.map(entry => parseFloat(entry.value)),
        name: name ? name : response[0].name
    };
}
