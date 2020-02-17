import React, { useEffect } from "react";
import { Card } from "antd";

import "./profit.css";
import { connect } from "react-redux";
import { getMaximumProfit } from "../../redux/actions/stocksActions";

const Profit = props => {
  useEffect(() => {
    props.getMaximumProfit();
  });
  return (
    <Card bordered={false} className="profit-price-container">
      <p>Maximum Profit: ₹{props.maximumProfit}</p>
    </Card>
  );
};

const mapStateToProps = store => {
  return {
    month: store.stockInfo.month,
    year: store.stockInfo.year,
    stocks: store.stockInfo.stocks,
    maximumProfit: store.stockInfo.maximumProfit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMaximumProfit: () => dispatch(getMaximumProfit())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profit);
