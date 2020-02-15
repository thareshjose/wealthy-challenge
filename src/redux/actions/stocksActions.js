import { apiFetchStocksData } from "./apiActions";
import { apiUpdateStockPrice } from "./apiActions";

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

export const updateStockPrice = stock => {
  return dispatch => {
    apiUpdateStockPrice(stock).then(response => {
      if (response.error) {
      } else {
        dispatch(showToastMessage("Stock Price Updated Successfully"));
      }
    });
  };
};

export const showToastMessage = message => {
  return { type: "SHOW_TOAST_MESSAGE", message: message };
};
