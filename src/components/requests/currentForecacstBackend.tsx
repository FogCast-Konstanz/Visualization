import axios from "axios";
import { ModelOption } from "../elements/muiltiSelect/SelectMeasurements";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { BACKEND_API_URL } from "../constants";

export async function fetchCurrentForecast(modelId: string): Promise<CurrentForecastResponseFormat[]> {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/current-forecast`, {
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


export const weatherDataOptions: ModelOption[] = [
    { label: 'Apparent Temperature', value: 'apparent_temperature' },
    { label: 'CAPE', value: 'cape' },
    { label: 'Cloud Cover', value: 'cloud_cover' },
    { label: 'Cloud Cover High', value: 'cloud_cover_high' },
    { label: 'Cloud Cover Low', value: 'cloud_cover_low' },
    { label: 'Cloud Cover Mid', value: 'cloud_cover_mid' },
    { label: 'Dew Point 2m', value: 'dew_point_2m' },
    { label: 'Evapotranspiration', value: 'evapotranspiration' },
    { label: 'Freezing Level Height', value: 'freezing_level_height' },
    { label: 'Precipitation', value: 'precipitation' },
    { label: 'Pressure MSL', value: 'pressure_msl' },
    { label: 'Rain', value: 'rain' },
    { label: 'Relative Humidity 2m', value: 'relative_humidity_2m' },
    { label: 'Snow Depth', value: 'snow_depth' },
    { label: 'Snowfall', value: 'snowfall' },
    { label: 'Soil Moisture 0-1cm', value: 'soil_moisture_0_to_1cm' },
    { label: 'Soil Moisture 1-3cm', value: 'soil_moisture_1_to_3cm' },
    { label: 'Soil Moisture 3-9cm', value: 'soil_moisture_3_to_9cm' },
    { label: 'Soil Moisture 9-27cm', value: 'soil_moisture_9_to_27cm' },
    { label: 'Soil Moisture 27-81cm', value: 'soil_moisture_27_to_81cm' },
    { label: 'Soil Temperature 0cm', value: 'soil_temperature_0cm' },
    { label: 'Soil Temperature 6cm', value: 'soil_temperature_6cm' },
    { label: 'Soil Temperature 18cm', value: 'soil_temperature_18cm' },
    { label: 'Soil Temperature 54cm', value: 'soil_temperature_54cm' },
    { label: 'Sunshine Duration', value: 'sunshine_duration' },
    { label: 'Surface Pressure', value: 'surface_pressure' },
    { label: 'Temperature 2m', value: 'temperature_2m' },
    { label: 'Temperature 80m', value: 'temperature_80m' },
    { label: 'Temperature 120m', value: 'temperature_120m' },
    { label: 'Temperature 180m', value: 'temperature_180m' },
    { label: 'Vapour Pressure Deficit', value: 'vapour_pressure_deficit' },
    { label: 'Weather Code', value: 'weather_code' },
    { label: 'Wet Bulb Temperature 2m', value: 'wet_bulb_temperature_2m' },
    { label: 'Wind Direction 10m', value: 'wind_direction_10m' },
    { label: 'Wind Direction 80m', value: 'wind_direction_80m' },
    { label: 'Wind Direction 120m', value: 'wind_direction_120m' },
    { label: 'Wind Direction 180m', value: 'wind_direction_180m' },
    { label: 'Wind Gusts 10m', value: 'wind_gusts_10m' },
    { label: 'Wind Speed 10m', value: 'wind_speed_10m' },
    { label: 'Wind Speed 80m', value: 'wind_speed_80m' },
    { label: 'Wind Speed 120m', value: 'wind_speed_120m' },
    { label: 'Wind Speed 180m', value: 'wind_speed_180m' }
];

export type CurrentForecastResponseFormat = {
    apparent_temperature: number;
    cape: number;
    cloud_cover: number;
    cloud_cover_high: number;
    cloud_cover_low: number;
    cloud_cover_mid: number;
    dew_point_2m: number;
    evapotranspiration: number;
    freezing_level_height: number;
    precipitation: number;
    pressure_msl: number;
    rain: number;
    relative_humidity_2m: number;
    snow_depth: number;
    snowfall: number;
    soil_moisture_0_to_1cm: number;
    soil_moisture_1_to_3cm: number;
    soil_moisture_3_to_9cm: number;
    soil_moisture_9_to_27cm: number;
    soil_moisture_27_to_81cm: number;
    soil_temperature_0cm: number;
    soil_temperature_6cm: number;
    soil_temperature_18cm: number;
    soil_temperature_54cm: number;
    sunshine_duration: number;
    surface_pressure: number;
    temperature_2m: number;
    temperature_80m: number;
    temperature_120m: number;
    temperature_180m: number;
    vapour_pressure_deficit: number;
    weather_code: number;
    wet_bulb_temperature_2m: number;
    wind_direction_10m: number;
    wind_direction_80m: number;
    wind_direction_120m: number;
    wind_direction_180m: number;
    wind_gusts_10m: number;
    wind_speed_10m: number;
    wind_speed_80m: number;
    wind_speed_120m: number;
    wind_speed_180m: number;
    forecast_date: number;
    is_day: number;
};
