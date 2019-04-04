//src/pages/bookkeeping/refund/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {DEFAULT_URL} from "../../../redux/constant"
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { cvtNumToUserPref } from '../../../utils/help_function'
import { withStyles, Button, Hidden ,Table, TableHead, Paper, TableBody, TableCell, TableRow,} from '@material-ui/core';
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxAlert from '../../../components/common/alert'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import ApxSelect from '../../../components/common/select'


class Refund extends Component {

    state = {
        reducer: "REFUND",
        status: 'none'
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer );
        this.props.getBookList(this.state.reducer, "list?limit=10&skip=0");
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
    
    const {listRefund, isFetching, isError,  locale, classes, message, newRefund, status} = this.props
    const { reducer } = this.state

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/refund/create" 
                        variant="contained" color="primary"  
                        className={  classes.button }>
                        { newRefund.contact_id ? locale.wording.progress : locale.wording.create}
                </Button>
            </Hidden>
            <Paper className={classes.paper}>

            <ApxTableToolBar
                title={locale.wording.refund}
                selected={locale.wording.selected}
                locale={locale}
                menus={ [...status, {fr: "Tous", en: "All", code: "none"}]  }
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

                        </TableRow>
                        </TableHead>
                        
                        <TableBody className={classes.tableBody}>
                            {   !isFetching ? 
                                listRefund.map(( refund, index) => {
                                    let total = refund.subtotal * refund.vat.indice / 100
                                    return  <TableRow key={index}>
                                                <TableCell>{locale.wording.pya}-{refund.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${refund.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{refund.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{refund.currency.en}</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(refund.subtotal)} {refund.currency.value}</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(refund.vat.indice) + "%"}</TableCell>
                                                <TableCell className={classes.price}>{cvtNumToUserPref(total  )} {refund.currency.value}</TableCell>
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
        isFetching: state.book.refund.isFetching,
        updated: state.book.refund.updated,
        isError: state.book.refund.isError,
        message: state.book.refund.message,
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

export default connect(mapStateToProps, {  getBookList, getTotal, updateField, createState, downloadPdf  })(StyledRefund);