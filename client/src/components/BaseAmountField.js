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

class BaseAmountField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.baseField.value
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  //   componentDidMount() {
  //     this.textInput.current.focusTextInput();
  //   }
  async handleValueChange(event) {
    console.log("hello");
    await this.props.changeValue(this.props.name, event.target.value);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  componentWillMount() {
    this.props.changeValue(this.props.name, 1);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      amount: nextProps.baseField.value
    });
    this.setState({ key: Math.random() });
  }

  onKeyDown = e => {
    let self = this;
    if (e.keyCode === 8) {
      console.log("delete");
      var input = document.getElementById("base-amount");
      console.log(input);
      //   If the input is empty then 0 automatically shows up in the other input
      if (!input.value) {
        console.log("hi");
        return self.props.changeValue(this.props.name, 0);
      }
    }
  };
  handleClick() {
    if (!this.props.baseInput) {
      this.props.changeInput();
    }
    // console.log(this.textInput);
    // this.textInput.current.focus();
    // this.textInput = React.createRef();
  }

  // in the base I type a number and on change it then calls CONVERT
  // and that is the value of the other one
  render() {
    console.log(this.props);
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
            ref={this.textInput}
            onClick={this.handleClick.bind(this)}
            autoFocus={this.props.baseInput}
            id={`${name}-amount`}
            onChange={this.handleValueChange}
            value={this.state.amount}
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

BaseAmountField.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  currencies: PropTypes.object.isRequired,
  changeValue: PropTypes.function,
  changeCurrency: PropTypes.function
};

export default withStyles(styles)(BaseAmountField);
