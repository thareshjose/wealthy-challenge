const initialState = {
  stocks: [],
  stockRecords: [],
  month: ""
};

const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STOCKS_CALENDER":
      let stockRecords = action.stocksData;
      let stocks = stockRecords.map(stock => {
        return { ...stock.fields };
      });
      console.log(stocks);
      console.log(action.stocksData);
      return Object.assign({}, state, {
        stockRecords: stockRecords,
        stocks: stocks
      });
    case "UPDATE_STOCK_DATA":
      let newStock = action.stock.records[0];
      console.log(newStock);
      return Object.assign({}, state, {
        stocks: [...state.stocks, newStock.fields]
      });
    case "SET_MONTH":
      return Object.assign({}, state, { month: action.month });
    default:
      return state;
  }
};

export default stocksReducer;
