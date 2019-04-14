//manager/src/pages/service/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DEFAULT_IMG} from '../../redux/constant'
import {downloadFile} from '../../redux/download/actions'
import { createItem, getItemList, getItem, createState, getTotal , resetState, deleteElement} from '../../redux/library/actions'
import {connect} from 'react-redux'
import { TableCell, TableRow, Table, TableHead, TableBody, withStyles, Paper} from '@material-ui/core';
import ApxTableToolBar from '../../components/common/tableToolBar'
import AddExpense from './addExpense'
import Pagination from '../../lib/pagination'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { cvtNumToUserPref } from '../../utils/help_function'

// STYLES
const styles = theme =>  ({
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    customWidth: {
        maxWidth: 300,
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

class Expense extends Component {


    state = {
        reducer: 'EXPENSE',
        rowCount: 0,
        category: 'none',
    }

    componentDidMount(){
            this.props.getTotal(this.state.reducer)
            this.props.getItemList(this.state.reducer, "list?limit=10&skip=0");
    }

    componentWillUnmount(){
        this.props.resetState(this.state.reducer)
    }

    handleFilterRequest = (value) => {
        this.setState({category: value._id});
        this.props.getTotal(this.state.reducer, `?category=${value._id}`);
        this.props.getItemList(this.state.reducer, `list?limit=10&skip=0&category=${value._id}`);
    }

    render() {
    
    const {isFetching, listExpenses, locale, newExpense, createItem, createState, isCreating, progress, category, classes, currency, vat} = this.props
    const {reducer } = this.state

    return (
        <div className={ classes.container }>
        
            <AddExpense 
                locale={ locale } 
                category={category} 
                newData={newExpense}
                progress={progress} 
                createExpenseState={ createState } 
                createExpense={ createItem } 
                isCreating={isCreating}
                vat={vat}
                currency={currency}
            />
            <Paper className={classes.paper}>
                
                <ApxTableToolBar
                        numSelected={0}
                        menus={[...category, {fr: "Tous", en: "All", _id: "none"}]}
                        title={ isFetching ? locale.wording.loading : locale.wording.expense}
                        selected={locale.wording.selected}
                        onChangeQuery={ this.handleFilterRequest }
                        toExcel={true}
                        onDownload={ () => { this.props.downloadFile(reducer, `export/excel-file`) } }
                        locale={locale}
                    />
                    <div style={{overflowY: "auto"}}>
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                        <TableCell>{ locale.wording.receipt }</TableCell>
                            <TableCell>{ locale.wording.name }</TableCell>
                            <TableCell>{ locale.wording.category }</TableCell>
                            <TableCell>{ locale.wording.price }</TableCell>
                            <TableCell>{ locale.wording.date }</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {   !isFetching ?
                                listExpenses.map(( expense, index) => {
                                    return  <TableRow key={index}>
                                                <TableCell><a href={`${ expense.receipt ? expense.receipt.full_path : DEFAULT_IMG }`}  target="_blank">
                                                            <img alt={ expense.receipt.org_name } height="30" className={classes.img} src={`${ expense.receipt ? expense.receipt.full_path : DEFAULT_IMG }`} />
                                                            </a></TableCell>
                                                <TableCell><Link to={`/${reducer.toLowerCase()}/view/${expense._id.toLowerCase()}`}><span  className="link">{expense.name}</span></Link></TableCell>
                                                <TableCell style={{textTransform: 'capitalize'}}>{ expense.category[localStorage.getItem('locale')] }</TableCell>
                                                <TableCell>{ cvtNumToUserPref(expense.price) } { expense.currency.value }</TableCell>
                                                <TableCell>{ new Date(expense.receipt_date.date).toLocaleDateString(localStorage.getItem('locale')) }</TableCell>
                                                <TableCell align="center" onClick={() => { this.props.deleteElement( reducer, `delete/${expense._id}`) } }><DeleteIcon style={{color: 'red', cursor: 'pointer', fontSize: 18}}  /></TableCell>
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
                        value={this.state.category}
                        filterName="category"
                        reducer={reducer}
                        label2={locale.wording.of}
                        onGetItemList={ this.props.getItemList }
                    />        
            </Paper>
        </div>
    )
  }
}




const mapStateToProps = (state) => {
    return {
        isFetching: state.library.expense.isFetching,
        isCreating: state.library.expense.isCreating,
        listExpenses: state.library.expense.list,
        receivedAt: state.library.expense.receivedAt,
        locale: state.locale.locale,
        progress: state.library.expense.progress,
        expense: state.library.expense.item,
        newExpense: state.library.expense.tmp_state,
        total: state.library.expense.total,
        rowsPerPageOptions: state.library.expense.rowsPerPageOptions,
        category: state.account.company.item ?  state.account.company.item.category_name : [],
        currency: state.helper.items.currency,
        vat: state.account.company.item ?  state.account.company.item.vat : [],

    }
}


const StyledExpense = withStyles(styles)(Expense)

export default connect(mapStateToProps, { downloadFile, createItem, getItemList, getItem, createState, getTotal, resetState , deleteElement })(StyledExpense);