import axios from "axios";
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { API_BASE_URL, formatGermanDate } from "./helpers";

type CurrentForecastResponseFormat = {
    apparent_temperature: number,
    cape: number,
    cloud_cover_high: number,
    cloud_cover_low: number,
    cloud_cover_mid: number,
    forecast_date: number,
    weather_code: number,
    is_day: number,
    rain: number,
    relative_humidity_2m: number,
    
};

export async function fetchCurrentForecast(modelId: string): Promise<CurrentForecastResponseFormat[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/current-forecast`, {
            params: { model_id: modelId },
            headers: { Accept: "application/json" },
        });

        console.log(response.data)
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


export function extractCurrentWeatherForecastHourly(
    data: CurrentForecastResponseFormat[],
    key: keyof CurrentForecastResponseFormat,
    name: string
): PlotlyChartBasicFormat {

    return {
        x: data.map(entry => new Date(entry.forecast_date).toISOString()), // Use forecast_date
        y: data.map(entry => entry[key]), // Extract and adjust values
        name,
    };
}

export function extractCurrentWeatherForecastHourlyLastXDays(
    data: CurrentForecastResponseFormat[],
    key: keyof CurrentForecastResponseFormat,
    name: string,
    days: number,  // Number of days to look back
): PlotlyChartBasicFormat {

    const endTime = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000);
    const startTime = new Date();

    const filteredData = data.filter(entry => {
        const entryTime = new Date(entry.forecast_date);
        return entryTime >= startTime && entryTime <= endTime;
    });

    return {
        x: filteredData.map(entry => new Date(entry.forecast_date).toISOString()), 
        y: filteredData.map(entry => entry[key]),
        name,
    };
}