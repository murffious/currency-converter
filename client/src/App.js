import React, { Component } from "react";
import "./App.css";
import ConverterContainer from "./containers/ConverterContainer";
import BottomNav from "./components/BottomNav";
import EvenMorePanels from "./components/EvenMorePanels";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    margin: "0 auto",
    backgroundColor: "#e7e7e7",
    width: "600px"
  })
});
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <div>
          <BottomNav />
          <Paper className={classes.root}>
            <header className="header clearfix">
              <h3 className="text-muted">FX Currency Converter</h3>
            </header>
            {/* Need to find google symbol maybe */}
            {/* <a href="/auth/google">Login with Google</a> */}
            <main>
              <ConverterContainer />
            </main>
            <EvenMorePanels />
          </Paper>
        </div>
        <footer className="footer">&copy; Paul Murff, 2018</footer>
      </div>
    );
  }
}

export default withStyles(styles)(App);
