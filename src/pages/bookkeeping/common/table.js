import React  from 'react'
import {connect} from 'react-redux'
import {DEFAULT_URL} from '../../../redux/constant'
import {  getBookList, downloadPdf, updateField, resetState } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { withStyles ,Table, TableHead, TableBody, TableCell, TableRow,} from '@material-ui/core';
import { cvtNumToUserPref } from '../../../utils/help_function'
import ApxTableActions from '../../../components/common/tableActions'
import ApxSelect from '../../../components/common/select'
import Pagination from '../../../lib/pagination'


class MyTable extends React.Component {

    componentDidMount(){
        this.props.getTotal(this.props.reducer, `?contact=${this.props.contactId}`);
        this.props.getBookList(this.props.reducer, `list/${this.props.contactId}?limit=10&skip=0`);
    }

    componentWillUnmount(){
        this.props.resetState(this.props.reducer)
    }

    render(){
    const { list, isFetching, locale, classes, reducer, rowsPerPageOptions, total, status } = this.props;

    return (<div>
                <Table id={reducer} className={classes.table}  padding="dense">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>{locale.wording.reference}</TableCell>
                        <TableCell>{locale.wording.subtotal}</TableCell>
                        <TableCell>{locale.wording.vat}</TableCell>
                        <TableCell>{locale.wording.status}</TableCell>
                        <TableCell>PDF</TableCell>

                        <TableCell align="center">Actions</TableCell>

                    </TableRow>
                </TableHead>
                    
                    <TableBody className={classes.tableBody}>
                        {   !isFetching ? 
                            list.map(( item, index) => {
                                
                                return  <TableRow key={index}>
                                            <TableCell>{ locale.wording[reducer.toLowerCase()].toUpperCase() }-{item.ref}</TableCell>
                                            <TableCell>{cvtNumToUserPref(item.subtotal)} {item.currency.value}</TableCell>
                                            <TableCell>{cvtNumToUserPref(item.vat.indice) + "%"}</TableCell>
                                            <TableCell>
                                                    {
                                                        item.status.code === "5" ||   
                                                        item.status.code === "6"  ||
                                                        item.status.code === "7"  || 
                                                        item.status.code === "8"  || 
                                                        item.status.code === "9"  || 
                                                        item.status.code === "10"  || 
                                                        item.status.code === "11"  ? 

                                                        <span style={{color: item.status.color }}>

                                                        { item.status[localStorage.getItem('locale')] }</span>

                                                        :   <ApxSelect 
                                                                arrayField={status}
                                                                value={item.status[localStorage.getItem('locale')]}
                                                                variant="standard"
                                                                handleAction={ (event) => { this.props.updateField(reducer, { status: event.target.value}, item._id) } }
                                                                locale={locale}
                                                            />
                                                    }    
                                                </TableCell>
                                            <TableCell><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, item._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>
                                            <ApxTableActions 
                                                actionDelete={  item.status.code === "8" ||
                                                                item.status.code === "9" ||
                                                                item.status.code === "10" ? true : false}
                                                actionEdit={ item.status.code === "1" || item.status.code === "2" || item.status.code === "3" ? `/${reducer.toLowerCase()}/edit/${item._id}` : false }
                                                actionView={false}
                                                actionCheck={item.status.code === "7" || item.status.code === "6" || item.status.code === "5" ? true : false }
                                                actionArchive={item.status.code === "11" ? true : false }
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
                value=""
                filterName=""
                contactId={this.props.contactId}
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
        status: state.helper.items.status_quote
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
        status: state.helper.items.status_invoice,
    }
}

const mapStateToPropsPayback = (state) => {  
    return {
        isFetching: state.book.refund.isFetching,
        updated: state.book.refund.updated,
        isError: state.book.refund.isError,
        message: state.book.refund.message,
        receivedAt: state.book.refund.receivedAt,
        locale: state.locale.locale,
        total: state.library.refund.total,
        list: state.book.refund.list,
        rowsPerPageOptions: state.library.refund.rowsPerPageOptions,
        status: state.helper.items.status_refund
    }
}

const StyledMyTable = withStyles(styles)(MyTable);


const TableQuote = connect(mapStateToPropsQuote, {  getBookList, getTotal, downloadPdf, updateField, resetState  }) (StyledMyTable);
const TableInvoice = connect(mapStateToPropsInvoice, {  getBookList, getTotal, downloadPdf, updateField, resetState  }) (StyledMyTable);
const TableRefund = connect(mapStateToPropsPayback, {  getBookList, getTotal, downloadPdf, updateField, resetState  }) (StyledMyTable);

export { TableQuote, TableRefund, TableInvoice }