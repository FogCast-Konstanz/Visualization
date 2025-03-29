import axios from "axios";
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { API_BASE_URL, formatGermanDate } from "./helpers";

type ActualResponseFormat = {
    date: string,
    name: string,
    quality: string,
    unit: string,
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


export function parseActualRequestToPlotlyXYFormat(response: ActualResponseFormat[], name?: string): PlotlyChartBasicFormat {
    return {
        x: response.map(entry => new Date(entry.date).toISOString()),
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
                x: response.slice(startIdx, i + (i === response.length - 1 ? 1 : 0)).map(e => { const date = new Date(e.date); date.setFullYear(0); return date.toISOString() }),
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
    const numPoints = datasets[2].x.length;
    const avgY = new Array(numPoints).fill(0);

    datasets.forEach(dataset => {
        dataset.y.forEach((value, index) => {
            avgY[index] += value;
        });
    });

    // Divide by the number of datasets to get the average
    avgY.forEach((_, index) => avgY[index] /= datasets.length);

    return {
        x: datasets[2].x, // Assume all datasets have the same x values
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