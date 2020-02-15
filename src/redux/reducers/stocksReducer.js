const initialState = {
  currentMonth: "ap",
  stocks: [],
  month: ""
};

const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_STOCKS_CALENDER":
      return Object.assign({}, state, { stocks: action.stocksData });
    case "SET_MONTH":
      return Object.assign({}, state, { month: action.month });
    default:
      return state;
  }
};

export default stocksReducer;
