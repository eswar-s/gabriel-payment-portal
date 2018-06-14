import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import 'react-credit-cards/es/styles-compiled.css';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import EnhancedTableReadOnly from './EnhancedTableReadOnly';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    margin: theme.spacing.unit / 2,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 24,
    }
  },
  typo: {
    padding: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonLink: {
    color: 'inherit',
    textDecoration: 'none'
  },
});

class ThankYou extends Component {
  render() {
    const { classes } = this.props;
    const paidData = JSON.parse(localStorage.getItem('paidData'));
    return (
        <div className={classes.root}>
          {paidData ? (
            <div className={classes.table}>
              <Paper className={classes.typo}>
                <Typography variant="subheading" component="h3">
                  Thank you, Your payment is completed.
                </Typography>
                <Typography variant="body2" component="h3">
                  You did payment for following invoices
                </Typography>
              </Paper>
              <EnhancedTableReadOnly data={paidData}/>
            </div>) : (
              <Paper className={classes.typo}>
                <Typography variant="subheading" component="h3">
                  Please pay amount using below button
                </Typography>
                <Button variant="contained" color="primary" className={classes.button}>
                  <Link to='../' className={classes.buttonLink}>Pay amount</Link>
                </Button>
              </Paper>
            )
          }
        </div>
    );
  }
}

ThankYou.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ThankYou);
