import { useColorModeValue, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";

export interface MultipleAxisData { x: string[], y: number[], name: string, type?: string }

interface MultipleAxisGraphProps {
    y1: MultipleAxisData[];
    y2: MultipleAxisData[];
    title: string;
    legend?: "right" | "bottom",
    type?: "bar" | "scatter",
    showNow?: boolean,
    xAxis?: string,
    y1Axis?: string
    y2Axis?: string
}

type orientation = "h" | "v" | undefined

export default function MultipleAxisGraph({ y1, y2, title, type = "scatter", legend = "bottom", showNow = true, xAxis = '', y1Axis = '', y2Axis = ''  }: MultipleAxisGraphProps) {
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

    const layout = {
        plot_bgcolor: plotBgColor, // Background of the plot area
        paper_bgcolor: paperBgColor, // Background of the whole chart
        font: { family: "Arial, sans-serif", color: textColor }, // Font styles
        xaxis: {
            gridcolor: gridColor, // Light gridlines
            zerolinecolor: "#888",
            tickangle: -45, // Rotate labels
            automargin: true, // Prevent cutoff
            nticks: 10, // Reduce number of ticks
            title: xAxis,
            // range: [y1[0].x, y1[y1.length - 1].x]
        },
        yaxis: {
            gridcolor: gridColor,
            zerolinecolor: "#888",
            title: {
                text: y1Axis, 
                standoff: 0
            },
            side: "left", 
            showgrid: false
        },
        yaxis2: {
            title: {
                text: y2Axis,
                standoff: 10
            },
            overlaying: "y",
            side: "right",
        },
        margin: { l: 50, r: 50, t: 50, b: 0 }, // Adjust margins
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
        title: "Temperature and Humidity Over Time",
        shapes: showNow ? [
            {
                type: "line",
                x0: new Date().toISOString(),
                x1: new Date().toISOString(),
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
        const formattedY1 = y1.map((element, index) => ({
            x: element.x,
            y: element.y,
            type: element.type,
            mode: element.type == "scatter" ? "lines+markers" : "",
            line: (type == "scatter" ? { shape: "spline" } : ""),
            marker: { color: colors[index % colors.length] },
            name: element.name,
            yaxis: "y1"
        }));

        const formattedY2 = y2.map((element, index) => ({
            x: element.x,
            y: element.y,
            type: element.type,
            mode: element.type == "scatter" ? "lines+markers" : "",
            line: (type == "scatter" ? { shape: "spline" } : ""),
            marker: { color: colors[(index + 1) % colors.length] },
            name: element.name,
            yaxis: "y2"
        }));

        setData([...formattedY1, ...formattedY2]);

        console.log("New data", y1, y2)
    }, [y1])

    return (
        <div style={{ borderRadius: "15px", overflow: "hidden", width: "100%", height: "100%"}}>
            <PlotlyChart data={data} customLayout={{ ...layout, title: title }} useResizeHandler={true} />
        </div>
    );
}
