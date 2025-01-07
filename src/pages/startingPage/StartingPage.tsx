import { Heading } from "@chakra-ui/react";
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";

export default function StartingPage() {
  const data = [
    {
        x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025" ],
        y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17, 10, 23],
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline' },
        marker: { color: 'blue' },
        name: 'Model 1'
    },
    { 
        x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025" ],
        y: [11, 14, 12, 16, 11, 14, 12, 16, 11, 14, 12, 16, 11, 24],
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline' },
        marker: { color: 'green' },
        name: 'Model 2'
    },
    { 
        x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025" ],
        y: [12, 13, 11, 15, 12, 13, 11, 15, 12, 13, 11, 15, 12, 25],
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline' },
        marker: { color: 'yellow' },
        name: 'Model 3'
    },
    { 
        x: ["01.01.2025", "02.01.2025", "03.01.2025", "05.01.2025", "06.01.2025", "07.01.2025", "08.01.2025", "09.01.2025", "10.01.2025", "11.01.2025", "12.01.2025", "13.01.2025", "14.01.2025" ],
        y: [13, 12, 10, 14, 13, 12, 10, 14, 13, 12, 10, 14, 13, 26],
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline' },
        marker: { color: 'red' },
        name: 'Real'
    },
];

  return (
    <>
      <Heading size="3xl">Starting Page</Heading>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <PlotlyChart data={data} layout={{ title: 'Modelle VS Real' }} />
      </div>
    </>
  );
}
