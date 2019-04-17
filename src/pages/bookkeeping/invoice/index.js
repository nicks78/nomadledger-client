//manager/src/pages/invoice/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {downloadFile} from '../../../redux/download/actions'
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import AddIcon from '@material-ui/icons/AddOutlined'
import { withStyles, Button, Hidden ,Table, TableHead, Paper, TableBody, TableCell, TableRow, Fab, Switch} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import ApxSelect from '../../../components/common/select'


class Invoice extends Component {

    state = {
        reducer: "INVOICE",
        status: 'none'
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer );
        this.props.getBookList(this.state.reducer, "list?limit=10&skip=0");
    }

    handleFilterRequest = (value) => {
        this.setState({status: value.code});
        this.props.getTotal(this.state.reducer, `?status=${value.code}`);
        this.props.getBookList(this.state.reducer, `list?limit=10&skip=0&status=${value.code}`);
    }

    handleStatus = (event) => {
        this.props.createState(this.state.reducer, event.target.name, event.target.value);
    }

    render() {

    const {listInvoice, isFetching, locale, classes, newInvoice, status} = this.props
    const { reducer } = this.state

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/invoice/create"
                        variant="contained" color="primary"
                        className={  classes.button }>
                        { newInvoice.contact_id ? locale.wording.progress : locale.wording.create}
                </Button>
            </Hidden>
            <Paper className={classes.paper}>

            <ApxTableToolBar
                title={isFetching ? locale.wording.loading :  locale.wording.invoice}
                selected={ locale.wording.selected}
                locale={locale}
                menus={ [...status || [], {fr: "Tous", en: "All", code: "none"}]  }
                onChangeQuery={ this.handleFilterRequest }
                toExcel={true}
                onDownload={ () => { this.props.downloadFile(reducer, `export/excel-file`) } }
            />
            <div style={{ overflowY: "auto" }}>
                    <Table padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.vat}</TableCell>
                            <TableCell>{locale.wording.total}</TableCell>
                            <TableCell>{locale.wording.status}</TableCell>
                            <TableCell align="center">{locale.wording.repay}</TableCell>
                            <TableCell>PDF</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            <TableCell align="center">{ locale.wording.archive }</TableCell>

                        </TableRow>
                        </TableHead>

                        <TableBody className={classes.tableBody}>
                            {   !isFetching ?
                                listInvoice.map(( invoice, index) => {
                                    let vat = invoice.subtotal * invoice.vat.indice / 100
                                    return  <TableRow key={index}>
                                                <TableCell>{locale.wording.inv}-{invoice.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${invoice.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{invoice.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(invoice.subtotal)} {invoice.currency.value}</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(vat ) + " "+ invoice.currency.value }</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(vat + invoice.subtotal  )} {invoice.currency.value}</TableCell>
                                                <TableCell>
                                                    {
                                                        invoice.status.code === "7" ||
                                                        invoice.status.code === "9"  ||
                                                        invoice.status.code === "11"  ?

                                                        <span style={{color: invoice.status.color }}>

                                                        { invoice.status[localStorage.getItem('locale')] }</span>

                                                        :   <ApxSelect
                                                                arrayField={status}
                                                                value={invoice.status[localStorage.getItem('locale')]}
                                                                variant="standard"
                                                                handleAction={ (event) => { this.props.updateField(reducer, { status: event.target.value}, invoice._id) } }
                                                                locale={locale}
                                                            />
                                                    }
                                                </TableCell>
                                                <TableCell align="center"><Link to={`/refund/create/${invoice._id}`}><img alt="convert-to-refund" style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/convert-file.png" } width="34" /></Link></TableCell>
                                                <TableCell><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, invoice._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>
                                                 <ApxTableActions
                                                    actionDelete={ invoice.status.code === "9" ? true : false}
                                                    actionEdit={ invoice.status.code === "1" || invoice.status.code === "2" || invoice.status.code === "3" ? `/invoice/edit/${invoice._id}` : false }
                                                    actionView={false}
                                                    actionCheck={invoice.status.code === "7" ? true : false }
                                                    actionArchive={invoice.status.code === "11" ? true : false }
                                                />
                                                 <TableCell>
                                                    <Switch checked={ !invoice.archive } onChange={ () => { this.props.updateField(reducer, {archive: true}, invoice._id ) }} />
                                                </TableCell>
                                            </TableRow>
                                })
                                : null
                            }

                        </TableBody>

                    </Table>
                    </div>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.wording.label_rows_per_page}
                        label2={locale.wording.of}
                        reducer={reducer}
                        value={this.state.status}
                        filterName="status"
                        onGetItemList={ this.props.getBookList }
                    />
                    <Hidden only={['lg', 'xl', 'md']}>
                        <Fab variant="contained"
                            color="primary"
                            style={{position: "fixed", right: 10, bottom: 10}}
                            component={Link}
                            to="/invoice/create">
                            <AddIcon />
                        </Fab>
                    </Hidden>
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
    },
    price: {
        whiteSpace: 'nowrap'
    }
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.invoice.isFetching,
        updated: state.book.invoice.updated,
        receivedAt: state.book.invoice.receivedAt,
        newInvoice: state.book.invoice.item || {},
        locale: state.locale.locale,
        total: state.library.invoice.total,
        listInvoice: state.book.invoice.list,
        rowsPerPageOptions: state.library.invoice.rowsPerPageOptions,
        status: state.helper.items.status_invoice,
    }
}

const StyledInvoice = withStyles(styles)(Invoice)

export default connect(mapStateToProps, {  getBookList, getTotal, updateField, createState, downloadPdf, downloadFile  })(StyledInvoice);
