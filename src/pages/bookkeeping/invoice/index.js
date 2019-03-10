//manager/src/pages/invoice/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import {  getBookList } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import { withStyles, Button, Hidden ,Table, TableHead, Paper, TableBody, Checkbox, TableCell, TableRow,} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxAlert from '../../../components/common/alert'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'

class Invoice extends Component {

    state = {
        reducer: "INVOICE",
        selected: [],
        status: ''
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer );
        this.props.getBookList(this.state.reducer, "list?limit=5&skip=0");
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

    handleFilterRequest = (value) => {
        this.setState({status: value.code});
        this.props.getTotal(this.state.reducer, `?status=${value.code || '10'}`);
        this.props.getBookList(this.state.reducer, `list?limit=5&skip=0&status=${value.code || '10'}`);
    };
    
    render() {
    
    const {listInvoice, isFetching, isError,  locale, classes, message, newInvoice, filter, status} = this.props
    const { selected, rowCount, reducer } = this.state

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/bookkeeping/invoice/create" 
                        variant="contained" color="primary"  
                        className={  classes.button }>
                        { newInvoice.contact_id ? locale.button.continue_edit : locale.button.add_invoice}
                </Button>
            </Hidden>
            <Paper className={classes.paper}>

            <ApxTableToolBar
                numSelected={selected.length}
                title={locale.table.title_invoice}
                selected={locale.table.selected}
                locale={locale}
                menus={filter}
                onChangeQuery={ this.handleFilterRequest }
            />
                    <Table padding="dense">
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
                                                <TableCell>{locale.table.inv}-{invoice.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${invoice.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{invoice.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{invoice.currency.en}</TableCell>
                                                <TableCell>{cvtNumToUserPref(invoice.total_ht)} {invoice.currency.value}</TableCell>
                                                <TableCell>{cvtNumToUserPref(invoice.vat.amount)} {invoice.currency.value}</TableCell>
                                                <TableCell>{cvtNumToUserPref(invoice.total)} {invoice.currency.value}</TableCell>
                                                <TableCell><span style={{color: invoice.status.color }}>{ invoice.status[localStorage.getItem('locale')] }</span></TableCell>
                                                <ApxTableActions 
                                                    actionDelete={false}
                                                    actionEdit={`/invoice/edit/${invoice._id}`}
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
    paper: {
        position: 'relative',
        padding: 0,
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
            borderRadius: 0
        },
    }
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.invoice.isFetching,
        updated: state.book.invoice.updated,
        isError: state.book.invoice.isError,
        message: state.book.invoice.message,
        receivedAt: state.book.invoice.receivedAt,
        newInvoice: state.book.invoice.item || {},
        locale: state.locale.locale,
        total: state.library.invoice.total,
        listInvoice: state.book.invoice.list,
        rowsPerPageOptions: state.library.invoice.rowsPerPageOptions,
        filter: state.helper.items.filter,
        status: state.helper.items.status_invoice,
    }
}

const StyledInvoice = withStyles(styles)(Invoice)

export default connect(mapStateToProps, {  getBookList, getTotal  })(StyledInvoice);