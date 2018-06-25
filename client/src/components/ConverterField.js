import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import PropTypes from "prop-types";
import FlagIcon from "./FlagIcon";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

/* <Cube time="2018-06-20">
<Cube currency="USD" rate="1.1578"/>
<Cube currency="JPY" rate="127.39"/>
<Cube currency="BGN" rate="1.9558"/>
<Cube currency="CZK" rate="25.835"/>
<Cube currency="DKK" rate="7.4525"/>
<Cube currency="GBP" rate="0.87878"/>
<Cube currency="HUF" rate="324.15"/>
<Cube currency="PLN" rate="4.3152"/>
<Cube currency="RON" rate="4.6695"/>
<Cube currency="SEK" rate="10.2755"/>
<Cube currency="CHF" rate="1.1537"/>
<Cube currency="ISK" rate="125.80"/>
<Cube currency="NOK" rate="9.4693"/>
<Cube currency="HRK" rate="7.3836"/>
<Cube currency="RUB" rate="73.6225"/>
<Cube currency="TRY" rate="5.4943"/>
<Cube currency="AUD" rate="1.5688"/>
<Cube currency="BRL" rate="4.3273"/>
<Cube currency="CAD" rate="1.5398"/>
<Cube currency="CNY" rate="7.4953"/>
<Cube currency="HKD" rate="9.0847"/>
<Cube currency="IDR" rate="16320.23"/>
<Cube currency="ILS" rate="4.2085"/>
<Cube currency="INR" rate="78.8600"/>
<Cube currency="KRW" rate="1281.98"/>
<Cube currency="MXN" rate="23.6794"/>
<Cube currency="MYR" rate="4.6318"/>
<Cube currency="NZD" rate="1.6853"/>
<Cube currency="PHP" rate="61.864"/>
<Cube currency="SGD" rate="1.5718"/>
<Cube currency="THB" rate="37.987"/>
<Cube currency="ZAR" rate="15.8367"/>
</Cube> */

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  }
});

const ranges = [
  {
    value: "0-20",
    label: "0 to 20"
  },
  {
    value: "21-50",
    label: "21 to 50"
  },
  {
    value: "51-100",
    label: "51 to 100"
  }
];

class ConverterField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: "",
      weightRange: "",
      currency: this.props.field === "base" ? "EUR" : "USD"
    };

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleChange = prop => event => {
    console.log(event.target.value);
    this.setState({ [prop]: event.target.value });
    this.props.changeCurrency(this.props.field, event.target.value);
  };

  handleCurrencyChange(event, component, value) {
    this.setValue({ currency: value });
    // this.componentDidMount
    // this.setState({
    //   currency: event.target.value
    // });
    // this.props.changeCurrency(this.props.name, event.target.value);
  }
  render() {
    console.log(this.props);
    const { classes, field, currencies, name } = this.props;

    return (
      <div className="container grid-xs-5">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField
              select
              style={{ minWidth: "150px" }}
              label={`${field} Currency`}
              // className={classNames(classes.margin, classes.textField)}
              value={this.state.currency}
              onChange={this.handleChange("currency")}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start"> Kg </InputAdornment>
              //   )
              // }}
            >
              {currencies.map(option => (
                <MenuItem
                  key={option.code}
                  value={option.code}
                  selected={field === "base" ? true : false}
                >
                  {" "}
                  <FlagIcon code={option.flag_code} size="1x" /> {option.code} -{" "}
                  {option.name}
                </MenuItem>
              ))}{" "}
            </TextField>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ConverterField);
