import React  from 'react'
import {connect} from 'react-redux'
import {  getBookList } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { withStyles ,Table, TableHead, TableBody, TableCell, TableRow,} from '@material-ui/core';
import { cvtNumToUserPref } from '../../../utils/help_function'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'


class MyTable extends React.Component {

    componentDidMount(){
        this.props.getTotal(this.props.reducer, `?contact=${this.props.contactId}`);
        this.props.getBookList(this.props.reducer, `list/${this.props.contactId}?limit=5&skip=0`);
    }

    render(){
    const { list, isFetching, locale, classes, reducer, rowsPerPageOptions, total } = this.props;

    return (<div>
                <Table id={reducer} className={classes.table}  padding="dense">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>{locale.wording.reference}</TableCell>
                        <TableCell>{locale.wording.subtotal}</TableCell>
                        <TableCell>{locale.wording.vat}</TableCell>
                        <TableCell>{locale.wording.status}</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>
                </TableHead>
                    
                    <TableBody className={classes.tableBody}>
                        {   !isFetching ? 
                            list.map(( item, index) => {
                                return  <TableRow key={index}>
                                            <TableCell>{ locale.wording[reducer.toLowerCase()].toUpperCase() }-{item.ref}</TableCell>
                                            <TableCell>{cvtNumToUserPref(item.total_ht)} {item.currency.value}</TableCell>
                                            <TableCell>{cvtNumToUserPref(item.vat.amount)} {item.currency.value}</TableCell>
                                            <TableCell><span style={{color: item.status.color }}>{ item.status[localStorage.getItem('locale')] }</span></TableCell>
                                            <ApxTableActions 
                                                actionDelete={false}
                                                actionEdit={`/${reducer.toLowerCase()}/edit/${item._id}`}
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
                total={total}
                rowsPerPageOptions={rowsPerPageOptions}
                label={locale.wording.label_rows_per_page}
                label2={locale.wording.of}
                reducer={reducer}
                status=""
                onGetItemList={ this.props.getBookList }
            />
            </div>
        )
    }
}

const styles = theme => ({
    table: {
        marginTop: 5,
    },
    tableHead: {
        backgroundColor: 'rgb(238,238,238)'
    }
})

const mapStateToPropsQuote = (state) => {  
    return {
        isFetching: state.book.quote.isFetching,
        updated: state.book.quote.updated,
        isError: state.book.quote.isError,
        message: state.book.quote.message,
        receivedAt: state.book.quote.receivedAt,
        locale: state.locale.locale,
        total: state.library.quote.total,
        list: state.book.quote.list,
        rowsPerPageOptions: state.library.quote.rowsPerPageOptions,
    }
}

const mapStateToPropsInvoice = (state) => {  
    return {
        isFetching: state.book.invoice.isFetching,
        updated: state.book.invoice.updated,
        isError: state.book.invoice.isError,
        message: state.book.invoice.message,
        receivedAt: state.book.invoice.receivedAt,
        locale: state.locale.locale,
        total: state.library.invoice.total,
        list: state.book.invoice.list,
        rowsPerPageOptions: state.library.invoice.rowsPerPageOptions,
    }
}

const mapStateToPropsPayback = (state) => {  
    return {
        isFetching: state.book.payback.isFetching,
        updated: state.book.payback.updated,
        isError: state.book.payback.isError,
        message: state.book.payback.message,
        receivedAt: state.book.payback.receivedAt,
        locale: state.locale.locale,
        total: state.library.payback.total,
        list: state.book.payback.list,
        rowsPerPageOptions: state.library.payback.rowsPerPageOptions,
    }
}

const StyledMyTable = withStyles(styles)(MyTable);


const TableQuote = connect(mapStateToPropsQuote, {  getBookList, getTotal  }) (StyledMyTable);
const TableInvoice = connect(mapStateToPropsInvoice, {  getBookList, getTotal  }) (StyledMyTable);
const TablePayback = connect(mapStateToPropsPayback, {  getBookList, getTotal  }) (StyledMyTable);

export { TableQuote, TablePayback, TableInvoice }