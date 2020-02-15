import React from "react";
import { Provider } from "react-redux";
import Home from "./components/Home/Home";

import "./App.css";
import configureStore from "./redux/store";

function App() {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
