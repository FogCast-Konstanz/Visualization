
import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { toUtcIsoString } from "../time";

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
        const response = await axios.get(`${BACKEND_API_URL}/forecasts`, {
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
        time: forcastData.map(entry => toUtcIsoString(new Date(entry._time))),
        temperature: forcastData.map(entry => entry.apparent_temperature),
        humidity: forcastData.map(entry => entry.relative_humidity_2m),
        name: forcastData[0].model
    };
}

// TODO: Typisierung anpassen!
export function extractHistoricForecastHourly(
    data: any[],
    key: string,
    name: string
): PlotlyChartBasicFormat {

    return {
        x: data.map(entry => toUtcIsoString(new Date(entry._time))), // Use forecast_date
        y: data.map(entry => entry[key]), // Extract and adjust values
        name,
    };
}

export async function fetchModels(): Promise<string[]> {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/models`, {
            headers: { Accept: "application/json" },
        });

        return response.data
    } catch (error) {
        console.error("Error fetching models:", error);
        throw error;
    }
};