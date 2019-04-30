//src/pages/bookkeeping/refund/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf, resetState } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import AddIcon from '@material-ui/icons/AddOutlined'
import { withStyles, Button, Hidden ,Table, TableHead, Paper, TableBody, TableCell, TableRow, Fab, Switch} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import ApxSelect from '../../../components/common/select'
import MobileView from '../common/mobileView'


class Refund extends Component {

    state = {
        reducer: "REFUND",
        status: 'none',
        width: window.innerWidth,
        receivedAt: "",
        listRefund: []
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer );
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


    getWindowWidth = () => {
      this.setState({width: window.innerWidth})
    }


    handleFilterRequest = (value) => {
        this.setState({status: value.code});
        this.props.getTotal(this.state.reducer, `?status=${value.code || '10'}`);
        this.props.getBookList(this.state.reducer, `list?limit=10&skip=0&status=${value.code || '10'}`);
    }

    handleStatus = (event) => {
        this.props.createState(this.state.reducer, event.target.name, event.target.value);
    }

    render() {

    const { isFetching,  locale, classes, newRefund, status, total} = this.props
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
            />
            <div style={{ overflowY: "auto" }}>
                    <Table padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.currency}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.vat}</TableCell>
                            <TableCell>{locale.wording.total}</TableCell>
                            <TableCell>{locale.wording.status}</TableCell>
                            <TableCell>PDF</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            <TableCell align="center">{ locale.wording.archive }</TableCell>

                        </TableRow>
                        </TableHead>

                        <TableBody className={classes.tableBody}>
                            {   !isFetching ?
                                this.props.listRefund.map(( refund, index) => {
                                    let total = refund.subtotal * refund.vat.indice / 100
                                    return  <TableRow key={index}>
                                                <TableCell><Link className="link" to={`/refund/view/${refund._id}`}>{locale.wording.pya}-{refund.ref}</Link></TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${refund.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{refund.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{refund.currency.en}</TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(refund.subtotal)} {refund.currency.value}</TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(refund.vat.indice) + "%"}</TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(total  )} {refund.currency.value}</TableCell>
                                                <TableCell>
                                                    {
                                                        refund.status.code === "11" || refund.status.code === "8" ?
                                                        <span style={{color: refund.status.color }}>

                                                        { refund.status[localStorage.getItem('locale')] }</span>

                                                        :   <ApxSelect
                                                                arrayField={status}
                                                                value={refund.status[localStorage.getItem('locale')]}
                                                                variant="standard"
                                                                handleAction={ (event) => { this.props.updateField(reducer, { status: event.target.value}, refund._id) } }
                                                                locale={locale}
                                                            />
                                                    }
                                                </TableCell>
                                                <TableCell><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, refund._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>
                                                <ApxTableActions
                                                    actionDelete={refund.status.code === "9" ? true : false}
                                                    actionEdit={refund.status.code === "1" || refund.status.code === "2" || refund.status.code === "3" ? `/refund/edit/${refund._id}` : false }
                                                    actionView={false}
                                                    actionCheck={refund.status.code === "8" ? true : false}
                                                    actionArchive={refund.status.code === "11" ? true : false }

                                                />
                                                 <TableCell>
                                                    <Switch checked={ !refund.archive } onChange={ () => { this.props.updateField(reducer, {archive: true}, refund._id ) }} />
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
        total: state.library.refund.total,
        listRefund: state.book.refund.list,
        rowsPerPageOptions: state.library.refund.rowsPerPageOptions,
        status: state.helper.items.status_refund,
    }
}

const StyledRefund = withStyles(styles)(Refund)

export default connect(mapStateToProps, {  getBookList, getTotal, updateField, createState, downloadPdf, resetState  })(StyledRefund);
