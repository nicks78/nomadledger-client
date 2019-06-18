//manager/src/pages/invoice/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {downloadFile} from '../../../redux/download/actions'
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf , resetState} from '../../../redux/book/actions'
import {  getItemList} from '../../../redux/library/actions'
import ApxPaper from '../../../components/common/paper'
import { cvtNumToUserPref } from '../../../utils/help_function'
import AddIcon from '@material-ui/icons/AddOutlined'
import { withStyles, Button, Hidden ,Table, TableHead, TableBody, TableCell, TableRow, Fab} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import MobileView from '../common/mobileView'
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltips from '../../../components/common/tooltips'
import WarningIcon from '@material-ui/icons/WarningOutlined'

class Invoice extends Component {

    state = {
        reducer: "INVOICE",
        query: '',
        width: window.innerWidth,
        receivedAt: "",
        listInvoice: []
    }

    componentDidMount(){
        this.props.getBookList(this.state.reducer, "list?limit=10&skip=0");
        window.addEventListener('resize', this.getWindowWidth);
    }

    componentWillReceiveProps(nextProps){
      if(this.state.receivedAt !== nextProps.receivedAt )
        this.setState({
          listInvoice: [...this.state.listInvoice, ...nextProps.listInvoice],
          receivedAt: nextProps.receivedAt
        })
    }

    componentWillUnmount(){
      window.removeEventListener('resize', this.getWindowWidth);
      this.props.resetState(this.state.reducer)
    }

    refresh = () => {
      this.setState({query: ""})
      this.props.getBookList(this.state.reducer, "list?limit=10&skip=0")
    }


    getWindowWidth = () => {
      this.setState({width: window.innerWidth})
    }

    handleFilterRequest = (value) => {
        var query = value.en ? "&" +value.en + "=1" :  "&" + value;
        this.setState({query: query.toLowerCase()});
        this.props.getBookList(this.state.reducer, `list?limit=10&skip=0${query.toLowerCase()}`);
    }

    handleStatus = (event) => {
        this.props.createState(this.state.reducer, event.target.name, event.target.value);
    }

    render() {

    const { isFetching, locale, classes, newInvoice, status, total, actionLoading, listContacts } = this.props
    const { reducer, width, listInvoice } = this.state
    const isMobile = width <= 500;

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/invoice/create"
                        variant="contained" color="primary"
                        className={  classes.button }>
                        { newInvoice.contact_id ? locale.wording.progress : locale.wording.create}
                </Button>
            </Hidden>
            { !isMobile ?
            <ApxPaper className={classes.paper}>

            <ApxTableToolBar
                title={isFetching ? locale.wording.loading :  locale.wording.invoice}
                selected={ locale.wording.selected}
                listContacts={listContacts}
                locale={locale}
                menus={ status && [...status || [], {fr: "Tous", en: "All", code: "none"}]  }
                onChangeQuery={ this.handleFilterRequest }
                toExcel={true}
                onDownload={ () => { this.props.downloadFile(reducer, `export/excel-file`) } }
                tooltipTitle={locale.wording.filter_status}
                refresh={ this.refresh }
            />
          <div className="table-wrapper">
                    <Table padding="dense">
                    <TableHead>
                        <TableRow>
                            <TableCell>{locale.wording.date}</TableCell>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.status}</TableCell>
                            <TableCell align="center">{locale.wording.repay}</TableCell>
                            <TableCell align="center">PDF</TableCell>
                            <TableCell align="center">Actions&nbsp;&nbsp;<Tooltips title={locale.helperText.action_table}><WarningIcon style={{color: 'red'}}/></Tooltips><br />
                            { actionLoading ? <LinearProgress color="secondary" variant="query" /> : null }
                            </TableCell>

                        </TableRow>
                        </TableHead>

                        <TableBody className={classes.tableBody}>
                            {   !isFetching ?
                                this.props.listInvoice.map(( invoice, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell>{new Date(invoice.created_at.date).toLocaleDateString(localStorage.getItem('locale'))}</TableCell>
                                                <TableCell><Link className="link" to={`/invoice/view/${invoice._id}`}>{invoice.ref_add}-{invoice.ref}</Link></TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${invoice.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{invoice.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(invoice.net_to_pay)} {invoice.currency.value}</TableCell>
                                                <TableCell><span style={{color: invoice.status.color, fontWeight: 400}}>{ invoice.status[localStorage.getItem('locale')] }</span></TableCell>
                                                <TableCell align="center"><Link to={`/refund/create/${invoice._id}`}><img alt="convert-to-refund" style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/convert-file.png" } width="34" /></Link></TableCell>
                                                <TableCell align="center"><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, invoice._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>
                                                <TableCell align="center" style={{ display: 'flex', justifyContent: "center"}}>
                                                      <ApxTableActions
                                                        reducer={reducer}
                                                        id={invoice._id}
                                                        item={invoice}
                                                        handleAction={this.props.updateField}
                                                        endpoint="update-status"
                                                        loading={actionLoading}
                                                        locale={locale}
                                                        edit={invoice.edit}
                                                        canceled={invoice.canceled}
                                                        paid={invoice.paid}
                                                      />

                                                </TableCell>
                                            </TableRow>
                                })
                                : null
                            }

                        </TableBody>

                    </Table>
                    </div>
                    <Pagination
                        total={this.props.total || 0}
                        rowsPerPageOptions={this.props.rowsPerPageOptions || []}
                        label={locale.wording.label_rows_per_page}
                        label2={locale.wording.of}
                        reducer={reducer}
                        value={this.state.query}
                        filterName="status"
                        onGetItemList={ this.props.getBookList }
                    />

            </ApxPaper>
            : <MobileView
                  items={listInvoice}
                  getMoreData={this.props.getBookList }
                  total={total}
                  isFetching={isFetching}
                  locale={locale}
                  reducer={reducer}/>
          }
          <Hidden only={['lg', 'xl', 'md']}>
              <Fab
                  color="primary"
                  style={{position: "fixed", right: 10, bottom: 10}}
                  component={Link}
                  to="/invoice/create">
                  <AddIcon />
              </Fab>
          </Hidden>
      </div>
    )
  }
}

const styles = theme => ({
    button: {
        color: 'white !important',
        marginRight: 10,
        marginBottom: theme.margin.unit,
        '& :hover': {
            color: 'white !important',
        }
    }
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.invoice.isFetching,
        updated: state.book.invoice.updated,
        receivedAt: state.book.invoice.receivedAt,
        listContacts: state.library.contact.list,
        newInvoice: state.book.invoice.item || {},
        locale: state.locale.locale,
        total: state.book.invoice.total,
        listInvoice: state.book.invoice.list.filter((el) => { return el.archive === false }),
        rowsPerPageOptions: state.book.invoice.rowsPerPageOptions,
        status: state.helper.items.status_invoice && state.helper.items.status_invoice.filter((el) => { return el.code !== "11" }),
        actionLoading: state.book.invoice.actionLoading
    }
}

const StyledInvoice = withStyles(styles)(Invoice)

export default connect(mapStateToProps, {  getBookList, updateField, createState, downloadPdf, downloadFile, resetState , getItemList })(StyledInvoice);
