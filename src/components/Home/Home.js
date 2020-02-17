import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStocksData } from "../../redux/actions/stocksActions";
import StocksCalender from "../StocksCalender/StocksCalender";
import Chart from "../Chart/Chart";
import Profit from "../Profit/Profit";
import Loader from "../Loader/Loader";

const Home = props => {
  useEffect(() => {
    props.getStocksData();
  }, []);
  return (
    <div className="container-main">
      {props.stocks.length ? (
        <div>
          <StocksCalender /> <Profit /> <Chart />
        </div>
      ) : (
        <Loader />
      )}
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
