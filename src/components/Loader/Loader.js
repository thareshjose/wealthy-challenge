import React from "react";
import { Spin } from "antd";

import "./loader.css";

const Loader = props => {
  return <Spin tip="Loading..." className="loader-container"></Spin>;
};

export default Loader;
