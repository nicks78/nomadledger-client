//src/pages/bookkeeping/refund/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {downloadFile} from '../../../redux/download/actions'
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf, resetState } from '../../../redux/book/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import AddIcon from '@material-ui/icons/AddOutlined'
import { withStyles, Button, Hidden ,Table, TableHead, Paper, TableBody, TableCell, TableRow, Fab} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import MobileView from '../common/mobileView'
import LinearProgress from '@material-ui/core/LinearProgress';


class Refund extends Component {

    state = {
        reducer: "REFUND",
        status: 'none',
        width: window.innerWidth,
        receivedAt: "",
        listRefund: []
    }

    componentDidMount(){
        this.props.getBookList(this.state.reducer, "list?limit=10&skip=0");
    }

    componentWillReceiveProps(nextProps){
      if(this.state.receivedAt !== nextProps.receivedAt )
        this.setState({
          listRefund: [...this.state.listRefund, ...nextProps.listRefund],
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

    render() {

    const { isFetching,  locale, classes, newRefund, status, total, actionLoading} = this.props
    const { reducer, width, listRefund } = this.state
    const isMobile = width <= 500;

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/refund/create"
                        variant="contained" color="primary"
                        className={  classes.button }>
                        { newRefund.contact_id ? locale.wording.progress : locale.wording.create}
                </Button>
            </Hidden>
            { !isMobile ?
            <Paper className={classes.paper}>

            <ApxTableToolBar
                title={ isFetching ? locale.wording.loading : locale.wording.refund}
                selected={ locale.wording.selected}
                locale={locale}
                menus={ status && [...status, {fr: "Tous", en: "All", code: "none"}]  }
                onChangeQuery={ this.handleFilterRequest }
                toExcel={true}
                tooltipTitle={locale.wording.filter_status}
                onDownload={ () => { this.props.downloadFile(reducer, `export/excel-file`) } }
                refresh={ this.refresh }
            />
            <div style={{ overflowY: "auto" }}>
                    <Table padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.wording.date}</TableCell>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.status}</TableCell>
                            <TableCell align="center">PDF</TableCell>
                            <TableCell align="center">Actions<br />
                              <span style={{fontSize: 8, color: "red"}}>{locale.helperText.action_table_refund}</span><br />
                            { actionLoading ? <LinearProgress color="secondary" variant="query" /> : null }
                            </TableCell>

                        </TableRow>
                        </TableHead>

                        <TableBody className={classes.tableBody}>
                            {   !isFetching ?
                                this.props.listRefund.map(( refund, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell>{new Date(refund.createAt.date).toLocaleDateString(localStorage.getItem('locale'))}</TableCell>
                                                <TableCell><Link className="link" to={`/refund/view/${refund._id}`}>{refund.ref_add}-{refund.ref}</Link></TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${refund.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{refund.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(refund.subtotal)} {refund.currency.value}</TableCell>
                                                <TableCell><span style={{color: refund.status.color, fontWeight: 400 }}>{ refund.status[localStorage.getItem('locale')] }</span></TableCell>
                                                <TableCell align="center"><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, refund._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>

                                                <TableCell align="center" style={{ whiteSpace: "nowrap", width: "0%"}}>
                                                  <ApxTableActions
                                                    reducer={reducer}
                                                    item={refund}
                                                    id={refund._id}
                                                    handleAction={this.props.updateField}
                                                    endpoint="update-status"
                                                    loading={actionLoading}
                                                    locale={locale}
                                                    edit={refund.edit}
                                                    canceled={refund.canceled}
                                                    paid={refund.refunded}
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
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.wording.label_rows_per_page}
                        label2={locale.wording.of}
                        reducer={reducer}
                        value={this.state.status}
                        filterName="status"
                        onGetItemList={ this.props.getBookList }
                    />

            </Paper>
            : <MobileView
                  items={listRefund}
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
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.refund.isFetching,
        updated: state.book.refund.updated,
        receivedAt: state.book.refund.receivedAt,
        newRefund: state.book.refund.item || {},
        locale: state.locale.locale,
        total: state.book.refund.total,
        listRefund: state.book.refund.list.filter((el) => { return el.archive === false }),
        rowsPerPageOptions: state.book.refund.rowsPerPageOptions,
        status: state.helper.items.status_refund && state.helper.items.status_refund.filter((el) => { return el.code !== "11" }),
        actionLoading: state.book.refund.actionLoading

    }
}

const StyledRefund = withStyles(styles)(Refund)

export default connect(mapStateToProps, {  getBookList, updateField, createState, downloadPdf, resetState, downloadFile  })(StyledRefund);
