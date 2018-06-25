import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
import ConverterField from "./ConverterField";
import AmountField from "./AmountField";
import BaseAmountField from "./BaseAmountField";

import SwapHoriz from "@material-ui/icons/SwapHoriz";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import Save from "@material-ui/icons/Save";
import Icon from "@material-ui/core/Icon";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ExchangeRateDisplay from "./ExchangeRateDisplay";

const styles = theme => ({
  root: {
    color: theme.palette.text.primary
  },
  icon: {
    margin: theme.spacing.unit
  },
  card: {
    minWidth: 600
  },
  wrapper: {
    maxWidth: 600,
    margin: "0 auto"
  },
  countries: {
    display: "flex",
    justifyContent: "space-around"
  },
  fields: {
    minWidth: "200px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function SimpleCard(props) {
  console.log(props);
  const {
    classes,
    currencies,
    baseField,
    quoteField,
    changeCurrency,
    changeValue,
    convertMoney,
    changeInput,
    quoteInput,
    baseInput,
    defaultLoaded
  } = props;
  //   const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.countries}>
            <ConverterField
              field="base"
              currencies={currencies}
              changeCurrency={changeCurrency}
              className={classes.fields}
            />
            <ConverterField
              field="quote"
              currencies={currencies}
              changeCurrency={changeCurrency}
            />
          </div>
          <IconButton className={classes.button} aria-label="Swap">
            <SwapHoriz className={classes.icon} />
          </IconButton>
          <div />
          <div className={classes.countries}>
            <BaseAmountField
              name="base"
              refs={props.refs}
              baseField={baseField}
              currencies={currencies}
              changeValue={changeValue}
              convertMoney={convertMoney}
              changeInput={changeInput}
              baseInput={baseInput}
            />
            <AmountField
              name="quote"
              quoteField={quoteField}
              currencies={currencies}
              changeValue={changeValue}
              changeCurrency={changeCurrency}
              convertMoney={convertMoney}
              changeInput={changeInput}
              quoteInput={quoteInput}
              defaultLoaded={defaultLoaded}
            />
          </div>
        </CardContent>
        <CardActions>
          <IconButton color="secondary" aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
