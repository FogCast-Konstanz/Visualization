
import axios from "axios";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { API_BASE_URL, formatGermanDate } from "./helpers";

type ForecastData = {
    _time: string;
    apparent_temperature: number;
    model: string;
    relative_humidity_2m: number;
};

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

export function extractTemperatureAndModelOutOfForcast(forcastData: ForecastData[]): PlotlyChartBasicFormat {
    console.log(typeof (forcastData), forcastData)

    return {
        x: forcastData.map(entry => formatGermanDate(entry._time)),
        y: forcastData.map(entry => entry.apparent_temperature),
        name: forcastData[0].model
    };
}

export function extractHumidityAndModelOutOfForecast(forcastData: ForecastData[]): PlotlyChartBasicFormat {
    console.log(typeof (forcastData), forcastData)

    return {
        x: forcastData.map(entry => formatGermanDate(entry._time)),
        y: forcastData.map(entry => entry.relative_humidity_2m),
        name: forcastData[0].model
    };
}


export async function fetchModels(): Promise<string[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/models`, {
            headers: { Accept: "application/json" },
        });

        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching models:", error);
        throw error;
    }
};