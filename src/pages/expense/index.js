//manager/src/pages/expense/index.js

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DEFAULT_IMG} from '../../redux/constant'
import { createItem, getItemList, getItem, createState, getTotal } from '../../redux/library/actions'
import {connect} from 'react-redux'
import { withStyles, Table, TableHead, TableBody, Checkbox, Paper, TableCell, TableRow,} from '@material-ui/core';
import ApxTableToolBar from '../../components/common/tableToolBar'
import ApxAlert from '../../components/common/alert'
import Spinner from '../../components/common/spinner'
import AddExpense from './addExpense'
import Pagination from '../../lib/pagination'

class Expense extends Component {


    state = {
        reducer: "EXPENSE",
        selected: []
    }

    componentDidMount(){
        this.props.getTotal(this.state.reducer);
        this.props.getItemList(this.state.reducer, "?limit=5&skip=0");
    }

    onSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState({ selected: this.props.listContacts.map(n => n._id) });
            return;
        }
        this.setState({ selected: [] });
    }

    onSelectedField = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {

            newSelected = newSelected.concat(selected, id);

        } else if (selectedIndex === 0) {

            newSelected = newSelected.concat(selected.slice(1));

        } else if (selectedIndex === selected.length - 1) {

            newSelected = newSelected.concat(selected.slice(0, -1));

        } else if (selectedIndex > 0) {

            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );

        }
    
        this.setState({ selected: newSelected });
    }

    isSelected = id =>  this.state.selected.indexOf(id) !== -1;

    handleOpenImage = () => {
        
    };
    
    render() {
    
    const {listExpenses, isFetching, isError,  locale, category, newExpense, createState, createItem, isCreating, classes, message, currency } = this.props
    const { selected, rowCount, reducer } = this.state

    if(isFetching){
        return <Spinner />
    }
    
    return (
        <div className={ classes.container}>
            <AddExpense 
                locale={ locale } 
                category={category} 
                newData={newExpense} 
                createExpenseState={ createState } 
                createExpense={ createItem } 
                isCreating={isCreating}
                currency={currency}
            />
            { isError ?  <ApxAlert message={message} /> : null }
            <Paper className={classes.paper}>
                <ApxTableToolBar
                        numSelected={selected.length}
                        title={locale.table.title_expense}
                        selected={locale.table.selected}
                    />
                    <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selected.length > 0 && selected.length < rowCount}
                                checked={selected.length === this.props.listExpenses.length}
                                onChange={this.onSelectAllClick}
                                />
                            </TableCell>
                            <TableCell>{ locale.table.receipt }</TableCell>
                            <TableCell>{ locale.table.name }</TableCell>
                            <TableCell>{ locale.table.category }</TableCell>
                            <TableCell>{ locale.table.price }</TableCell>
                            <TableCell>{ locale.table.date }</TableCell>
                            
                        </TableRow>
                        </TableHead>

                        <TableBody>
                            {   !isFetching ?
                                listExpenses.map(( expense, index) => {
                                    const isSelected = this.isSelected(expense._id);
                                    return  <TableRow key={index} selected={isSelected}>
                                                <TableCell padding="checkbox" onClick={ event => { this.onSelectedField(event, expense._id) } } >
                                                    <Checkbox checked={isSelected} />
                                                </TableCell>
                                                <TableCell><a href={`${ expense.receipt ? expense.receipt.full_path : DEFAULT_IMG }`}  target="_blank">
                                                            <img alt={ expense.receipt.org_name } className={classes.img} src={`${ expense.receipt ? expense.receipt.full_path : DEFAULT_IMG }`} />
                                                            </a></TableCell>
                                                <TableCell><Link to={`/${reducer.toLowerCase()}/view/${expense._id.toLowerCase()}`}><span  className="link">{expense.name}</span></Link></TableCell>
                                                <TableCell>{ expense.category[localStorage.getItem('locale')] }</TableCell>
                                                <TableCell>{ expense.price } { expense.currency.value }</TableCell>
                                                <TableCell>{ expense.receipt_date.label }</TableCell>

                                            </TableRow>
                                })
                                : null
                            }
                            
                        </TableBody>
                    </Table>
                    <Pagination
                        total={this.props.total}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        label={locale.table.label_rows_per_page}
                        label2={locale.table.of}
                        reducer={reducer}
                        onGetItemList={ this.props.getItemList }
                    />
                

            </Paper>    
                  
            
        </div>
    )
  }
}


const styles =  theme => ({
    container: {
    },
    tableHead: {
        backgroundColor: "rgb(238,238,238)"
    },
    img: {
        width: 40
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
        isFetching: state.library.expense.isFetching,
        isCreating: state.library.expense.isCreating,
        isError: state.library.expense.isError,
        message: state.library.expense.message,
        listExpenses: state.library.expense.list || [],
        receivedAt: state.library.expense.receivedAt,
        locale: state.locale.locale,
        newExpense: state.library.expense.tmp_state,
        total: state.library.expense.total,
        expense: state.library.expense.item,
        category: state.account.company.item ?  state.account.company.item.category_name : [],
        currency: state.helper.items.currency
    }
}

const StyledExpense = withStyles(styles)(Expense)

export default connect(mapStateToProps, { createItem, getItemList, getItem, createState, getTotal  })(StyledExpense);