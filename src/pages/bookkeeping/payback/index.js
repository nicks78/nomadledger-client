//src/pages/bookkeeping/payback/index.js

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


class Payback extends Component {

    state = {
        reducer: "PAYBACK",
        status: ''
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer );
        this.props.getBookList(this.state.reducer, "list?limit=5&skip=0");
    }

    handleFilterRequest = (value) => {
        this.setState({status: value.code});
        this.props.getTotal(this.state.reducer, `?status=${value.code || '10'}`);
        this.props.getBookList(this.state.reducer, `list?limit=5&skip=0&status=${value.code || '10'}`);
    }

    handleStatus = (event) => {
        this.props.createState(this.state.reducer, event.target.name, event.target.value);
    }
    
    render() {
    
    const {listPayback, isFetching, isError,  locale, classes, message, newPayback, filter, status} = this.props
    const { reducer } = this.state

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/payback/create" 
                        variant="contained" color="primary"  
                        className={  classes.button }>
                        { newPayback.contact_id ? locale.wording.progress : locale.wording.create}
                </Button>
            </Hidden>
            <Paper className={classes.paper}>

            <ApxTableToolBar
                title={locale.wording.payback}
                selected={locale.wording.selected}
                locale={locale}
                menus={filter}
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
                                listPayback.map(( payback, index) => {
                                    let total = payback.subtotal * payback.vat.indice / 100
                                    return  <TableRow key={index}>
                                                <TableCell>{locale.wording.inv}-{payback.ref}</TableCell>
                                                <TableCell><Link to={{ pathname: `/contact/view/${payback.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{payback.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{payback.currency.en}</TableCell>
                                                <TableCell>{cvtNumToUserPref(payback.subtotal)} {payback.currency.value}</TableCell>
                                                <TableCell>{cvtNumToUserPref(payback.vat.indice) + "%"}</TableCell>
                                                <TableCell>{cvtNumToUserPref(total  )} {payback.currency.value}</TableCell>
                                                <TableCell>
                                                    {
                                                        false ? 
                                                        <span style={{color: payback.status.color }}>

                                                        { payback.status[localStorage.getItem('locale')] }</span>

                                                        :   <ApxSelect 
                                                                arrayField={status}
                                                                value={payback.status[localStorage.getItem('locale')]}
                                                                variant="standard"
                                                                handleAction={ (event) => { this.props.updateField(reducer, { status: event.target.value}, payback._id) } }
                                                                locale={locale}
                                                            />
                                                    }    
                                                </TableCell>
                                                <TableCell><img alt="pdf" onClick={ () => {this.props.downloadPdf(reducer, payback._id)} } style={{cursor: "pointer"}} src={ DEFAULT_URL + "img/pdf-icon.png" } width="20" /></TableCell>
                                                <ApxTableActions 
                                                    actionDelete={false}
                                                    actionEdit={`/payback/edit/${payback._id}`}
                                                    actionView={false}
                                                    actionCheck={false}

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
    }
})

const mapStateToProps = (state) => {

    return {
        isFetching: state.book.payback.isFetching,
        updated: state.book.payback.updated,
        isError: state.book.payback.isError,
        message: state.book.payback.message,
        receivedAt: state.book.payback.receivedAt,
        newPayback: state.book.payback.item || {},
        locale: state.locale.locale,
        total: state.library.payback.total,
        listPayback: state.book.payback.list,
        rowsPerPageOptions: state.library.payback.rowsPerPageOptions,
        filter: state.helper.items.filter,
        status: state.helper.items.status_payback,
    }
}

const StyledPayback = withStyles(styles)(Payback)

export default connect(mapStateToProps, {  getBookList, getTotal, updateField, createState, downloadPdf  })(StyledPayback);