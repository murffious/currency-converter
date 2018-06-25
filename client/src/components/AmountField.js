import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

class AmountField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.quoteField.value,
      inputName: this.props.inputName,
      defaultLoaded: this.props.defaultLoaded
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  async handleValueChange(event) {
    console.log(
      "yes its time quote to base input change",
      this.props.name,
      event.target.value
    );
    await this.props.changeValue(this.props.name, event.target.value);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  onKeyDown = e => {
    let self = this;
    if (e.keyCode === 8) {
      console.log("delete");
      var input = document.getElementById("base-amount");
      console.log(input);
      if (!input.value) {
        console.log("hi");
        return self.props.changeValue(this.props.name, 0);
      }
    }
  };
  handleClick() {
    // need to maybe send name back instead of toggle  tis not working perfeectly on this one
    if (!this.props.baseInput) {
      this.props.changeInput();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      amount: nextProps.quoteField.value
    });
    this.setState({ key: Math.random() });
  }
  // in the base I type a number and on change it then calls CONVERT
  // and that is the value of the other one
  render() {
    console.log(this.props, "state:", this.state);
    const { classes, baseField, name, quoteField } = this.props;
    // console.log(baseField);
    return (
      <div>
        <FormControl fullWidth className={classes.margin}>
          <InputLabel htmlFor="base-amount">
            {name === "base"
              ? "I have this much money"
              : "I want to buy an item at this price"}
          </InputLabel>
          <Input
            key={this.state.key}
            onClick={this.handleClick}
            autoFocus={this.props.quoteInput}
            id={`${name}-amount`}
            onChange={this.handleValueChange}
            defaultValue={this.state.amount}
            // onChange={this.handleChange("amount")}
            onKeyDown={this.onKeyDown}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
        {/* <form className="form">
          <div className="form-row align-items-center">
            <div className="col-auto">
              <select
                className="custom-select mr-2 mb-2"
                onChange={this.handleCurrencyChange}
                // value={this.props.fields.currency}
              >
                {Object.keys(this.props.currencies).map((currency, i) => (
                  <option key={i} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <input
                type="number"
                step="0.01"
                min="0"
                max="1000"
                className="form-control mr-2 mb-2"
                onChange={this.handleValueChange}
                value={this.props.fields.value}
              />
            </div>
          </div>
        </form> */}
      </div>
    );
  }
}

AmountField.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  changeValue: PropTypes.function,
  changeCurrency: PropTypes.function
};

export default withStyles(styles)(AmountField);
