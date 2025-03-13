
import axios from "axios";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { API_BASE_URL, formatGermanDate } from "./helpers";

type ForecastData = {
    _time: string;
    apparent_temperature: number;
    model: string;
    relative_humidity_2m: number;
};

export type ExtractedForecastData = {
    time: string[];
    temperature: number[];
    humidity: number[];
    name: string
}

export async function fetchForecast(datetime: string, modelId: string,): Promise<ForecastData[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/forecasts`, {
            params: { datetime: datetime, model_id: modelId },
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (typeof (data) == 'string') {
            data = data.replace(/NaN/g, "null");
            data = JSON.parse(data)
        }

        return data
    } catch (error) {
        console.error("Error fetching forecast:", error);
        throw error;
    }
};


export function reformatDataofForecastBackend(forcastData: ForecastData[]): ExtractedForecastData {
    return {
        time: forcastData.map(entry => new Date(entry._time).toISOString()),
        temperature: forcastData.map(entry => entry.apparent_temperature),
        humidity: forcastData.map(entry => entry.relative_humidity_2m),
        name: forcastData[0].model
    };
}

// export function extractTemperatureAndModelOutOfForcast(forcastData: ForecastData[]): PlotlyChartBasicFormat {
//     return {
//         x: forcastData.map(entry => formatGermanDate(entry._time)),
//         y: forcastData.map(entry => entry.apparent_temperature),
//         name: forcastData[0].model
//     };
// }

// export function extractHumidityAndModelOutOfForecast(forcastData: ForecastData[]): PlotlyChartBasicFormat {
//     return {
//         x: forcastData.map(entry => formatGermanDate(entry._time)),
//         y: forcastData.map(entry => entry.relative_humidity_2m),
//         name: forcastData[0].model
//     };
// }

export async function fetchModels(): Promise<string[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/models`, {
            headers: { Accept: "application/json" },
        });

        return response.data
    } catch (error) {
        console.error("Error fetching models:", error);
        throw error;
    }
};