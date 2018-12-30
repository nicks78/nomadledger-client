//manager/src/pages/invoice/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import {  getBookList } from '../actions'
import { getTotal } from '../../../redux/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import { withStyles, Button, Hidden ,Table, TableHead, TableBody, Checkbox, Paper, TableCell, TableRow,} from '@material-ui/core';
import {ApxTableToolBar, ApxAlert, ApxTableActions} from '../../../components/common'
import Pagination from '../../../lib/pagination'

class Invoice extends Component {

    state = {
        reducer: "INVOICE",
        selected: [],
    }

    componentDidMount(){
        if( this.props.receivedAt === null || this.props.updated ){
            this.props.getTotal(this.state.reducer);
            this.props.getBookList(this.state.reducer, "?limit=5&skip=0");
        }
    }

    onSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState({ selected: this.props.listInvoice.map(n => n._id) });
            return;
        }
        this.setState({ selected: [] });
    }

    onSelectedField = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {

            newSelected = newSelected.concat(selected, id);

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
    }

    isSelected = id =>  this.state.selected.indexOf(id) !== -1;

    handleOpenImage = () => {
        
    };
    
    render() {
    
    const {listInvoice, isFetching, isError,  locale, classes, message} = this.props
    const { selected, rowCount, reducer } = this.state

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/bookkeeping/invoice/create" variant="contained" color="secondary"  className={  classes.button }>{locale.button.add_invoice}</Button>
            </Hidden>
            <Paper>

            <ApxTableToolBar
                numSelected={selected.length}
                title={locale.table.title_invoice}
                selected={locale.table.selected}
                menus={[{label: "Approuvé"}, {label: "Paid"}]}
            />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < rowCount}
                                checked={selected.length === this.props.listInvoice.length}
                                onChange={this.onSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>{locale.table.reference}</TableCell>
                            <TableCell>{locale.table.client}</TableCell>
                            <TableCell>{locale.table.currency}</TableCell>
                            <TableCell>{locale.table.subtotal}</TableCell>
                            <TableCell>{locale.table.vat}</TableCell>
                            <TableCell>{locale.table.total}</TableCell>
                            <TableCell>{locale.table.status}</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>
                        </TableHead>
                        
                        <TableBody className={classes.tableBody}>
                            {   !isFetching ? 
                                listInvoice.map(( invoice, index) => {
                                    const isSelected = this.isSelected(invoice._id);
                                    return  <TableRow key={index} selected={isSelected}>
                                                <TableCell padding="checkbox" onClick={ event => { this.onSelectedField(event, invoice._id) } } >
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell>{invoice.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${invoice.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{invoice.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{invoice.currency.en}</TableCell>
                                                <TableCell>{cvtNumToUserPref(invoice.total_ht)}</TableCell>
                                                <TableCell>{cvtNumToUserPref(invoice.vat.amount)}</TableCell>
                                                <TableCell>{cvtNumToUserPref(invoice.total)}</TableCell>
                                                <TableCell><span style={{color: invoice.status.color }}>{ locale.table[invoice.status.label] }</span></TableCell>
                                                <ApxTableActions 
                                                    actionDelete={false}
                                                    actionEdit={`/bookkeeping/invoice/edit/${invoice._id}`}
                                                    actionView={false}
                                                    actionCheck={false}

                                                />
                                            </TableRow>
                                })
                                : null                           
                            }
                            
                        </TableBody>

                    </Table>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        label2={locale.table.of}
                        reducer={reducer}
                        onGetItemList={ this.props.getBookList }
                    />
            </Paper>
      </div>
    )
  }
}

const styles = theme => ({

    tableHead: {
        backgroundColor: 'rgb(238,238,238)'
    },
    button: {
        color: 'white !important',
        marginRight: 10,
        marginBottom: theme.margin.unit,
        '& :hover': {
            color: 'white !important', 
        }
    },
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.invoice.isFetching,
        updated: state.book.invoice.updated,
        isError: state.book.invoice.isError,
        message: state.book.invoice.message,
        receivedAt: state.book.invoice.receivedAt,
        locale: state.locale.locale,
        total: state.library.invoice.total,
        listInvoice: state.book.invoice.list,
        rowsPerPageOptions: state.library.invoice.rowsPerPageOptions,
    }
}

const StyledInvoice = withStyles(styles)(Invoice)

export default connect(mapStateToProps, {  getBookList, getTotal  })(StyledInvoice);