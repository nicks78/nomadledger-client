//manager/src/pages/expense/index.js

import React, { Component } from 'react'
import {getExpenses, createExpenseState, getExpense } from './actions'
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
        keyLocation: ''
    }

    componentDidMount(){
        if( this.props.receivedAt === null )
            this.props.getExpenses();
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
            this.props.getExpense(id);
        }
    }

    returnToList = () => {
        this.setState({ showExpense: false })
    }

    render() {
    
    const {listExpenses, isFetching, isError,  locale, expense, newExpense } = this.props
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
            <TableCell onClick={ () => { this.renderSingleExpense(row._id) } }><span  style={ styles.link }>{row.name}</span></TableCell>
          </TableRow>
        );
      })

    return (
        <div style={styles.container}>
            {
                showExpense ? 
                    <IconButton onClick={ this.returnToList }><ArrowBackIcon/></IconButton>
                : <AddExpense locale={ locale } initData="" newData={newExpense} createItemState={ this.props.createExpenseState } createItem={ () => {alert('new epense')} }/>
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
        isFetching: state.expense.isFetching,
        isError: state.expense.isError,
        listExpenses: state.expense.listExpenses,
        receivedAt: state.expense.receivedAt,
        locale: state.locale.locale,
        newExpense: state.expense.newExpense,
        expense: state.expense.expense
    }
}


export default connect(mapStateToProps, { getExpenses, createExpenseState, getExpense })(Expense);