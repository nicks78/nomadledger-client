import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import {getBookList, updateField} from '../../redux/book/actions'
import { getTotal } from '../../redux/library/actions'
import { withStyles, Table, TableBody, TableCell, TableHead , Paper, TableRow, TableSortLabel} from '@material-ui/core';
import { cvtNumToUserPref } from '../../utils/help_function'
import Pagination from '../../lib/pagination'
import ApxTableToolBar from '../../components/common/tableToolBar'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownwardOutlined'


class Archive extends Component {

    state = {
        reducer: "INVOICE",
        results: [],
        total: 0,
        rowsPerPageOptions: [],
        id: 0,
    }

    componentDidMount(){
        this.props.getTotal( this.state.reducer , `?archive=1`);
        this.props.getBookList(this.state.reducer, `list?limit=10&skip=0&archive=1`)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            results: nextProps[this.state.reducer.toLowerCase()+'s'],
            total: nextProps[`total${this.state.reducer}`],
            rowsPerPageOptions: nextProps[`rowsPerPageOptions${this.state.reducer}`]
        })
    }

    handleFilterRequest = (value) => {
        this.setState({reducer: value.code, results: []});
        this.props.getTotal(value.code, `?archive=1`);
        this.props.getBookList(value.code, `list?limit=10&skip=0&archive=1`);
    }

    sortBy = (results, field, id) => {
    var newResults;
      if(id === this.state.id){
          newResults = results.sort((a,b) => (a[field] > b[field]) ? -1 : ((b[field] > a[field]) ? 1 : 0));
          this.setState({results: newResults, id: 0});
      }else{
          newResults = results.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0));
          this.setState({results: newResults, id: id });
      }
  }


    render() {

        const { locale, classes, loadInvoice, loadQuote, loadRefund } = this.props
        const {reducer, results, total, rowsPerPageOptions, id} = this.state

        return (
            <Paper className={classes.paper}>
             <ApxTableToolBar
                title={ loadInvoice || loadQuote || loadRefund ? locale.wording.loading : locale.wording[reducer.toLowerCase()]}
                selected={locale.wording.selected}
                locale={locale}
                menus={[ {fr: "Factures", en: "Invoices", code: "INVOICE"}, {fr: "Devis", en: "Quotes", code: "QUOTE"}, {fr: "Avoirs", en: "Refunds", code: "REFUND"} ]}
                onChangeQuery={ this.handleFilterRequest }
            />

                 <div style={{overflowY: "auto"}}>
                    <Table  padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>
                              {locale.wording.fiscal_year}
                            <TableSortLabel
                                    active={ true }
                                    IconComponent={ArrowDownwardIcon}
                                    direction={ id === 1 ? "desc" : "asc"}
                                    onClick={ () => { this.sortBy(results, "fiscal_year", 1 ) }}
                                  >
                            </TableSortLabel>
                            </TableCell>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.vat}</TableCell>
                            <TableCell>{locale.wording.total}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={classes.tableBody}>
                            {   !loadInvoice || !loadQuote || !loadRefund ?
                                results.map((item, index) => {
                                    let vat = item.subtotal * item.vat.indice / 100
                                    return  <TableRow key={index}>
                                                <TableCell>{item.fiscal_year}</TableCell>
                                                <TableCell>{locale.wording[reducer.toLowerCase()]}-{item.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${item.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{item.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(item.subtotal)} {item.currency.value}</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(vat ) + " "+ item.currency.value }</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(vat + item.subtotal  )} {item.currency.value}</TableCell>
                                            </TableRow>
                                })
                                : null
                            }
                    </TableBody>
                </Table>
                </div>

                <Pagination
                    total={total}
                    rowsPerPageOptions={rowsPerPageOptions}
                    label={locale.wording.label_rows_per_page}
                    label2={locale.wording.of}
                    reducer={reducer}
                    value="1"
                    filterName="archive"
                    onGetItemList={ this.props.getBookList }
                />
            </Paper>
        )
    }
}

const styles = theme => ({
    paper: {
        position: 'relative',
        padding: 0,
        overflow: "hidden",
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
            borderRadius: 0
        },
    },
    price: {
        whiteSpace: 'nowrap'
    },
    tableHead: {
        backgroundColor: 'rgb(238,238,238)'
    },
})

const mapStateToProps = (state) => {

    return {
        locale: state.locale.locale,
        totalINVOICE: state.library.invoice.total,
        rowsPerPageOptionsINVOICE: state.library.invoice.rowsPerPageOptions,

        totalQUOTE: state.library.quote.total,
        rowsPerPageOptionsQUOTE: state.library.quote.rowsPerPageOptions,

        totalREFUND: state.library.refund.total,
        rowsPerPageOptionsREFUND: state.library.refund.rowsPerPageOptions,

        invoices: state.book.invoice.list,
        loadInvoice: state.book.invoice.isFetching,
        quotes: state.book.quote.list,
        loadQuote: state.book.quote.isFetching,
        refunds: state.book.refund.list,
        loadRefund: state.book.refund.isFetching
    }
}


const StyledArchive = withStyles(styles)(Archive);

export default connect( mapStateToProps, {getBookList, getTotal, updateField})(StyledArchive)
