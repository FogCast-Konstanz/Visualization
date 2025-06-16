import axios from "axios";
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { BACKEND_API_URL } from "../constants";
import { formatActualDatetime, toUtcIsoString } from "../time";

type ActualResponseFormat = {
    date: string,
    name: string,
    quality: string,
    unit: string,
    value: string
};


export async function fetchTemperatureHistoryDWD(start: Date, stop: Date, frequency: "daily" | "hourly" | "10-minutes"): Promise<ActualResponseFormat[]> {
    
    const startString = formatActualDatetime(start)
    const stopString = formatActualDatetime(stop)
    
    try {
        const response = await axios.get(`${BACKEND_API_URL}/actual/temperature-history`, {
            params: { start: startString, stop: stopString, frequency: frequency },
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


export async function fetchFogDaysHistoryDWD(start: Date, stop: Date, frequency: "monthly" | "yearly"): Promise<ActualResponseFormat[]> {
    // Date Format 2025-02-01 00:00:00

    const startString = formatActualDatetime(start)
    const stopString = formatActualDatetime(stop)

    try {
        const response = await axios.get(`${BACKEND_API_URL}/actual/fog-count-history`, {
            params: { start: startString, stop: stopString, frequency: frequency },
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


export async function fetchWaterLevelHistory(start: Date, stop: Date): Promise<ActualResponseFormat[]> {
    
    const startString = formatActualDatetime(start);
    const stopString = formatActualDatetime(stop)
    
    try {
        const response = await axios.get(`${BACKEND_API_URL}/archive/water-level`, {
            params: {
                start: startString,
                stop: stopString,
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


export async function fetchArchiveWeather(date: Date, model: string): Promise<any> {
    
    const dateString = formatActualDatetime(date)
    // Date Format 2025-02-01 00:00:00

    try {
        const response = await axios.get(`${BACKEND_API_URL}/actual/archive`, {
            params: { model_id: model, date: dateString },
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



export function highlightingAndAverage(
    basicFormatInput: PlotlyChartBasicFormat[],
    highlightYears: string[],
    graphcolors: string[]
): any[] {
    const highlighted: any[] = [];
    const background: any[] = [];

    let colorIndex = 0;

    basicFormatInput.forEach((input) => {
        const isHighlighted = highlightYears.includes(input.name);
        const trace = {
            x: input.x.map(d => formatToYearNeutralDate(d)), // aligns all years to same calendar axis
            y: input.y,
            name: input.name,
            type: 'scatter',
            mode: 'lines',
            line: {
                color: isHighlighted ? graphcolors[colorIndex % graphcolors.length] : 'lightgray',
                width: isHighlighted ? 2.5 : 1,
            },
            opacity: isHighlighted ? 1 : 0.3,
            hoverinfo: 'name+y',
        };

        if (isHighlighted) {
            highlighted.push(trace);
            colorIndex += 1;
        } else {
            background.push(trace);
        }
    });

    const avg = calculateAverageTrace(basicFormatInput);
    const averageTrace = convertToPlotlyChartFormat(
        {
            x: avg.x.map(d => formatToYearNeutralDate(d)),
            y: avg.y,
            name: 'Average',
        },
        'scatter',
        null,
        'black'
    );
    averageTrace.line = { width: 3, dash: 'dash' };
    averageTrace.opacity = 0.9;
    averageTrace.hoverinfo = 'name+y';

    return [...background, ...highlighted, averageTrace];
}

function formatToYearNeutralDate(dateStr: string): string {
    const d = new Date(dateStr);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `2000-${month}-${day}`; // fixed pseudo-year
}

