import { apiFetchStocksData } from "./apiActions";
import { apiAddStockPrice } from "./apiActions";

export const getStocksData = () => {
  return dispatch => {
    apiFetchStocksData().then(response => {
      if (response.error) {
      } else {
        console.log(response.data.records);
        dispatch(updateStocksCalender(response.data.records));
      }
    });
  };
};

export const updateStocksCalender = stocksData => {
  return { type: "UPDATE_STOCKS_CALENDER", stocksData: stocksData };
};

export const setMonth = month => {
  return { type: "SET_MONTH", month: month };
};

export const addStockPrice = stock => {
  return dispatch => {
    apiAddStockPrice(stock).then(response => {
      console.log(response);
      if (!response.data) {
      } else {
        dispatch(updateStocksData(stock));
        dispatch(showToastMessage("Stock Price Updated Successfully"));
      }
    });
  };
};

export const updateStocksData = stock => {
  return { type: "UPDATE_STOCK_DATA", stock: stock };
};

export const showToastMessage = message => {
  return { type: "SHOW_TOAST_MESSAGE", message: message };
};
