import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import AmountField from "../components/AmountField";
import ExchangeRateDisplay from "../components/ExchangeRateDisplay";
import * as Actions from "../redux/actions/fx_actions";
import Card from "../components/Card";
import $ from "jquery";

class ConverterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ""
    };
  }
  updateExchangeRates() {
    this.props.actions.updateExchangeRates(Object.keys(this.props.currencies));
  }

  componentDidMount() {
    // this.updateExchangeRates();
    // // Use this to update the rates every monring
    // setInterval(() => {
    //   this.updateExchangeRates();
    // }, 100000000000);
    // experimental api call for fe
    // const getXMLData = listdata => {
    //   const parseData = new DOMParser().parseFromString(listdata, "text/xml");
    //   const allVideoTitle = parseData.getElementsByTagName("title");
    //   const allVideoId = parseData.getElementsByTagName("yt:videoId");
    //   const allThumbnails = parseData.getElementsByTagName("media:thumbnail");
    //   /* define a new array */
    //   const finalArray = [];
    //   /* push all items in one array */
    //   for (const i = 0; i < allVideoId.length; i++) {
    //     finalArray.push({
    //       title: allVideoTitle[i].textContent,
    //       id: allVideoId[i].textContent,
    //       thumbnail: allThumbnails[i].getAttribute("url")
    //     });
    //   }
    //   return finalArray;
    // };
    // fetch("http://localhost:5000/refresh-exchange-rates")
    //   .then(Data => Data.text())
    //   .then(DataText => this.setState({ videos: getXMLData(DataText) }));
  }

  render() {
    return (
      // <div className="container" key={this.props.quote.value}>

      <div className="container">
        <Card
          refs={this.myRef}
          baseField={this.props.base}
          quoteField={this.props.quote}
          currencies={this.props.currencies}
          changeValue={this.props.actions.changeValue}
          changeCurrency={this.props.actions.changeCurrency}
          // not needed convert money ..? delete
          convertMoney={this.props.actions.convertMoney}
          changeInput={this.props.actions.changeInput}
          baseInput={this.props.baseInput}
          quoteInput={this.props.quoteInput}
          defaultLoaded={this.props.defaultLoaded}
        />
      </div>
    );
  }
}

ConverterContainer.propTypes = {
  base: PropTypes.object.isRequired,
  quote: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  exchangeRates: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return {
    base: state.base,
    quote: state.quote,
    currencies: state.currencies,
    exchangeRates: state.exchangeRates,
    baseInput: state.baseInput,
    quoteInput: state.quoteInput,
    defaultLoaded: state.defaultLoaded
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConverterContainer);
