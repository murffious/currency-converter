import {
  CHANGE_VALUE,
  CHANGE_CURRENCY,
  RECEIVE_EXCHANGE_RATES,
  CHANGE_INPUT
} from "../../constants/ActionTypes";
import { CURRENCIES, EXCHANGE_RATES } from "../../constants/Currencies";
import axios from "axios";
// import money from "../../containers/library";
import fx from "money"; // import { fx } from 'money'
import $ from "jquery";

const initialState = {
  base: {
    currency: CURRENCIES[6].code,
    value: 1
  },
  quote: {
    currency: CURRENCIES[0].code,
    value: 1
  },
  currencies: CURRENCIES,
  exchangeRates: EXCHANGE_RATES,
  // toggle
  baseInput: true,
  quoteInput: false,
  defaultLoaded: false
};

const isValidAmount = value => /^\d+(\.|,)?(\d{0,2})?$/.test(value);

const getCurrentExchangeRate = state =>
  state.exchangeRates[state.base.currency][state.quote.currency];

const calculateQuoteValue = state => {
  console.log("yay reducer", state);
  let from = state.base.currency;
  let to = state.quote.currency;

  fx.base = "EUR";
  fx.rates = {
    EUR: 1, //base rate
    USD: 1.1578,
    JPY: 127.39,
    BGN: 1.9558,
    CZK: 25.835,
    DKK: 7.4525,
    GBP: 0.87878,
    HUF: 324.15,
    PLN: 4.3152,
    RON: 4.6695,
    SEK: 10.2755,
    CHF: 1.1537,
    ISK: 125.8,
    NOK: 9.4693,
    HRK: 7.3836,
    RUB: 73.6225,
    TRY: 5.4943,
    AUD: 1.5688,
    BRL: 4.3273,
    CAD: 1.5398,
    CNY: 7.4953,
    HKD: 9.0847,
    IDR: 16320.23,
    ILS: 4.2085,
    INR: 78.86,
    KRW: 1281.98,
    MXN: 23.6794,
    MYR: 4.6318,
    NZD: 1.6853,
    PHP: 61.864,
    SGD: 1.5718,
    THB: 37.987,
    ZAR: 15.8367
  };
  var num = fx.convert(state.base.value, { from, to });
  console.log(num);

  // error => console.log("An error occured.", error);

  return {
    ...state,
    quote: {
      currency: state.quote.currency,
      value: num.toFixed(2)
    }
  };
};

const calculateBaseValue = state => {
  console.log(state);
  let from = state.quote.currency;
  let to = state.base.currency;
  fx.base = "EUR";
  fx.rates = {
    EUR: 1, //base rate
    USD: 1.1578,
    JPY: 127.39,
    BGN: 1.9558,
    CZK: 25.835,
    DKK: 7.4525,
    GBP: 0.87878,
    HUF: 324.15,
    PLN: 4.3152,
    RON: 4.6695,
    SEK: 10.2755,
    CHF: 1.1537,
    ISK: 125.8,
    NOK: 9.4693,
    HRK: 7.3836,
    RUB: 73.6225,
    TRY: 5.4943,
    AUD: 1.5688,
    BRL: 4.3273,
    CAD: 1.5398,
    CNY: 7.4953,
    HKD: 9.0847,
    IDR: 16320.23,
    ILS: 4.2085,
    INR: 78.86,
    KRW: 1281.98,
    MXN: 23.6794,
    MYR: 4.6318,
    NZD: 1.6853,
    PHP: 61.864,
    SGD: 1.5718,
    THB: 37.987,
    ZAR: 15.8367
  };
  let num = fx.convert(state.quote.value, { from, to });
  console.log(num, "ya999");
  return {
    ...state,
    base: {
      currency: state.base.currency,
      value: num.toFixed(2)
    }
  };
};

export default function exchange(state = initialState, action) {
  var tempState = undefined;
  switch (action.type) {
    case CHANGE_VALUE:
      if (
        !isValidAmount(Math.floor(action.value)) &&
        action.value.trim() !== ""
      ) {
        console.log("yup");
        return state;
      }

      tempState = { ...state };
      tempState[action.emitter].value = action.value;
      tempState.defaultLoaded = true;
      console.log(tempState);
      switch (action.emitter) {
        case "base":
          console.log("me ya quote load");

          return calculateQuoteValue(tempState);
        case "quote":
          console.log("me ya quote to base");
          return calculateBaseValue(tempState);
        default:
          console.error("Unknown emitter!");
          return;
      }
    case CHANGE_CURRENCY:
      // console.log(action.value);
      console.log(action);
      tempState = { ...state };
      tempState[action.emitter].currency = action.currency;
      switch (action.emitter) {
        case "base":
          console.log("base currency change");
          return calculateQuoteValue(tempState);
        case "quote":
          console.log("me ya quote to base after currency change");
          return calculateBaseValue(tempState);
        default:
          console.error("Unknown emitter!");
          return;
      }
    case RECEIVE_EXCHANGE_RATES:
      console.log("Updating exchange rates...");
      console.log(action, tempState, "state", state);
      tempState = { ...state };
      tempState.exchangeRates[action.rates.base] = {
        ...tempState.exchangeRates[action.rates.base],
        ...action.rates.rates
      };
      return calculateQuoteValue(tempState);
    case CHANGE_INPUT:
      tempState = { ...state };
      console.log(action, "tempstate:", tempState);
      // tempState[action.emitter].inputName = action.inputName;
      (tempState.baseInput = !tempState.baseInput),
        (tempState.quoteInput = !tempState.quoteInput);
      // switch (action.emitter) {
      //   case "base":
      //     return;
      //   case "quote":
      //     return;
      //   default:
      //     console.error("Unknown emitter!");
      //     return;
      // }
      return tempState;
    default:
      return state;
  }
}
