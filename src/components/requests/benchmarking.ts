import axios from "axios";
import { BACKEND_API_URL } from "../constants";

export type BenchmarkingResponseFormat = {
    cloud_cover: number,
    dew_point_2m: number,
    forecast_date: string,
    lead_time: string,
    model: string,
    precipitation: number,
    relative_humidity_2m: number,
    result: "_result",
    surface_pressure: number,
    table: number,
    temperature_2m: number
};


export async function fetchBenchmarking(time_range: '1d' | '4d' | '7d' | '15d' | '30d'): Promise<BenchmarkingResponseFormat[]> {

    try {
        const response = await axios.get(`${BACKEND_API_URL}/models/benchmarking`, {
            params: { time_range: time_range },
            headers: { Accept: "application/json" },
        });

        let data = response.data
        if (typeof (data) == 'string') {
            data = data.replace(/NaN/g, "null");
            data = JSON.parse(data)
        }

        console.log('miau', data)

        return data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};