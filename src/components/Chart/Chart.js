import React from "react";
import "./chart.css";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = props => {
  const options = {
    title: {
      text: "My chart"
    },
    xAxis: {
      categories: ["A", "B", "C"]
    },
    series: [
      {
        showInLegend: false,
        data: [1, 2.5, 53],
      }
    ]
  };
  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
export default Chart;
