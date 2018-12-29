//manager/src/pages/account/accountReducer.js

import baseBookReducer from './baseBookReducer'


class BaseState {
    item = {list_items: []};
    receivedAt = null;
    progress = 0;
    isFetching = false;
    isError = false;
    message = '';
    list_items =[];
    list = []
}


class InitialState {
    quote = new BaseState();
    invoice = new BaseState();
    payback = new BaseState();
}
  
export default (state = new InitialState(), action) => {
 
    switch (action.subtype) {
        case 'QUOTE':
            return {
                ...state,
                quote: baseBookReducer(state.quote, action)
            }
        case 'INVOICE': 
            return {
                ...state,
                invoice:  baseBookReducer(state.invoice, action)
            }
        case 'PAYBACK': 
            return {
                ...state,
                payback:  baseBookReducer(state.payback, action)
            }
      default: return state;
    }
}

