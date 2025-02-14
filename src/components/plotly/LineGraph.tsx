import { calc, grid, Heading, useColorModeValue, useTheme } from "@chakra-ui/react";
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import { useEffect, useState } from "react";

export interface LineGraphData { x: string[], y: number[], name: string }

interface LineGraphProps {
    values: LineGraphData[];
    title: string
}
export default function LineGraph({ values, title }: LineGraphProps) {
    const theme = useTheme();

    const [data, setData] = useState<any[]>([])
    const colors = useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],);

    const plotBgColor = useColorModeValue(theme.colors.custom_light.surface, theme.colors.custom_dark.surface);
    const paperBgColor = useColorModeValue(theme.colors.custom_light.background, theme.colors.custom_dark.background);
    const textColor = useColorModeValue(theme.colors.custom_light.text, theme.colors.custom_dark.text);
    const gridColor = useColorModeValue(theme.colors.custom_light.secondarytext, theme.colors.custom_dark.secondarytext);

    const orientationLegend: "h" | "v" | undefined = "h"
    const orientationModebar: "h" | "v" | undefined = "v"
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
        },
        yaxis: {
            gridcolor: gridColor,
            zerolinecolor: "#888",
        },
        margin: { l: 50, r: 30, t: 50, b: 50 }, // Adjust margins
        legend: {
            x: 0, 
            y: -0.2, 
            traceorder: traceorder,
            orientation: orientationLegend, 
        },
        modebar: {
            orientation: orientationModebar,
        }
    }

    useEffect(() => {
        console.log(values)

        const formattedData = values.map((element, index) => ({
            x: element.x,
            y: element.y,
            type: "scatter",
            mode: "lines+markers",
            line: { shape: "spline" },
            marker: { color: colors[index % colors.length] },
            name: element.name,
        }));

        console.log(formattedData)

        setData(formattedData);
    }, [values])

    return (
        <div style={{ borderRadius: "15px", overflow: "hidden"}}>
            <PlotlyChart data={data} layout={{ ...layout, title: title }} useResizeHandler={true} style={{ width: "100%", height: "100%" }}/>
        </div>
    );
}
