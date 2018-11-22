//manager/src/redux/HOC/libraryReducer.js

import baseReducer from '../baseReducer'


class BaseState {
    tmp_state = { };
    item = null;
    progress = 0 ;
    isUpdating = false;
    receivedAt = null;
    isCreating = false;
    isFetching = false;
    isError = false;
    list = []
}


class InitialState {
    contact = new BaseState();
    expense = new BaseState();
    service = new BaseState();
    product = new BaseState();
    account = new BaseState();
}
  
export default (state = new InitialState(), action) => {
 
    switch (action.subtype) {
      case 'CONTACT':
        return {
          ...state,
          contact: baseReducer(state.contact, action)
        }
      case 'EXPENSE': 
        return {
          ...state,
          expense: baseReducer(state.expense, action)
        }
      case 'SERVICE': 
        return {
          ...state,
          service: baseReducer(state.service, action)
        }
      case 'PRODUCT': 
        return {
          ...state,
          product: baseReducer(state.product, action)
        }
      case 'ACCOUNT': 
        return {
          ...state,
          product: baseReducer(state.account, action)
        }
      default: return state;
    }
}


  