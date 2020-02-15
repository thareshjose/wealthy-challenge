import Axios from "axios";

const stocksUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/tblaBiC6LtFpJ6nRw?api_key=";

const updateStockPriceUrl =
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
  console.log("update call");
  let payload = data;
  return Axios.post(updateStockPriceUrl, payload, { headers: headers });
};
