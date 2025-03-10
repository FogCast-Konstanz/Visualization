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
    marker?: string;
    text?: string[];
    textfont?: any;
}


export function convertToPlotlyChartFormat(basicFormatInput: PlotlyChartBasicFormat, mode: 'scatter' | 'basic' | 'bar' | 'text', yAxis?: string | null): PlotlyChartDataFormat {
    
    const basicFormat = {
        ...basicFormatInput,
        yaxis: yAxis ? yAxis : 'y'
    }
    
    switch(mode) {
        case "scatter":
            return {
                ...basicFormat, 
                type: 'scatter',
                mode: "lines+markers",
                line: { shape: "spline" }
            }

        case "bar":
            return {...basicFormat, 
                type: 'bar'
            }  
        case "text":
            return {
                ...basicFormat,
                mode: 'text', 
                textfont: { size: 20 }
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