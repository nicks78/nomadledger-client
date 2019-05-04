//manager/src/pages/quote/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf, resetState } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import AddIcon from '@material-ui/icons/AddOutlined'
import { withStyles, Button, Hidden,  Paper, Table, TableHead, TableBody, TableCell, TableRow , Fab, Switch} from '@material-ui/core';
import ApxSelect from '../../../components/common/select'
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import { cvtNumToUserPref } from '../../../utils/help_function'
import MobileView from '../common/mobileView'


class Quote extends Component {

    state = {
        showQuote: false,
        reducer: "QUOTE",
        status: 'none',
        width: window.innerWidth,
        receivedAt: "",
        listQuote: []

    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer);
        this.props.getBookList(this.state.reducer, `list?limit=5&skip=0`);
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

    getWindowWidth = () => {
      this.setState({width: window.innerWidth})
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

    const { isFetching,  locale, classes, newQuote, status, total} = this.props
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
                    />
                    <div style={{overflowY: "auto"}}>
                    <Table  padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.wording.reference}</TableCell>
                            <TableCell>{locale.wording.client}</TableCell>
                            <TableCell>{locale.wording.subtotal}</TableCell>
                            <TableCell>{locale.wording.vat}</TableCell>
                            <TableCell>{locale.wording.total}</TableCell>
                            <TableCell>{locale.wording.status}</TableCell>
                            <TableCell align="center">{locale.wording.invoicer}</TableCell>
                            <TableCell>PDF</TableCell>
                            <TableCell align="center">Actions</TableCell>
                            <TableCell align="center">{ locale.wording.archive }</TableCell>

                        </TableRow>
                    </TableHead>

                        <TableBody className={classes.tableBody}>
                            {   !isFetching ?
                                this.props.listQuote.map(( item, index) => {
                                    let vat = item.subtotal * item.vat.indice / 100
                                    return  <TableRow key={index}>
                                                <TableCell><Link className="link" to={`/quote/view/${item._id}`}>{locale.wording.qto}-{item.ref}</Link></TableCell>
                                                <TableCell><Link className="link" to={{ pathname: `/contact/view/${item.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{item.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref(item.subtotal)} {item.currency.value}</TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref( vat ) + " "+item.currency.value }</TableCell>
                                                <TableCell className="tableNumber">{cvtNumToUserPref( item.subtotal + vat  )} {item.currency.value}</TableCell>
                                                <TableCell>

                                                {
                                                    item.status.code === "6" ||   item.status.code === "10" ||   item.status.code === "11"  ?
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
                                                <TableCell align="center"><Link to={`/invoice/create/${item._id}`}><img alt="convert-to-invoice" style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/convert-file.png" } width="34" /></Link></TableCell>
                                                <TableCell><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, item._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>


                                                <ApxTableActions
                                                    actionDelete={item.status.code === "10" ? true : false}
                                                    actionEdit={ item.status.code === "1" || item.status.code === "2" ? `/quote/edit/${item._id}` : false }
                                                    actionView={false}
                                                    actionCheck={item.status.code === "6" ? true : false }
                                                    actionArchive={item.status.code === '11' ? true : false }
                                                />
                                                <TableCell>
                                                    <Switch checked={ !item.archive } onChange={ () => { this.props.updateField(reducer, {archive: true}, item._id ) }} />
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
        total: state.library.quote.total,
        listQuote: state.book.quote.list,
        rowsPerPageOptions: state.library.quote.rowsPerPageOptions,
        status: state.helper.items.status_quote
    }
}

const StyledQuote = withStyles(styles)(Quote)

export default connect(mapStateToProps, {  getBookList, getTotal, updateField, createState, downloadPdf, resetState })(StyledQuote);
