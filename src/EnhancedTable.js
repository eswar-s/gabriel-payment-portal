import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Currency from 'react-currency-formatter';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import PaymentInformation from './PaymentInformation';
import CurrencyInputFormat from './CurrencyInputFormat';
import CanadaIcon from './CanadaIcon';
import UnitedStatesAmericaIcon from './UnitedStatesAmericaIcon';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    tableCell: {
        padding: '4px 16px'
    },
    paymentDetails: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        padding: theme.spacing.unit
    },
    rightAlign: {
        textAlign: 'right'
    },
});

class EnhancedTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            selectedCurrencyInvoices: 0
        };

        this.loadData = this.loadData.bind(this);

    }

    componentDidMount() {
        this.loadData(this.state.selectedCurrencyInvoices);
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, n) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(n);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, n);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    clearAll = event => {
        this.setState({ selected: [] });
    };

    stopPropagation = event => {
       event.stopPropagation();
    }

    handleInput = (event, id) => {
        const { data } = this.state;
        const newData = data.map(n => {
            if (n.id === id) {
                n.paymentAmount = event.target.value;
            }
            return n;
        });
        this.setState({ data: newData });
    };

    isSelected = id => this.state.selected.findIndex(n => n.id === id) !== -1;

    totalAmount = () => {
        return this.state.data.reduce((accumulator, n) => accumulator + (+n.amount), 0);
    }

    totalPayableAmount = () => {
        return this.state.selected.reduce((accumulator, n) => accumulator + (+n.paymentAmount), 0);
    }

    handleCurrencyInvoicesChange = (event, value) => {
        this.setState({ selectedCurrencyInvoices: value });
        this.loadData(value);
    };

    async loadData(value) {
        let fileName;
        if (value === 0) {
            fileName = 'invoices-usd.json';
        } else {
            fileName = 'invoices-cad.json';
        }
        const response = await fetch(`${process.env.PUBLIC_URL}/${fileName}`);
        const json = await response.json();
        this.setState({ data: json.sort((a, b) => (a.id < b.id ? -1 : 1)) });
    }
    

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page, selectedCurrencyInvoices } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        
        return (
            <div>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected.length} clearAll={this.clearAll} 
                        selectedCurrencyInvoices={selectedCurrencyInvoices}
                        handleCurrencyInvoicesChange={this.handleCurrencyInvoicesChange}
                    />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.id}
                                            </TableCell>
                                            {/* <TableCell className={classes.tableCell}>{n.description}</TableCell> */}
                                            <TableCell className={classes.tableCell}>{n.invoiceDate}</TableCell>
                                            <TableCell className={classes.tableCell}>{n.dueDate}</TableCell>
                                            <TableCell numeric className={classes.tableCell}>
                                                <Currency
                                                    quantity={n.amount}
                                                />
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{n.installments}</TableCell>
                                            <TableCell className={classes.tableCell}>{n.discountAvailable}</TableCell>
                                            <TableCell numeric className={classes.tableCell}>
                                                {n.discountAmount === 'NA' ? n.discountAmount :<Currency
                                                    quantity={n.discountAmount}
                                                />}
                                            </TableCell>
                                            <TableCell numeric className={classes.tableCell}>
                                                <Currency
                                                    quantity={n.amount - (n.discountAmount === 'NA' ? 0 : n.discountAmount)}
                                                />
                                            </TableCell>
                                            <TableCell numeric className={classes.tableCell}>
                                                <TextField fullWidth className={classes.margin}
                                                    value={n.paymentAmount ? n.paymentAmount : 0} onChange={event => this.handleInput(event, n.id)}
                                                    disabled={!isSelected}
                                                    InputProps={{
                                                        inputComponent: CurrencyInputFormat,
                                                    }}
                                                    onClick={ isSelected ? this.stopPropagation: undefined }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {/* {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )} */}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    {this.totalAmount() > 0 && <Typography variant="subheading" align="center">
                        Total Account Balance:&nbsp;
                        <Currency
                            quantity={this.totalAmount()} 
                        />
                    </Typography>}
                </Paper>
                {this.totalPayableAmount() > 0 && <PaymentInformation totalPayableAmount={this.totalPayableAmount()}/>}
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);