import { useColorModeValue, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";

export interface LineGraphData { x: string[], y: number[], name: string  }

interface LineGraphProps {
    values: LineGraphData[];
    title: string;
    legend?: "right" | "bottom",
    type?: "bar" | "scatter",
    showNow? : boolean,
    xAxis?: string,
    yAxis?: string,
}

type orientation = "h" | "v" | undefined

export default function LineGraph({ values, title, legend = "bottom", type = "scatter", showNow = true, xAxis = '', yAxis = '' }: LineGraphProps) {
    const theme = useTheme();

    const [data, setData] = useState<any[]>([])
    const colors = useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],);

    const plotBgColor = useColorModeValue(theme.colors.custom_light.surface, theme.colors.custom_dark.surface);
    const paperBgColor = useColorModeValue(theme.colors.custom_light.background, theme.colors.custom_dark.background);
    const textColor = useColorModeValue(theme.colors.custom_light.text, theme.colors.custom_dark.text);
    const gridColor = useColorModeValue(theme.colors.custom_light.secondarytext, theme.colors.custom_dark.secondarytext);

    const orientationLegendBottom: orientation = "h"
    const orientationLegendRight: orientation = "v"
    const orientationModebar: orientation = "v"
    const traceorder: "normal" | "grouped" | "reversed" | "reversed+grouped" | undefined = "normal"

    useEffect(() => {
        console.log("New data")
    }, [values])

    const layout = {
        plot_bgcolor: plotBgColor, // Background of the plot area
        paper_bgcolor: paperBgColor, // Background of the whole chart
        font: { family: "Arial, sans-serif", color: textColor }, // Font styles
        xaxis: {
            gridcolor: gridColor, // Light gridlines
            zerolinecolor: "#888",
            tickangle: -45, // Rotate labels
            automargin: true, // Prevent cutoff
            tickmode: "auto", // Automatically adjust ticks
            nticks: 10, // Reduce number of ticks
            title: xAxis
        },
        yaxis: {
            gridcolor: gridColor,
            title: yAxis,
            zerolinecolor: "#888",
            showgrid: true
        },
        margin: { l: 30, r: 30, t: 50, b: 0 }, // Adjust margins
        legend: legend == "bottom" ? {
            x: 0,
            y: -0.2,
            traceorder: traceorder,
            orientation: orientationLegendBottom,
        } : {
            x: 1,
            y: 1,
            traceorder: traceorder,
            orientation: orientationLegendRight,
        },
        modebar: {
            orientation: orientationModebar,
        },
        shapes: showNow ? [
            {
                type: "line",
                x0: (new Date()).toISOString().split('.')[0] + "Z",
                x1: (new Date()).toISOString().split('.')[0] + "Z",
                y0: 0,
                y1: 1,
                xref: "x",
                yref: "paper", // Extends line across y-axis
                line: {
                    color: "red",
                    width: 2,
                    dash: "dash",
                },
            },
        ] : []
    }

    useEffect(() => {
        const formattedData = values.map((element, index) => ({
            x: element.x,
            y: element.y,
            type: type,
            mode: (type == "scatter" ? "lines+markers" : ""),
            line: (type == "scatter" ? { shape: "spline" } : ""),
            marker: { color: colors[index % colors.length] },
            name: element.name
        }));

        // const max = Math.max(...values[0].y) + 5
        // const staticValue = values[0].y.map(code => max)
        // const weatherIcons = values[0].y.map(code => '😉')

        // formattedData.push({ x: values[0].x, y: staticValue, mode: 'text', text: weatherIcons, textfont: { size: 18 }, name: 'Weather', yaxis: "y1" })

        setData(formattedData);
    }, [values])

    return (
        <div style={{ borderRadius: "15px", overflow: "hidden", width: "100%"}}>
            <PlotlyChart data={data} customLayout={{ title: title }} useResizeHandler={true} height="100%" />
        </div>
    );
}
