import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const columnData = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Invoice' },
    // { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Invoice Date' },
    { id: 'dueDate', numeric: false, disablePadding: false, label: 'Due Date' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'installments', numeric: false, disablePadding: false, label: 'Installments' },
    { id: 'discountAvailable', numeric: false, disablePadding: false, label: 'Discount Available' },
    // { id: 'ifPaidBy', numeric: false, disablePadding: false, label: 'If Paid By' },
    // { id: 'overDueBy', numeric: false, disablePadding: false, label: 'Over Due By' },
    { id: 'discounAmount', numeric: true, disablePadding: false, label: 'Discount Amount' },
    { id: 'totalAmount', numeric: true, disablePadding: false, label: 'Net Amount' },
    { id: 'paymentAmount', numeric: true, disablePadding: false, label: 'Payment Amount' },
];

class EnhancedTableHead extends Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === column.id ? order : false}
                                style={column.disablePadding ? {} : {padding: '4px 16px'}}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;