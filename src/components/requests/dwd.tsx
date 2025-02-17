
import axios from "axios";
import { API_BASE_URL } from "./helpers";

const DWD_BASE_URL = "https://dwd.api.proxy.bund.dev/v30";

type ForecastData = {
    [stationId: string]: {
        forecast1: {
            stationId: string;
            start: number;
            timeStep: number;
            temperature: number[];
            humidity: number[];
        };
    };
};

export const fetchForecast = async (stationId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dwd-proxy`, {
            params: { 
                url: `${DWD_BASE_URL}/stationOverviewExtended`,
                stationIds: stationId
             },
            headers: { Accept: "application/json" },
        });

        console.log(response.data)
        const forcastData = transformForecastData(response.data);
        console.log(forcastData)
        return [forcastData]
    } catch (error) {
        console.error("Error fetching forecast:", error);
        throw error;
    }
};



function transformForecastData(data: ForecastData): {x: string[], y: number[], name: string} {
    const stationId = Object.keys(data)[0];
    const forecast = data[stationId].forecast1;
    const startDate = new Date(forecast.start);
    const timeStep = forecast.timeStep;

    const x = forecast.temperature.map((_, index) => {
        // const date = new Date(startDate.getTime() + index * timeStep);
        const date = new Date(startDate.getTime() + index * timeStep);
        return date.toISOString(); // Formats as DD.MM.YYYY
    });

    const y = forecast.temperature.map((temp) => {
        const temperatureNew = temp / 10
        return temperatureNew;
    });

    return {
        x,
        y,
        name: "Model 1",
    };
};
