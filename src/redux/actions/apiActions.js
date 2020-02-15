import Axios from "axios";

const stocksUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/tblaBiC6LtFpJ6nRw?api_key=";

const modifyStockPriceUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/Stock%20Prices";

const apiKey = "keyqdUGZqw83GnkG7";
const headers = {
  Authorization: "Bearer " + apiKey,
  "Content-Type": "application/json"
};

export const apiFetchStocksData = () => {
  console.log("here");
  let encodedURI = window.encodeURI(stocksUrl + apiKey);
  return Axios.get(encodedURI)
    .then(response => {
      return response;
    })
    .catch(error => {
      return { error: error };
    });
};

export const apiAddStockPrice = data => {
  let payload = data;
  return Axios.post(modifyStockPriceUrl, payload, { headers: headers });
};

export const apiDeleteStockPrice = stockId => {
  return Axios.delete(modifyStockPriceUrl + "/" + stockId, {
    headers: headers
  });
};
