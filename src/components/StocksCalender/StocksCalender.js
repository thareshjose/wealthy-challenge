import React, { useState } from "react";
import { Calendar, Badge, Icon, Tag, Modal, InputNumber } from "antd";
import { connect } from "react-redux";
import { getStocksData } from "../../redux/actions/stocksActions";
import { setMonth } from "../../redux/actions/stocksActions";

import "antd/dist/antd.css";
import "./stocks-calender.css";

const getMonthData = value => {
  if (value.month() === 8) {
    return 1394;
  }
};

function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

const StocksCalender = props => {
  const [modalVisible, setModalVisibility] = useState(false);
  const [newStockPrice, setNewStockPrice] = useState(0);

  const stocks = props.stocks;
  const stocksData = stocks.map(stock => {
    let stockDate = new Date(stock.fields.date);
    let day = stockDate.getDate();
    let month = stockDate.getMonth();
    let year = stockDate.getFullYear();
    return Object.assign(
      {},
      { year: year, month: month, day: day, ...stock.fields }
    );
  });

  const getStockRecord = value => {
    console.log(value);
    return stocksData.filter(
      stock =>
        stock.day === value.date() &&
        stock.month === value.month() &&
        stock.year === value.year()
    );
  };

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisible);
  };

  const setNewStocksPrice = stockPrice => {
    setNewStockPrice(stockPrice);
  };

  const addStockPrice = () => {
    alert(newStockPrice);
    setNewStockPrice(0);
    toggleModalVisibility();
  };

  const setMonth = value => {
    let date = new Date(value);
    let month = date.getMonth();
    props.setMonth(month);
  };

  const dateCellRender = value => {
    const stockRecord = getStockRecord(value);
    return (
      <ul className="stock-price-container">
        {stockRecord &&
          stockRecord.map((stock, index) => (
            <ul key={index} className="stock-price-item">
              <li className="stock-remove-button">
                <Icon
                  type="close-circle"
                  theme="filled"
                  className="stock-remove-icon"
                />
              </li>
              <li>
                <Tag color="geekblue" className="calender-stock-price">
                  ₹{stock.price}
                </Tag>
              </li>
            </ul>
          ))}
        {stockRecord.length === 0 && (
          <li className="add-stock-icon">
            <Icon
              type="plus-circle"
              theme="twoTone"
              twoToneColor="#52c41a"
              onClick={toggleModalVisibility}
            />
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className="container-stocks">
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={setMonth}
      />
      <Modal
        title="Add Stock Price"
        visible={modalVisible}
        onOk={addStockPrice}
        onCancel={toggleModalVisibility}
        className="add-stock-modal"
      >
        <InputNumber
          defaultValue={0}
          onChange={setNewStocksPrice}
          className="stock-price-input"
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = store => {
  return {
    stocks: store.stockInfo.stocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStocksData: () => dispatch(getStocksData()),
    setMonth: month => dispatch(setMonth(month))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksCalender);
