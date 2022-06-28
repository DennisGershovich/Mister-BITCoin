import React from "react";
import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";
import {chartOptions} from '../services/chartConfigs.js'

export const ChartComponent = (props) => {
  const chartRef = useRef();
  useEffect(() => {
    let chartInstance;
    if (chartRef && chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: props.chartData.name || "",
              data: props.chartData.data || [],
              borderColor: "#00FF7F",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: chartOptions,
      });
    }
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="market-price-chart">
      <canvas ref={chartRef} id="myChart"></canvas>
    </div>
  );
};
