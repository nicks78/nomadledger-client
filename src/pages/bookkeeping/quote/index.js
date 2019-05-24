//manager/src/pages/quote/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf, resetState } from '../../../redux/book/actions'
import AddIcon from '@material-ui/icons/AddOutlined'
import { withStyles, Button, Hidden,  Paper, Table, TableHead, TableBody, TableCell, TableRow , Fab} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import { cvtNumToUserPref } from '../../../utils/help_function'
import MobileView from '../common/mobileView'
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltips from '../../../components/common/tooltips'
import WarningIcon from '@material-ui/icons/WarningOutlined'

class Quote extends Component {

    state = {
        showQuote: false,
        reducer: "QUOTE",
        query: '',
        width: window.innerWidth,
        receivedAt: "",
        listQuote: []

    }

    componentDidMount(){
        this.props.getBookList(this.state.reducer, `list?limit=10&skip=0`);
        window.addEventListener('resize', this.getWindowWidth);
    }

    componentWillUnmount(){
      window.removeEventListener('resize', this.getWindowWidth);
      this.props.resetState(this.state.reducer)
    }

    componentWillReceiveProps(nextProps){
      if(this.state.receivedAt !== nextProps.receivedAt )
        this.setState({
          listQuote: [...this.state.listQuote, ...nextProps.listQuote],
          receivedAt: nextProps.receivedAt
        })
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

    const { isFetching,  locale, classes, newQuote, status, total, actionLoading} = this.props
    const { reducer, listQuote, width } = this.state;
    const isMobile = width <= 500;

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/quote/create" variant="contained" color="primary"  className={  classes.button }>
                { newQuote.contact_id ? locale.wording.progress : locale.wording.create}

                </Button>
            </Hidden>

            { !isMobile ?
            <Paper className={classes.paper}>

                  <ApxTableToolBar
                        title={isFetching ? locale.wording.loading : locale.wording.quote}
                        selected={locale.wording.selected}
                        locale={locale}
                        menus={ status && [...status, {fr: "Tous", en: "All", code: "none"}]  }
                        onChangeQuery={ this.handleFilterRequest }
                        tooltipTitle={locale.wording.filter_status}
                        refresh={ this.refresh }
                    />
                    <div style={{overflowY: "auto"}}>
                    <Table  padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.wording.date}</TableCell>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.status}</TableCell>
                            <TableCell align="center">{locale.wording.invoicer}</TableCell>
                            <TableCell align="center">PDF</TableCell>
                            <TableCell align="center">Actions&nbsp;&nbsp;<Tooltips title={locale.helperText.action_table_quote}><WarningIcon style={{color: 'red'}}/></Tooltips><br />
                            { actionLoading ? <LinearProgress color="secondary" variant="query" /> : null }
                            </TableCell>

                        </TableRow>
                    </TableHead>

                        <TableBody className={classes.tableBody}>
                            {   !isFetching ?
                                this.props.listQuote.map(( quote, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell>{new Date(quote.createAt.date).toLocaleDateString(localStorage.getItem('locale'))}</TableCell>
                                                <TableCell><Link className="link" to={`/quote/view/${quote._id}`}>{quote.ref_add}-{quote.ref}</Link></TableCell>
                                                <TableCell><Link className="link" to={{ pathname: `/contact/view/${quote.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{quote.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(quote.subtotal)} {quote.currency.value}</TableCell>
                                                <TableCell><span style={{color: quote.status.color, fontWeight: 400 }}>{ quote.status[localStorage.getItem('locale')] }</span></TableCell>
                                                <TableCell align="center"><Link to={`/invoice/create/${quote._id}`}><img alt="convert-to-invoice" style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/convert-file.png" } width="34" /></Link></TableCell>
                                                <TableCell align="center"><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, quote._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>
                                                <TableCell align="center" style={{ display: 'flex', justifyContent: "center"}}>
                                                  <ApxTableActions
                                                    reducer={reducer}
                                                    id={quote._id}
                                                    item={quote}
                                                    handleAction={this.props.updateField}
                                                    endpoint="update-status"
                                                    loading={actionLoading}
                                                    locale={locale}
                                                    edit={quote.edit}
                                                    canceled={quote.rejected}
                                                    paid={quote.approved}
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
                        total={this.props.total || 0 }
                        rowsPerPageOptions={this.props.rowsPerPageOptions || []}
                        label={locale.wording.label_rows_per_page}
                        label2={locale.wording.of}
                        reducer={reducer}
                        value={this.state.query}
                        filterName="status"
                        onGetItemList={ this.props.getBookList }
                    />
            </Paper>
            : <MobileView
                  items={listQuote}
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
                    to="/quote/create">
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
    }
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.quote.isFetching,
        updated: state.book.quote.updated,
        receivedAt: state.book.quote.receivedAt,
        newQuote: state.book.quote.item || {},
        locale: state.locale.locale,
        total: state.book.quote.total,
        listQuote: state.book.quote.list.filter((el) => { return el.archive === false }),
        rowsPerPageOptions: state.book.quote.rowsPerPageOptions,
        status: state.helper.items.status_quote && state.helper.items.status_quote.filter((el) => { return el.code !== "11" }),
        actionLoading: state.book.quote.actionLoading
    }
}

const StyledQuote = withStyles(styles)(Quote)

export default connect(mapStateToProps, {  getBookList, updateField, createState, downloadPdf, resetState })(StyledQuote);
