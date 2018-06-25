import * as types from "../../constants/ActionTypes";
import fetch from "cross-fetch";

export const changeValue = (emitter, value) => ({
  type: types.CHANGE_VALUE,
  emitter: emitter,
  value: value
});

export const changeCurrency = (emitter, currency) => ({
  type: types.CHANGE_CURRENCY,
  emitter: emitter,
  currency: currency
});

export const receiveExchangeRates = rates => ({
  type: types.RECEIVE_EXCHANGE_RATES,
  rates
});

export const changeInput = () => ({
  type: types.CHANGE_INPUT
  // emitter: emitter,
});

const getExchangeRates = (dispatch, baseCurrency, currencies) => {
  // var url = `https://api.fixer.io/latest?base=${baseCurrency}&symbols=${currencies}`;
  // return fetch(url)
  //   .then(
  //     response => response.json(),
  //     error => console.log("An error occured.", error)
  //   )
  //   .then(json => dispatch(receiveExchangeRates(json)));
  // const url = "http://localhost:5000/convert";
  // return fetch(url)
  //   .then(
  //     response => console.log(response.body), //response.json(),
  //     error => console.log("An error occured.", error)
  //   )
  //   .then(json => dispatch(receiveExchangeRates({ rates: json })));
};

export const updateExchangeRates = currencies => dispatch => {
  currencies.forEach(currency => {
    getExchangeRates(dispatch, currency, currencies);
  });
};
