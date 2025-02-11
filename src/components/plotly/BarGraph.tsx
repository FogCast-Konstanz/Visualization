import { grid, Heading, useColorModeValue, useTheme } from "@chakra-ui/react";
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import { useEffect, useState } from "react";

type Input = { x: string[], y: number[], name: string }[]

interface GraphProps {
    values: Input;
    title: string
}
export default function BarGraph({ values, title }: GraphProps) {
    const theme = useTheme();

    const [data, setData] = useState<any[]>([])
    const colors = useColorModeValue(["#F7C777CA", "#E99B9BCA", "#7FB3D5CA", "#C39BD3C3", "#A9DFBFC3"]
        , ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"]);

    const plotBgColor = useColorModeValue(theme.colors.custom_light.surface, theme.colors.custom_dark.surface);
    const paperBgColor = useColorModeValue(theme.colors.custom_light.background, theme.colors.custom_dark.background);
    const textColor = useColorModeValue(theme.colors.custom_light.text, theme.colors.custom_dark.text);
    const gridColor = useColorModeValue(theme.colors.custom_light.secondarytext, theme.colors.custom_dark.secondarytext);

    const mode: "overlay" | "stack" | "group" | "relative" | undefined = "stack"

    const orientationLegend: "h" | "v" | undefined = "h"
    const orientationModebar: "h" | "v" | undefined = "v"
    const traceorder: "normal" | "grouped" | "reversed" | "reversed+grouped" | undefined = "normal"

    const layout = {
        barmode: mode, // "group" for side-by-side bars
        plot_bgcolor: plotBgColor,
        paper_bgcolor: paperBgColor,
        font: { family: "Arial, sans-serif", color: textColor }, // Font styles
        xaxis: {
            gridcolor: gridColor, // Light gridlines
            zerolinecolor: "#888",
        },
        yaxis: {
            gridcolor: gridColor,
            zerolinecolor: "#888",
        },
        margin: { l: 50, r: 30, t: 50, b: 50 }, 
        legend: {
            x: 0, 
            y: -0.2, 
            traceorder: traceorder,
            orientation: orientationLegend, 
        },
        modebar: {
            orientation: orientationModebar,
        },
    }

    useEffect(() => {
        const formattedData = values.map((element, index) => ({
            x: element.x,
            y: element.y,
            type: "bar",
            marker: { color: colors[index % colors.length] },
            name: element.name,
        }));

        setData(formattedData);
    }, [])

    return (
        <>
            <div style={{ borderRadius: "15px", overflow: "hidden"}}>
                <PlotlyChart data={data} layout={{ ...layout, title: title }} useResizeHandler={true} style={{ width: "100%", height: "100%" }} />
            </div>
        </>
    );
}
