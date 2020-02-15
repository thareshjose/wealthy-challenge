import Axios from "axios";

const stocksUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/tblaBiC6LtFpJ6nRw?api_key=";

const updateStockPriceUrl =
  "https://api.airtable.com/v0/appfSnQLDjmZaKBkW/Stock%20Prices/recQ1rDXjCYH5IWxh";
const apiKey = "keyqdUGZqw83GnkG7";

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

export const apiUpdateStockPrice = data => {
  console.log("update call");
  let encodedURI = window.encodeURI(updateStockPriceUrl);
  let payload = data;
  return Axios.put(encodedURI, payload)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};
