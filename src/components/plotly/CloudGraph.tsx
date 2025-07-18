import { useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { layoutConfig, useColor, useGraphColors } from "../style";
import { toUtcIsoString } from "../time";
import PlotlyChart from "./DefaultChart";

export type CloudDataType = { time: string[]; low: number[]; mid: number[]; high: number[]; visibility: number[] }

interface CloudGraphInterface { cloudData: CloudDataType }

type orientation = "h" | "v" | undefined


export default function CloudGraph({ cloudData }: CloudGraphInterface) {
    const theme = useTheme();

    const [weatherData, setWeatherData] = useState<{ time: string[]; low: { up: number[], down: number[] }; mid: { up: number[], down: number[] }; high: { up: number[], down: number[] }; visibility: number[] } | null>(null);
    const [data, setData] = useState<any[]>([])

    const colors = useGraphColors();

    const plotBgColor = useColor('surface');
    const paperBgColor = useColor('background');
    const textColor = useColor('text');
    const gridColor = useColor('secondaryText');

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
            title: "Time"
        },
        yaxis: {
            gridcolor: gridColor,
            zerolinecolor: "#888",
            title: {
                text: "Cloud Cover (%)",
                standoff: 0
            },
            range: [0, 100],
            side: "left",
            showgrid: false,
        },
        margin: { l: 50, r: 50, t: 50, b: 0 }, // Adjust margins
        legend: {
            x: 0,
            y: -0.2,
            traceorder: traceorder,
            orientation: orientationLegendBottom,
        },
        modebar: {
            orientation: orientationModebar,
        },
        yaxis2: {
            overlaying: "y",
            side: "right",
            title: {
                text: "Visibility (km)",
                standoff: 10
            }
        },
        shapes: [
            {
                type: "line",
                x0: toUtcIsoString(),
                x1: toUtcIsoString(),
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
        ],
        title: "Cloud Cover and Visibility Over Time",
    }

    useEffect(() => {
        setWeatherData({
            time: cloudData.time.concat([...cloudData.time].reverse()),
            low: scaleCloud(cloudData.low, 25),
            mid: scaleCloud(cloudData.mid, 50),
            high: scaleCloud(cloudData.high, 75),
            visibility: cloudData.visibility.map((v: number) => v / 1000),
        });
    }, [cloudData])

    function scaleCloud(values: number[], center: number) {
        const up = values.map(v => center + (v / 12));
        const down = values.map(v => center - (v / 12)).reverse();
        return { up, down };
    };

    return (
        <div style={{ borderRadius: layoutConfig.borderRadius, overflow: "hidden", width: "100%", height: "100%" }}>
            {weatherData ? (
                <PlotlyChart data={[
                    {
                        x: weatherData.time,
                        y: weatherData.high.up.concat(weatherData.high.down),
                        fill: "toself",
                        type: "scatter",
                        mode: "lines",
                        line: { color: 'lightblue', width: 1 }, opacity: 0.8,
                        name: "High Cloud Cover",
                    },
                    {
                        x: weatherData.time,
                        y: weatherData.mid.up.concat(weatherData.mid.down.reverse()),
                        fill: "toself",
                        type: "scatter",
                        mode: "lines",
                        line: { color: '#808080', width: 1 }, opacity: 0.9,
                        name: "Mid Cloud Cover",
                    },
                    {
                        x: weatherData.time,
                        y: weatherData.low.up.concat(weatherData.low.down.reverse()),
                        fill: "toself",
                        type: "scatter",
                        mode: "lines",
                        line: { color: '#202020', width: 1 }, opacity: 0.9,
                        name: "Low Cloud Cover",
                    },
                    {
                        x: weatherData.time,
                        y: weatherData.visibility,
                        type: "scatter",
                        mode: "lines",
                        name: "Visibility (km)",
                        yaxis: "y2",
                        line: { color: "orange", dash: "dash", width: 2 },
                    },
                ]}
                    customLayout={layout}
                />
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}
