import Axios from "axios";

const stocksUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/tblaBiC6LtFpJ6nRw?sort%5B0%5D%5Bfield%5D=date&sort%5B0%5D%5Bdirection%5D=asc";

const modifyStockPriceUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/Stock%20Prices";

const apiKey = "keyqdUGZqw83GnkG7";
const headers = {
  Authorization: "Bearer " + apiKey,
  "Content-Type": "application/json"
};

export const apiFetchStocksData = () => {
  console.log("here");
  return Axios.get(stocksUrl, { headers: headers })
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
