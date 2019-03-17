//manager/src/pages/quote/index.js

import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import {  getBookList, updateField, createState, downloadPdf } from '../../../redux/book/actions'
import { getTotal } from '../../../redux/library/actions'
import { withStyles, Button, Hidden,  Paper, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import ApxSelect from '../../../components/common/select'
import ApxTableToolBar from '../../../components/common/tableToolBar'
import ApxAlert from '../../../components/common/alert'
import ApxTableActions from '../../../components/common/tableActions'
import Pagination from '../../../lib/pagination'
import { cvtNumToUserPref } from '../../../utils/help_function'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEyeOutlined'


class Quote extends Component {

    state = {
        showQuote: false,
        reducer: "QUOTE",
        status: ''
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer);
        this.props.getBookList(this.state.reducer, `list?limit=5&skip=0`);
    }

    handleFilterRequest = (value) => {
        this.setState({status: value.code});
        this.props.getTotal(this.state.reducer, `?status=${value.code}`);
        this.props.getBookList(this.state.reducer, `list?limit=5&skip=0&status=${value.code}`);
    }

    handleStatus = (event) => {
        this.props.createState("QUOTE", event.target.name, event.target.value);
    }
    
    render() {
    
    const {listQuote, isFetching, isError,  locale, classes, message, newQuote, filter, status} = this.props
    const { rowCount, reducer } = this.state; 

    if(isError){
        return <ApxAlert message={message} />
    }

    return (
      <div className={classes.root}>
            <Hidden only={['xs', 'sm']}>
                <Button component={Link} to="/quote/create" variant="contained" color="primary"  className={  classes.button }>
                { newQuote.contact_id ? locale.button.continue_edit : locale.button.add_quote}
                
                </Button>
            </Hidden>
            <Paper className={classes.paper}>

                <ApxTableToolBar
                        title={locale.table.title_quote}
                        selected={locale.table.selected}
                        menus={filter}
                        locale={locale}
                        onChangeQuery={ this.handleFilterRequest }
                    />
                    <div style={{overflowY: "auto"}}>
                    <Table  padding="dense">
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell>{locale.table.preview}</TableCell>
                            <TableCell>{locale.table.reference}</TableCell>
                            <TableCell>{locale.table.client}</TableCell>
                            <TableCell>{locale.table.subtotal}</TableCell>
                            <TableCell>{locale.table.vat}</TableCell>
                            <TableCell>{locale.table.total}</TableCell>
                            <TableCell align="center">{locale.table.status}</TableCell>
                            <TableCell align="center">Actions</TableCell>

                        </TableRow>
                    </TableHead>
                        
                        <TableBody className={classes.tableBody}>
                            {   !isFetching ? 
                                listQuote.map(( item, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell>
                                                    <RemoveRedEyeIcon style={{ cursor:"pointer" }}  onClick={ () => {this.props.downloadPdf(reducer, item._id)} } />
                                                </TableCell>
                                                <TableCell>{locale.table.qto}-{item.ref}</TableCell>
                                                <TableCell><Link className="link" to={{ pathname: `/contact/view/${item.contact_id._id}`, state: { reducer: "CONTACT" } }}><span  className="link">{item.contact_id.company_name}</span></Link></TableCell>
                                                <TableCell>{cvtNumToUserPref(item.total_ht)} {item.currency.value}</TableCell>
                                                <TableCell>{cvtNumToUserPref(item.vat.amount)} {item.currency.value}</TableCell>
                                                <TableCell>{cvtNumToUserPref(item.total)} {item.currency.value}</TableCell>
                                                <TableCell>

                                                {
                                                    false ? 
                                                    <span style={{color: item.status.color }}>

                                                    { item.status[localStorage.getItem('locale')] }</span>

                                                    :   <ApxSelect 
                                                            arrayField={status}
                                                            // field="status"
                                                            value={item.status[localStorage.getItem('locale')]}
                                                            variant="standard"
                                                            handleAction={ (event) => { this.props.updateField(reducer, { status: event.target.value}, item._id) } }
                                                            locale={locale}
                                                        />
                                                }    
                                                
                                                
                                                </TableCell>
                                                <ApxTableActions 
                                                    actionDelete={false}
                                                    actionEdit={`/quote/edit/${item._id}`}
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
                        label={locale.table.label_rows_per_page}
                        label2={locale.table.of}
                        reducer={reducer}
                        status={this.state.status}
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
        isFetching: state.book.quote.isFetching,
        updated: state.book.quote.updated,
        isError: state.book.quote.isError,
        message: state.book.quote.message,
        receivedAt: state.book.quote.receivedAt,
        newQuote: state.book.quote.item || {},
        locale: state.locale.locale,
        total: state.library.quote.total,
        listQuote: state.book.quote.list,
        rowsPerPageOptions: state.library.quote.rowsPerPageOptions,
        filter: state.helper.items.filter,
        status: state.helper.items.status_quote,
    }
}

const StyledQuote = withStyles(styles)(Quote)

export default connect(mapStateToProps, {  getBookList, getTotal, updateField, createState,downloadPdf })(StyledQuote);