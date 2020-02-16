import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStocksData } from "../../redux/actions/stocksActions";
import StocksCalender from "../StocksCalender/StocksCalender";
import Chart from "../Chart/Chart";

const Home = props => {
  useEffect(() => {
    props.getStocksData();
    console.log("getting");
  }, []);
  return (
    <div className="container-main">
      {props.stocks.length ? (
        <div className="calender-container">
          <StocksCalender />
        </div>
      ) : (
        <div>Loading calender</div>
      )}
      <Chart />
    </div>
  );
};

const mapStateToProps = store => {
  return {
    stocks: store.stockInfo.stocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStocksData: () => dispatch(getStocksData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
