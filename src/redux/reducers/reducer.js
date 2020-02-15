import { combineReducers } from "redux";
import stocksReducer from "./stocksReducer";

export const rootReducer = combineReducers({
  stockInfo: stocksReducer
});
