//manager/src/pages/expense/actions.js


// import axios from 'axios';
import { REQUEST_EXPENSES, FAILED_EXPENSES, RECEIVE_EXPENSES, EXPENSE_STATE, GET_EXPENSE  } from '../../redux/actionsTypes'


// TMP DATA
import expenses from '../../FAKE_DATA/expenses.json'

// GET FULL LIST OF EXPENSES
export function getExpenses( ){

    return dispatch => {

        dispatch(requestExpenses())

        setTimeout(() => {
            dispatch(receiveExpenses(expenses))  
        }, 300)

        if(1 === 2){
            dispatch(failedExpenses())
        }     
    }
}

// GET A SINGLE EXPENSES
export function getExpense( id ){

  return dispatch => {
  
      dispatch(requestExpenses())

      setTimeout(() => {
          dispatch(setExpense( expenses.filter(obj => { return obj._id === id }) ))  
      }, 300)

      if(1 === 2){
          dispatch(failedExpenses())
      }      
  }
}

// CREATE NEW EXPENSES
export function createExpense( data ){

  return dispatch => {
  
      dispatch(requestExpenses())

      setTimeout(() => {
          dispatch(setExpense( expenses ))  
      }, 3000)

      if(1 === 2){
          dispatch(failedExpenses())
      }      
  }
}

function setExpense(expense) {
  return {
    type: GET_EXPENSE,
    isFetching: false,
    expense: expense[0]
  }
}



function requestExpenses() {
  return {
    type: REQUEST_EXPENSES,
    isFetching: true
  }
}

function receiveExpenses(expenses) {
  return {
    type: RECEIVE_EXPENSES,
    payload: expenses,
    receivedAt: Date.now()
  }
}

function failedExpenses() {
  return {
    type: FAILED_EXPENSES,
    isFetching: false,
    isError: true
  }
}

// keep expense state form update 
export function createExpenseState (fieldName, value){
  return {
    type: EXPENSE_STATE,
    payload: { fieldName, value }
  }
}