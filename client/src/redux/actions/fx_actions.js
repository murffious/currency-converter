import * as types from "../../constants/ActionTypes";
import fetch from "cross-fetch";
import $ from "jquery";

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

// const getExchangeRates = (dispatch, baseCurrency, currencies) => {
//   fetch("http://localhost:5000/refresh-exchange-rates")
//     .then(
//       response => response.json(),
//       error => console.log("An error occured.", error)
//     )
//     .then(json => console.log(json));
// };

// export const updateExchangeRates = currencies => dispatch => {
//   currencies.forEach(currency => {
//     getExchangeRates(dispatch, currency, currencies);
//   });
// };
// Making one solo function
export const updateExchangeRates = currencies => dispatch => {
  fetch("http://localhost:5000/refresh-exchange-rates")
    .then(
      response => response.json(),
      error => console.log("An error occured.", error)
    )
    .then(json => dispatch(receiveExchangeRates(json)));
};
