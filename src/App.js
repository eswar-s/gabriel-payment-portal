import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import './App.css';
import GabrielIcon from './GabrielIcon'

import 'react-credit-cards/es/styles-compiled.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import EnhancedTable from './EnhancedTable';
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
  table: {
    margin: theme.spacing.unit / 2,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 12,
    }
  },
  header: {
    fontFamily: "'Averia Serif Libre', cursive",
    fontSize: '22px',
    fontWeight: '100'
  }
});

class App extends Component {

  componentDidMount() {
    window.gtag('config', 'UA-120029252-1', { 'page_path': '/amavida', 'page_title': 'amavida', 'campaign': {
      'source': 'Localhost', 'medium': 'Embed'
    }});

    window.gtag('event', 'view_item_list', {
      "items": [
        {
          "name": "Android Warhol T-Shirt",
          "list_name": "Store Locate Results",
          "list_position": 1,
        },
        {
          "name": "Flame challenge TShirt",
          "list_name": "Store Locate Results",
          "list_position": 2,
        }
      ]
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <GabrielIcon className={classes.gabrielIcon}/>
                <h2 className={classes.header}>
                  Payment Portal
                </h2>
              </Toolbar>
            </AppBar>
            <RetailerInfo />
            <div className={classes.table}>
              <EnhancedTable/>
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
