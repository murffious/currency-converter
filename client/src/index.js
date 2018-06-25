import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./redux/reducers/FXConvrterReducer";
// Maybe yse bootstrap /jquery not sure yet
// import 'bootstrap';
// import './styles/index.scss'; maybe use scss
// window.$ = window.jQuery = require('jquery');
// window.Popper = require('popper.js');

const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
