import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Currency from 'react-currency-formatter';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import EnhancedTableHeadReadOnly from './EnhancedTableHeadReadOnly';

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

class EnhancedTableReadOnly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: this.props.data,
            page: 0,
            rowsPerPage: 5,
            selectedCurrencyInvoices: 0
        };
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    totalPaymentAmount = () => {
        return this.props.data.reduce((accumulator, n) => accumulator + (+n.paymentAmount), 0);
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        
        return (
            <div>
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHeadReadOnly
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    return (
                                        <TableRow key={n.id}>
                                            <TableCell component="th" scope="row">
                                                {n.id}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{n.invoiceDate}</TableCell>
                                            <TableCell numeric className={classes.tableCell}>
                                                <Currency
                                                    quantity={+n.paymentAmount}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}                                
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
                    <Grid container spacing={24} justify="space-around">
                        <Grid item>
                            <Typography variant="subheading" align="center">
                                Total Amount Paid:&nbsp;
                                <Currency
                                    quantity={this.totalPaymentAmount()} 
                                />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading" align="center">
                                Transaction id: #1239128313
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subheading" align="center">
                                Dated: 14 Jun 2018
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

EnhancedTableReadOnly.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
};

export default withStyles(styles)(EnhancedTableReadOnly);