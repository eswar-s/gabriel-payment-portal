import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import 'react-credit-cards/es/styles-compiled.css';

import EnhancedTable from './EnhancedTable';

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
});

class Home extends Component {
  render() {
    //const { classes } = this.props;
    return (
        <EnhancedTable/>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
