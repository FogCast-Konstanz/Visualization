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
    fill?: string
}


export function convertToPlotlyChartFormat(basicFormatInput: PlotlyChartBasicFormat, mode: 'scatter' | 'dashedLine' | 'basic' | 'bar' | 'text' | 'cloud', yAxis?: string | null, customColor?: string | null): PlotlyChartDataFormat {
    const basicFormat = {
        ...basicFormatInput,
        yaxis: yAxis ? yAxis : 'y',
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
        case "basic":
        default:
            return basicFormat
    }
}


export function convertMultipleToPlotlyChartFormat(basicFormat: PlotlyChartBasicFormat[], mode: 'scatter' | 'basic' | 'bar') {
    const newFormat = basicFormat.map((element) => (
        convertToPlotlyChartFormat(element, mode)
    ))

    return newFormat
}


/**
 * Get plotly data for the weekdays
 * Usage: Store the data inside a useState and pass this value to DefaultGraph (customLayout={{annotations: weekdays}})
 */
export function weekdayAnnotations(randomTime: any[]) {
    const uniqueDays = [...new Set(randomTime
        .filter(t => new Date(t.split("T")[0] + 'T12:00:00') > new Date())
        .map(t => t.split("T")[0])
    )];

    return uniqueDays.map(day => {
        const noonTime = new Date(`${day}T12:00:00`);  // Set noon time
        return {
            x: noonTime.toISOString(),   // X position at noon
            y: 1.08,                     // Y position (above first row)
            xref: "x",
            yref: "paper",
            text: noonTime.toLocaleDateString("en-US", { weekday: "long" }), // "Monday", "Tuesday", etc.
            showarrow: false,
            font: { size: 14, color: "white", weight: "bold" },
            align: "center",
            yaxis: "y1"
        };
    });
}

// export function shadeTheNights() {
//     const nightShading = [];
//       for (let i = 0; i < sunrises.length - 1; i++) {
//         // Define the night period as the time between sunset[i] and sunrise[i+1]
//         nightShading.push({
//           type: "rect",
//           xref: "x",
//           yref: "paper",
//           x0: sunsets[i],   // Start of the night (sunset)
//           x1: sunrises[i + 1], // End of the night (next sunrise)
//           y0: 0, y1: 1,  // Full height (paper coordinates from 0 to 1)
//           fillcolor: "rgba(0, 0, 0, 0.08)", // Semi-transparent black for night shading
//           layer: "below",
//           line: { width: 0 }
//         });
//       }
// }
