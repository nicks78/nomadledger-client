//manager/src/pages/expense/expenseReducer.js

import { 
    REQUEST_EXPENSES, 
    FAILED_EXPENSES, 
    RECEIVE_EXPENSES, 
    EXPENSE_STATE, 
    GET_EXPENSE } from '../../redux/actionsTypes'

const initialState = {
  isFetching: false,
  expense: null,
  isError: false,
  listExpenses: [],
  receivedAt: null,
  newExpense: {}
}

export default (state = initialState, action) => {
  
  switch (action.type) {
    case REQUEST_EXPENSES:
        return  { 
            ...state,
            isFetching: true,
          }
    case FAILED_EXPENSES: 
        return {
            ...state,
            isFetching: false,
            isError: true,
        }
    case RECEIVE_EXPENSES:
        return  { 
            ...state,
            isFetching: false,
            listExpenses: action.payload, 
            receivedAt: action.receivedAt 
        }
    case GET_EXPENSE:
        return  { 
            ...state,
            expense: action.expense,
            isFetching: false,
        }
    case EXPENSE_STATE: 
        return {
            ...state,
            newExpense: { ...state.newExpense, [ action.payload.fieldName] : action.payload.value  }    
        }
    default:
        return state
  }
}
