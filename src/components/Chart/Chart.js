import React from "react";
import { Card } from "antd";

import "./chart.css";
import { connect } from "react-redux";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = props => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const xAxisDates = props.stocks.map(stock => {
    let date = new Date(stock.date);
    let month = date.getMonth();
    let day = date.getDate();
    return `${day}, ${monthNames[month]}`;
  });
  const yAxisPrices = props.stocks.map(stock => {
    return Number(stock.price);
  });
  const options = {
    title: {
      text: "Price Trend : " + monthNames[props.month] + "," + props.year
    },
    xAxis: {
      categories: xAxisDates
    },
    series: [
      {
        showInLegend: false,
        data: yAxisPrices
      }
    ]
  };
  return (
    <Card bordered={false} className="chart-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        className="chart"
      />
    </Card>
  );
};

const mapStateToProps = store => {
  return {
    month: store.stockInfo.month,
    year: store.stockInfo.year,
    stocks: store.stockInfo.stocks
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
