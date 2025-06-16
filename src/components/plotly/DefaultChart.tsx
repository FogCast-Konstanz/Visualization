import { useTheme } from "@chakra-ui/react";
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { layoutConfig, useColor, useGraphColors } from '../style';
import { toUtcIsoString } from "../time";

interface PlotlyChartProps {
    data: any[];
    customLayout?: any;
    customStyle?: React.CSSProperties | undefined;

    xAxis?: string;
    yAxis?: string;
    y2Axis?: string;
    title?: string;
    showNow?: boolean;

    startFromZero?: boolean
    dateFormat?: 'standard' | 'year' | 'month' | 'day' | 'monthOnly'

    isDay?: { x: string[]; y: number[] }
    movingShape?: { left: string, right: string }
}

type orientation = "h" | "v" | undefined


const PlotlyChart: React.FC<PlotlyChartProps> = ({ data, customLayout, customStyle, xAxis = '', yAxis = '', y2Axis = null, title = '', showNow = false, startFromZero = true, isDay, movingShape, dateFormat }) => {
    const theme = useTheme();

    useEffect(() => {
        setLayout(() => ({ ...defaultLayout, ...customLayout }))
        setStyle(() => ({ ...defaultStyle, ...customStyle }))
    }, [customLayout])

    const [layout, setLayout] = useState<any>();
    const [style, setStyle] = useState<any>();

    const colors = useGraphColors();

    const plotBgColor = useColor('surface');
    const paperBgColor = useColor('background');
    const textColor = useColor('text');
    const gridColor = useColor('secondaryText');
    const markingColor = useColor('warning')

    const orientationLegendBottom: orientation = "h"
    const orientationLegendRight: orientation = "v"
    const orientationModebar: orientation = "v"
    const traceorder: "normal" | "grouped" | "reversed" | "reversed+grouped" | undefined = "normal"

    const range = startFromZero ? [data[0].x[0], data[0].x[data[0].x.length - 1]] : [];


    // const [firstKey, firstValue] = Object.entries(data)[0] || [];

    const tickFormatMap: Record<string, string> = {
        year: "%Y",
        month: "%b %Y",
        day: "%d.%m.%Y",
        standard: "%H:%M %d.%m.%Y",
        monthOnly: "%b"
    };


    const defaultLayout = {
        plot_bgcolor: plotBgColor, // Background of the plot area
        paper_bgcolor: paperBgColor, // Background of the whole chart
        font: { family: "Arial, sans-serif", color: textColor }, // Font styles
        title: {
            text: title,
            font: {
                weight: 'bold', // Make it bold
            },
        },
        xaxis: {
            gridcolor: gridColor, // Light gridlines
            zerolinecolor: "#888",
            // tickangle: -45, // Rotate labels
            automargin: true, // Prevent cutoff
            tickmode: "auto", // Automatically adjust ticks
            nticks: 10, // Reduce number of ticks
            title: xAxis,
            tickformat: dateFormat ? tickFormatMap[dateFormat] || "%H:%M" : "%H:%M",
            range: range,
            type: 'date'
        },
        yaxis: {
            gridcolor: gridColor,
            title: {
                text: yAxis,
                standoff: 5
            },
            zerolinecolor: "#888",
            showgrid: true,
            // range: [0, null]
        },
        yaxis2: y2Axis ? {
            title: {
                text: y2Axis,
                standoff: 5
            },
            overlaying: "y",
            side: "right",
            // range: [0, null]
        } : {},
        margin: { l: 50, r: 40, t: 60, b: 0 }, // Adjust margins
        legend: {
            x: 0,
            y: -0.2,
            traceorder: traceorder,
            orientation: orientationLegendBottom,
        },
        modebar: {
            orientation: orientationModebar,
        }
    }

    const defaultStyle = { width: "100%", height: "100%" }

    function generateDayNightShadesFromTrace(trace: { x: string[]; y: number[] }) {
        const shapes = [];
        let i = 0;

        while (i < trace.y.length) {
            if (trace.y[i] === 0) {
                const start = trace.x[i];
                while (i + 1 < trace.y.length && trace.y[i + 1] === 0) {
                    i++;
                }
                const end = trace.x[i + 1] || trace.x[i];
                shapes.push({
                    type: "rect",
                    xref: "x",
                    yref: "paper",
                    x0: toUtcIsoString(start),
                    x1: toUtcIsoString(end),
                    y0: 0,
                    y1: 1,
                    fillcolor: paperBgColor,
                    opacity: 0.5,
                    layer: "below",
                    line: { width: 0 }
                });
            }
            i++;
        }

        return shapes;
    }


    useEffect(() => {

        const nowShape = showNow
            ? [{
                type: "line",
                x0: toUtcIsoString(Date.now() + 1 * 60 * 60 * 1000),
                x1: toUtcIsoString(Date.now() + 1 * 60 * 60 * 1000),
                y0: 0,
                y1: 1,
                xref: "x",
                yref: "paper",
                line: {
                    color: "red",
                    width: 2,
                    dash: "dash"
                },
                layer: "above"
            }]
            : [];

        const additionalMovingShape = movingShape ? [
            {
                type: "line",
                x0: movingShape.left,
                x1: movingShape.left,
                y0: 0,
                y1: 1,
                xref: "x",
                yref: "paper",
                line: {
                    color: markingColor,
                    width: 1,
                    dash: "dot"
                },
                layer: "above"
            },
            {
                type: "line",
                x0: movingShape.right,
                x1: movingShape.right,
                y0: 0,
                y1: 1,
                xref: "x",
                yref: "paper",
                line: {
                    color: markingColor,
                    width: 1,
                    dash: "dot"
                },
                layer: "above"
            }
        ] : [];

        const isDayShape = isDay ? generateDayNightShadesFromTrace(isDay) : []

        const shapes = [...nowShape, ...additionalMovingShape, ...isDayShape]

        setLayout({ ...defaultLayout, shapes, ...customLayout });
    }, [customLayout, isDay, showNow, movingShape]);

    return (
        <div style={{ borderRadius: layoutConfig.borderRadius, overflow: "hidden", width: "100%" }}>
            <Plot
                data={data}
                layout={layout}
                useResizeHandler={true}
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
