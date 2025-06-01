import { toUtcIsoString, toUtcPlotlyIsoString } from "../time";

export interface PlotlyChartBasicFormat {
    x: string[];
    y: number[];
    name: string;
    text?: string[]
};

export interface PlotlyChartDataFormat {
    x: string[];
    y: number[];
    name: string;
    type?: string;
    mode?: string;
    line?: any;
    marker?: any;
    text?: string[];
    textfont?: any;
    opacity?: number
    fill?: string;
    fillcolor?: string
}


export function convertToPlotlyChartFormat(basicFormatInput: PlotlyChartBasicFormat, mode: 'scatter' | 'dashedLine' | 'basic' | 'bar' | 'text' | 'cloud' | 'line' | 'weatherIcon', yAxis?: string | null, customColor?: string | null, customOpacity?: number): PlotlyChartDataFormat {

    const adjustedTimes = basicFormatInput.x.map(time => ( toUtcPlotlyIsoString(time)));

    const basicFormat = {
        x: adjustedTimes,
        y: basicFormatInput.y,
        name: basicFormatInput.name,
        text: basicFormatInput.text,
        yaxis: yAxis ? yAxis : 'y',
        opacity: customOpacity ? customOpacity : 1.0,
        marker: { color: customColor ? customColor : null },
    }


    switch (mode) {
        case "scatter":
            return {
                ...basicFormat,
                type: 'scatter',
                mode: "lines+markers",
                line: { shape: "spline" }
            }
        case "line":
            return {
                ...basicFormat,
                type: 'scatter',
                mode: "lines",
                line: { shape: "spline" }
            }
        case "dashedLine":
            return {
                ...basicFormat,
                type: 'scatter',
                mode: "lines",
                line: { color: customColor ? customColor : null, dash: "dash", width: 2 },
            }
        case "bar":
            return {
                ...basicFormat,
                type: 'bar'
            }
        case "text":
            return {
                ...basicFormat,
                mode: 'text',
                textfont: { size: 20 }
            }
        case "cloud":
            return {
                ...basicFormat,
                fill: "toself",
                type: "scatter",
                mode: "lines",
                line: { color: customColor, width: 1 }, 
                opacity: 0.9,
            }
        case "weatherIcon":
            return {
                x: basicFormatInput.x,
                y: basicFormatInput.y,
                text: basicFormatInput.text,
                name: basicFormatInput.name,
                mode: 'text',
                textfont: { size: 20 }
            }
        case "basic":
        default:
            return basicFormat
    }
}


export function convertMultipleToPlotlyChartFormat(basicFormat: PlotlyChartBasicFormat[], mode: 'scatter' | 'basic' | 'bar' | 'line', gray: boolean = false) {
    if (gray) {
        return basicFormat.map((element) => (
            convertToPlotlyChartFormat(element, mode, null, 'gray', 0.5)
        ))
    }

    return basicFormat.map((element) => (
        convertToPlotlyChartFormat(element, mode)
    ))
}

/**
 * Get plotly data for the weekdays
 * Usage: Store the data inside a useState and pass this value to DefaultGraph (customLayout={{annotations: weekdays}})
 */
export function weekdayAnnotations(randomTime: string[], ignoreOlder=true, language="de-DE") {

    const uniqueDays = [...new Set(randomTime
        .filter(t => ignoreOlder ? 
            new Date(t.split("T")[0] + 'T12:00:00') > new Date() 
            : new Date(t.split("T")[0] + 'T12:00:00'))
        .map(t => t.split("T")[0])
    )];


    return uniqueDays.map(day => {
        const noonTime = new Date(`${day}T12:00:00`);  // Set noon time
        return {
            x: toUtcIsoString(noonTime),   // X position at noon
            y: 1.08,                     // Y position (above first row)
            xref: "x",
            yref: "paper",
            text: noonTime.toLocaleDateString(language, { weekday: "long" }), // "Monday", "Tuesday", etc.
            showarrow: false,
            font: { size: 14, color: "white" },
            align: "center",
            yaxis: "y1"
        };
    });
}
