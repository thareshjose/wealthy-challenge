const initialState = {
  stocks: [],
  stockRecords: [],
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  buyDate: "",
  sellDate: "",
  maximumProfit: 0
};

const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STOCKS_CALENDER":
      let stockRecords = action.stocksData;
      let stocks = stockRecords.map(stock => {
        return { id: stock.id, ...stock.fields };
      });
      return Object.assign({}, state, {
        stockRecords: stockRecords,
        stocks: stocks
      });
    case "UPDATE_STOCK_DATA":
      let newStock = action.stock;
      let updatedStocksList = [
        { id: newStock.id, ...newStock.fields },
        ...state.stocks
      ];
      updatedStocksList.sort((stockA, stockB) => {
        let stockADate = new Date(stockA.date);
        let stockBDate = new Date(stockB.date);
        if (stockADate < stockBDate) return -1;
        if (stockADate > stockBDate) return 1;
        return 0;
      });
      return Object.assign({}, state, {
        stocks: updatedStocksList
      });
    case "DELETE_STOCK_DATA":
      let stocksInState = state.stocks;
      let updatedStocks = stocksInState.filter(x => x.id !== action.stockId);
      return Object.assign({}, state, { stocks: updatedStocks });
    case "SET_MONTH_YEAR":
      return Object.assign({}, state, {
        month: action.month,
        year: action.year
      });
    case "GET_MAXIMUM_PROFIT":
      let dailyProfitList = state.stocks.map((stockA, indexA) => {
        let stockDetails = { ...stockA };
        let price = Number(stockA.price) * 10;

        let priceDiffList = state.stocks.map((stockB, indexB) => {
          let priceDiff = Number(stockB.price) * 10 - price;
          if (indexB <= indexA) {
            return 0;
          }
          return priceDiff >= 0 ? priceDiff : 0;
        });
        return Math.max(...priceDiffList);
      });
      const maximumProfit = Math.max(...dailyProfitList);
      return Object.assign({}, state, { maximumProfit: maximumProfit });
    default:
      return state;
  }
};

export default stocksReducer;
