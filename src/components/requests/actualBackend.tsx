import axios from "axios";
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { BACKEND_API_URL } from "../constants";
import { toUtcIsoString } from "../time";

type ActualResponseFormat = {
    date: string,
    name: string,
    quality: string,
    unit: string,
    value: string
};


export async function fetchTemperatureHistoryDWD(start: string, stop: string, frequency: "daily" | "hourly" | "10-minutes"): Promise<ActualResponseFormat[]> {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/actual/temperature-history`, {
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
    // Date Format 2025-02-01 00:00:00
    try {
        const response = await axios.get(`${BACKEND_API_URL}/actual/fog-count-history`, {
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


export async function fetchWaterLevelHistory(start: string, stop: string): Promise<ActualResponseFormat[]> {
    try {
        const response = await axios.get(`${BACKEND_API_URL}/archive/water-level`, {
            params: {
                start: start,
                stop: stop,
                station_id: 1
            },
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
        const response = await axios.get(`${BACKEND_API_URL}/actual/live-data`, {
            headers: { Accept: "application/json" },
        });

        return response.data
    } catch (error) {
        console.error("Error fetching actual data:", error);
        throw error;
    }
};


export async function fetchArchiveWeather(date: string, model: string): Promise<any> {
    // Date Format 2025-02-01 00:00:00

    try {
        const response = await axios.get(`${BACKEND_API_URL}/actual/archive`, {
            params: { model_id: model, date: date },
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


export function parseActualRequestToPlotlyXYFormat(response: ActualResponseFormat[], name?: string): PlotlyChartBasicFormat {    
    return {
        x: response.map(entry => toUtcIsoString(new Date(entry.date))),
        y: response.map(entry => parseFloat(entry.value)),
        name: name ? name : response[0].name
    };
}

export function parseActualRequestToPlotlyXYFormatYearWise(response: ActualResponseFormat[], name?: string): PlotlyChartBasicFormat[] {
    const result: PlotlyChartBasicFormat[] = [];
    let startIdx = 0, currentYear = new Date(response[0].date).getFullYear();

    response.forEach((entry, i) => {
        const entryYear = new Date(entry.date).getFullYear();
        if (entryYear !== currentYear || i === response.length - 1) {
            result.push({
                x: response.slice(startIdx, i + (i === response.length - 1 ? 1 : 0)).map(e => { const date = new Date(e.date); date.setFullYear(0); return toUtcIsoString(date) }),
                y: response.slice(startIdx, i + (i === response.length - 1 ? 1 : 0)).map(e => parseFloat(e.value)),
                name: `${name ? name + " " : ""}${currentYear}`
            });
            startIdx = i;
            currentYear = entryYear;
        }
    });

    return result;
}

export function calculateAverageTrace(datasets: PlotlyChartBasicFormat[]): PlotlyChartBasicFormat {
    const completeDatasets = datasets.filter(dataset => {
        const x = dataset.x;
        if (!x || x.length === 0) return false;

        const lastDate = new Date(x[x.length - 1]);
        return lastDate.getMonth() === 11 && lastDate.getDate() === 31;
    });

    if (completeDatasets.length === 0) return { x: [], y: [], name: 'Average' };

    const numPoints = completeDatasets[0].x.length;
    const avgY = new Array(numPoints).fill(0);

    completeDatasets.forEach(dataset => {
        dataset.y.forEach((value, index) => {
            avgY[index] += value;
        });
    });

    avgY.forEach((_, index) => avgY[index] /= completeDatasets.length);

    return {
        x: completeDatasets[0].x,
        y: avgY,
        name: 'Average'
    };
}



export function highlightingAndAverage(basicFormatInput: PlotlyChartBasicFormat[], highlight: string[], graphcolors: string[]) {
    let counter = 0

    const highlighted: any[] = [];
    const nonHighlighted: any[] = [];

    basicFormatInput.map((input, index) => {
        const formattedData = {
            x: input.x,
            y: input.y,
            name: input.name,
            marker: { color: highlight.includes(input.name) ? graphcolors[counter % graphcolors.length] : "gray" },
            opacity: highlight.includes(input.name) ? 1 : 0.5,
        };

        if (highlight.includes(input.name)) {
            highlighted.push(formattedData);
            counter += 1;
        } else {
            nonHighlighted.push(formattedData);
        }
    })

    const averageHistory = calculateAverageTrace(basicFormatInput)
    return [...nonHighlighted, ...highlighted, convertToPlotlyChartFormat(averageHistory, 'line', null, 'black')]
}

export function formatActualDatetime(dateTime?: Date, dateStr?: string) {
    const date = dateStr ? new Date(dateStr) : dateTime ? dateTime : new Date()

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} 00:00:00`;
};