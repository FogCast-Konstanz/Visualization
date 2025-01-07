import React from 'react';
import Plot from 'react-plotly.js';

interface PlotlyChartProps {
    data: any[];
    layout: Partial<Plotly.Layout>;
}

const PlotlyChart: React.FC<PlotlyChartProps> = ({ data, layout }) => {
    return (
        <Plot
            data={data}
            layout={layout}
        />
    );
};

export default PlotlyChart;
