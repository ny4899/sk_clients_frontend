import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const LineChart =  React.forwardRef(({ chartData },ref) => {
  return (
    <div ref={ref} className="chart-container">
      <h4 className="my-3" style={{ textAlign: "center" }}>Parameters Chart</h4>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: true,
            }
          }
        }}
      />
    </div>
  );
})
export default LineChart;