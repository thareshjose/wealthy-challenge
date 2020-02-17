import React, { useState } from "react";
import { Calendar, Button, Icon, Tag, Modal, InputNumber, Card } from "antd";
import { connect } from "react-redux";
import { getStocksData } from "../../redux/actions/stocksActions";
import { addStockPrice } from "../../redux/actions/stocksActions";
import { deleteStockPrice } from "../../redux/actions/stocksActions";
import { setMonthAndYear } from "../../redux/actions/stocksActions";

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
  const [selectedDate, setSelectedDate] = useState();

  const stocks = props.stocks;
  const stocksData = stocks.map(stock => {
    let stockDate = new Date(stock.date);
    let day = stockDate.getDate();
    let month = stockDate.getMonth();
    let year = stockDate.getFullYear();
    return Object.assign({}, { year: year, month: month, day: day, ...stock });
  });

  const getStockRecord = value => {
    return stocksData.filter(
      stock =>
        stock.day === value.date() &&
        stock.month === value.month() &&
        stock.year === value.year()
    );
  };

  const toggleModalVisibility = date => {
    setModalVisibility(!modalVisible);
    setSelectedDate(date);
  };

  const setNewStocksPrice = stockPrice => {
    setNewStockPrice(stockPrice);
  };

  const addStockPrice = () => {
    let date =
      selectedDate.year() +
      "-" +
      (selectedDate.month() + 1) +
      "-" +
      selectedDate.date();

    let newStockData = {
      records: [
        {
          fields: {
            date,
            price: newStockPrice
          }
        }
      ]
    };
    props.addStockPrice(newStockData);
    setNewStockPrice(0);
    toggleModalVisibility();
  };

  const deleteStockPrice = stock => {
    let stockId = stock.id;
    props.deleteStockPrice(stockId);
  };

  const setMonthAndYear = value => {
    let date = new Date(value);
    let month = date.getMonth();
    let year = date.getFullYear();
    props.setMonthAndYear(month, year);
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
                  onClick={() => deleteStockPrice(stock)}
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
          <li className="add-stock-list-item">
            <Button
              className="add-stock-button"
              onClick={() => toggleModalVisibility(value)}
            >
              <span>
                <Icon type="plus" />
                Add
              </span>
            </Button>
          </li>
        )}
      </ul>
    );
  };

  return (
    <Card bordered={false} className="stocks-container">
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={setMonthAndYear}
      />
      <Modal
        title="Add Stock Price"
        visible={modalVisible}
        onOk={addStockPrice}
        onCancel={toggleModalVisibility}
        className="add-stock-modal"
      >
        <InputNumber
          formatter={value => `₹ ${value}`}
          size="large"
          defaultValue={0}
          value={0}
          onChange={setNewStocksPrice}
          onPressEnter={() => alert("hi")}
          className="stock-price-input"
        />
      </Modal>
    </Card>
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
    setMonthAndYear: (month, year) => dispatch(setMonthAndYear(month, year)),
    addStockPrice: newStockData => dispatch(addStockPrice(newStockData)),
    deleteStockPrice: stockId => dispatch(deleteStockPrice(stockId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksCalender);
