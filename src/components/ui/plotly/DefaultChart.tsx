import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Flex, useColorModeValue, useTheme } from "@chakra-ui/react";

interface PlotlyChartProps {
    data: any[];
    customLayout: any;
    useResizeHandler: boolean | undefined;
    customStyle?: React.CSSProperties | undefined;

    xAxis?: string;
    yAxis?: string;
    showNow?: boolean;
}

type orientation = "h" | "v" | undefined


const PlotlyChart: React.FC<PlotlyChartProps> = ({ data, customLayout, useResizeHandler, customStyle, xAxis = '', yAxis = '', showNow = false  }) => {
    const theme = useTheme();

    const [layout, setLayout] = useState<any>();
    const [style, setStyle] = useState<any>();

    const colors = useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],);

    const plotBgColor = useColorModeValue(theme.colors.custom_light.surface, theme.colors.custom_dark.surface);
    const paperBgColor = useColorModeValue(theme.colors.custom_light.background, theme.colors.custom_dark.background);
    const textColor = useColorModeValue(theme.colors.custom_light.text, theme.colors.custom_dark.text);
    const gridColor = useColorModeValue(theme.colors.custom_light.secondarytext, theme.colors.custom_dark.secondarytext);

    const orientationLegendBottom: orientation = "h"
    const orientationLegendRight: orientation = "v"
    const orientationModebar: orientation = "v"
    const traceorder: "normal" | "grouped" | "reversed" | "reversed+grouped" | undefined = "normal"

    const defaultLayout = {
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
        legend: {
            x: 0,
            y: -0.2,
            traceorder: traceorder,
            orientation: orientationLegendBottom,
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

    const defaultStyle = { width: "100%", height: "100%" }

    useEffect(() => {
        setLayout(() => ({...defaultLayout, ...customLayout}))
        setStyle(() => ({...defaultStyle, ...customStyle}))
    }, [])


    return (
        <div style={{ borderRadius: "15px", overflow: "hidden", width: "100%"}}>
            <Plot
            data={data}
            layout={layout}
            useResizeHandler={useResizeHandler}
            style={style}
            config={{
                modeBarButtonsToAdd: [
                    {
                        name: 'downloadCsv',
                        title: 'Download data as csv',
                        icon: csv_icon,
                        click: (gd: any) => {
                            let max_len = 0;
                            const data = [
                                gd.data.map((trace: any) => {
                                    if (trace.x.length > max_len) max_len = trace.x.length;
                                    return ['timestamp', trace.name];
                                }).join(','),
                            ];
                            console.log(max_len);

                            for (let count = 0; count < max_len; count++) {
                                const row: any = [];
                                gd.data.forEach((trace: any) => {
                                    if (trace.x[count] && trace.y[count]) {
                                        row.push(trace.x[count], trace.y[count]);
                                    }
                                    else {
                                        row.push('', '');
                                    }
                                });
                                data.push(row);
                            }
                            const blob = new Blob([data.join('\r\n')], { type: 'text/csv' });

                            console.log(blob)
                            saveAs(
                                blob,
                                'export.csv'
                            );
                        },
                    },]
            }}
        />
        </div>
    );
};

const csv_icon = {
    'name': 'csv_icon',
    'svg': '<svg width="15px" height="15px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM6.5 6.5V6H6V6.5H6.5ZM6.5 8.5H6V9H6.5V8.5ZM8.5 8.5H9V8H8.5V8.5ZM8.5 10.5V11H9V10.5H8.5ZM10.5 9.5H10V9.70711L10.1464 9.85355L10.5 9.5ZM11.5 10.5L11.1464 10.8536L11.5 11.2071L11.8536 10.8536L11.5 10.5ZM12.5 9.5L12.8536 9.85355L13 9.70711V9.5H12.5ZM2.5 6.5V6H2V6.5H2.5ZM2.5 10.5H2V11H2.5V10.5ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1ZM9 6H6.5V7H9V6ZM6 6.5V8.5H7V6.5H6ZM6.5 9H8.5V8H6.5V9ZM8 8.5V10.5H9V8.5H8ZM8.5 10H6V11H8.5V10ZM10 6V9.5H11V6H10ZM10.1464 9.85355L11.1464 10.8536L11.8536 10.1464L10.8536 9.14645L10.1464 9.85355ZM11.8536 10.8536L12.8536 9.85355L12.1464 9.14645L11.1464 10.1464L11.8536 10.8536ZM13 9.5V6H12V9.5H13ZM5 6H2.5V7H5V6ZM2 6.5V10.5H3V6.5H2ZM2.5 11H5V10H2.5V11Z" fill="#DCDCDC"/></svg>'
};

export default PlotlyChart;
