import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import CanadaIcon from './CanadaIcon';
import UnitedStatesAmericaIcon from './UnitedStatesAmericaIcon';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    currencyInvoicesOptions: {
        width: 146,
    },
    rootCountry: {
        filter: 'grayscale(1)'
    },
    selectedCountry: {
        filter: 'grayscale(0)'
    },
});

class EnhancedTableToolbar extends Component {
    render() {
        const { numSelected, classes, selectedCurrencyInvoices } = this.props;
        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                            <Typography variant="title" id="tableTitle">
                                Open Invoice Statement
                            </Typography>
                    )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        // <Tooltip title="Clear all">
                        // </Tooltip>
                            <IconButton aria-label="Clear all" onClick={this.props.clearAll}>
                                <ClearAllIcon />
                            </IconButton>
                    ) : (
                        <BottomNavigation
                            className={classes.currencyInvoicesOptions}
                            value={selectedCurrencyInvoices}
                            onChange={this.props.handleCurrencyInvoicesChange}
                            showLabels
                        >
                            <BottomNavigationAction classes={{selected: classes.selectedCountry, root: classes.rootCountry}} label="USD" icon={<UnitedStatesAmericaIcon />} />
                            <BottomNavigationAction classes={{selected: classes.selectedCountry, root: classes.rootCountry}} label="CAD" icon={<CanadaIcon />} />
                        </BottomNavigation>
                    )}
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    clearAll: PropTypes.func,
    handleCurrencyInvoicesChange: PropTypes.func.isRequired,
    selectedCurrencyInvoices: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(EnhancedTableToolbar);