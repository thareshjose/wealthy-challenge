import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStocksData } from "../../redux/actions/stocksActions";
import StocksCalender from "../StocksCalender/StocksCalender";

const Home = props => {
  useEffect(() => {
    props.getStocksData();
  }, []);
  if (props.stocks.length) {
    return (
      <div className="container-main">{props.stocks && <StocksCalender />}</div>
    );
  } else {
    return <div>...loading</div>;
  }
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
