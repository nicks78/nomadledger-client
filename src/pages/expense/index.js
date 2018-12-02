//manager/src/pages/expense/index.js

import React, { Component } from 'react'
import { createItem, getItemList, getItem, createState } from '../../redux/actions'
import {connect} from 'react-redux'
import {ApxTable, Spinner, ApxAlert} from '../../components/common'
import ShowExpense from './showExpense'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBackOutlined'
import AddExpense from './addExpense'

class Expense extends Component {


    state = {
        showExpense: false,
        reducer: "EXPENSE",
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getItemList(this.state.reducer);
            this.props.getItemList('SERVICE');
            this.props.getItemList('CONTACT');
            this.props.getItemList('PRODUCT');
        this.setState({keyLocation: this.props.location.key})
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.key !== this.state.keyLocation){
            this.setState({ showExpense: false, keyLocation: nextProps.location.key })
        }
    }

    renderSingleExpense = (id) => {
        var {expense }= this.props
        this.setState({ showExpense: true })
        if( expense && expense._id === id ){
            return;
        }else{
            this.props.getItem(this.state.reducer, id);
        }
    }

    returnToList = () => {
        this.setState({ showExpense: false })
    }

    render() {
    
    const {listExpenses, isFetching, isError,  locale, expense, newExpense, createState, createItem, isCreating } = this.props
    const { showExpense } = this.state

    if(isFetching){
        return <Spinner />
    }
    if(isError){
        return <ApxAlert message="Erreur message" />
    }

    var tableRow = 
        listExpenses.map((row, index) => {
        return (
          <TableRow key={index}>
            <TableCell onClick={ () => { this.renderSingleExpense(row._id) } }><span  style={ styles.link }>{row.expense_name}</span></TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            {
                showExpense ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddExpense locale={ locale } initData="" newData={newExpense} createExpenseState={ createState } createExpense={ createItem } isCreating={isCreating}/>
            }
            {
                showExpense ?
                    <ShowExpense expense={ expense } />
                : <ApxTable isFetching={isFetching} tableRow={ tableRow }/>
            }          
            
        </div>
    )
  }
}


const styles =  {
    container: {
    },
    link: {
        color: '#ef6c00',
        cursor: 'pointer'
    },
    sidebar: {
        height: '100vh',
        boxShadow: '2px 0 10px -5px black',
        zIndex: 3
    },
    content: {
        backgroundColor: 'rgb(240, 240, 240)',
        zIndex: 1,
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.library.expense.isFetching,
        isCreating: state.library.expense.isCreating,
        isError: state.library.expense.isError,
        listExpenses: state.library.expense.list,
        receivedAt: state.library.expense.receivedAt,
        locale: state.locale.locale,
        newExpense: state.library.expense.tmp_state,
        expense: state.library.expense.item
    }
}


export default connect(mapStateToProps, { createItem, getItemList, getItem, createState  })(Expense);