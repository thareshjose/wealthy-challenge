import { apiFetchStocksData } from "./apiActions";
import { apiAddStockPrice } from "./apiActions";
import { apiDeleteStockPrice } from "./apiActions";

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

export const setMonthAndYear = (month, year) => {
  return { type: "SET_MONTH_YEAR", month: month, year: year };
};

export const addStockPrice = stock => {
  return dispatch => {
    apiAddStockPrice(stock).then(response => {
      if (!response.data) {
      } else {
        let stock = response.data.records[0];
        dispatch(updateStocksData(stock));
        dispatch(showToastMessage("Stock Price has been updated."));
      }
    });
  };
};

export const deleteStockPrice = stockId => {
  return dispatch => {
    apiDeleteStockPrice(stockId).then(response => {
      if (!response.data) {
      } else {
        dispatch(deleteStockData(stockId));
        dispatch(showToastMessage("Stock Price has been removed!"));
      }
    });
  };
};

export const deleteStockData = stockId => {
  return { type: "DELETE_STOCK_DATA", stockId: stockId };
};

export const updateStocksData = stock => {
  return { type: "UPDATE_STOCK_DATA", stock: stock };
};

export const showToastMessage = message => {
  return { type: "SHOW_TOAST_MESSAGE", message: message };
};
