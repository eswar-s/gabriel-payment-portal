import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'react-credit-cards/es/styles-compiled.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import GabrielIcon from './GabrielIcon';
import GabrielCircleIcon from './GabrielCircleIcon';
import Home from './Home';
import ThankYou from './ThankYou';
import RetailerInfo from './RetailerInfo';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#fa451c' }, // Purple and green play nicely together.
    secondary: { main: indigo['A200'] }, // This is just green.A700 as hex.
  },
});

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    margin: theme.spacing.unit / 2,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 12,
    }
  },
  gabrielIcon: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '150px',
    height: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '20px',
    }
  },
  gabrielCircleIcon: {
    width: 48,
    height: 48,
  },
  header: {
    fontFamily: "'Averia Serif Libre', cursive",
    fontSize: '22px',
    fontWeight: '100'
  },
  appBar: {
    paddingTop: 'env(safe-area-inset-top)',
  }
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" className={classes.appBar}>
              <Toolbar>
              {/* <GabrielIcon className={classes.gabrielIcon}/> */}
              <GabrielCircleIcon className={classes.gabrielCircleIcon}/>
              <h2 className={classes.header}>
                  Payment Portal
              </h2>
              </Toolbar>
          </AppBar>
          <div className={classes.root}>
            <RetailerInfo />
            <div className={classes.table}>
              <Switch>
                <Route exact path="/" render={() => (
                    <Redirect to="/home"/>
                )}/>
                <Route path='/home' component={Home}/>
                <Route path='/success' component={ThankYou}/>
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
