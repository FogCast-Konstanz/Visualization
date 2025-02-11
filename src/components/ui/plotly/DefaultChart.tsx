import React from 'react';
import Plot from 'react-plotly.js';

interface PlotlyChartProps {
    data: any[];
    layout: Partial<Plotly.Layout>;
    useResizeHandler: boolean | undefined;
    style: React.CSSProperties | undefined
}

const PlotlyChart: React.FC<PlotlyChartProps> = ({ data, layout, useResizeHandler, style }) => {
    return (
        <Plot
            data={data}
            layout={layout}
            useResizeHandler={useResizeHandler}
            style={style}
        />
    );
};

export default PlotlyChart;
