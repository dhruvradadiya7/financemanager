import axios from "axios";

export const fetchTickersData = (tickers) => {
  if (!(tickers && tickers.length)) {
    return "No tickers found!";
  }

  let url = `https://fmpcloud.io/api/v3/quote/${tickers.join(",")}?apikey=${
    process.env.NEXT_PUBLIC_FMP_CLOUD_API
  }`;
  return axios.get(url);
};

export const fetchMostActive = () => {
  let url = `https://fmpcloud.io/api/v3/actives?apikey=${process.env.NEXT_PUBLIC_FMP_CLOUD_API}`;
  return axios.get(url);
};

export const fetchTickerResults = (query) => {
  let url = `https://fmpcloud.io/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${process.env.NEXT_PUBLIC_FMP_CLOUD_API}`;
  return axios.get(url);
};

export const fetchSingleTicker = (ticker) => {
  let url = `https://fmpcloud.io/api/v3/quote/${ticker}?apikey=${process.env.NEXT_PUBLIC_FMP_CLOUD_API}`;
  return axios.get(url);
};

export const fetchBatchTicker = (tickers) => {
  const promises = [];
  tickers.forEach((ticker) => {
    promises.push(fetchSingleTicker(ticker));
  });
  return Promise.allSettled(promises);
};
