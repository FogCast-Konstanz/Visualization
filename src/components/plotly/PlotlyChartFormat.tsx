import { formatGermanDate, formatYear } from "../requests/helpers";

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


export function convertToPlotlyChartFormat(basicFormatInput: PlotlyChartBasicFormat, mode: 'scatter' | 'dashedLine' | 'basic' | 'bar' | 'text' | 'cloud' | 'line', yAxis?: string | null, customColor?: string | null, dateFormat: 'germanDate' | 'germanTime' | 'year' = 'germanDate', customOpacity?: number): PlotlyChartDataFormat {
    
    let date: string[] = []

    // switch (dateFormat) {
    //     case 'germanDate':
    //         date = basicFormatInput.x.map(t => formatGermanDate(t))
    //         break;
    //     case 'germanTime':
            
    //         break;
    //     case 'year':
    //         date = basicFormatInput.x.map(t => formatYear(t))
    //         console.log(date)
    //         break;
    //     default:
    //         break;
    // }
    
    
    
    const basicFormat = {
        x: basicFormatInput.x,
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
        case "basic":
        default:
            return basicFormat
    }
}


export function convertMultipleToPlotlyChartFormat(basicFormat: PlotlyChartBasicFormat[], mode: 'scatter' | 'basic' | 'bar' | 'line', gray: boolean = false) {
    if (gray) {
        return basicFormat.map((element) => (
            convertToPlotlyChartFormat(element, mode, null, 'gray', 'germanDate', 0.5)
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
export function weekdayAnnotations(randomTime: string[], ignoreOlder=true) {
    
    // const formattedTimes = randomTime.map(item => 
    //     item instanceof Date ? item.toISOString() : item
    // );

    const uniqueDays = [...new Set(randomTime
        .filter(t => ignoreOlder ? 
            new Date(t.split("T")[0] + 'T12:00:00') > new Date() 
            : new Date(t.split("T")[0] + 'T12:00:00'))
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
            font: { size: 14, color: "white" },
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
