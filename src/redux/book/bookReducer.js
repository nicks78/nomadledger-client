//src/redux/book/bookReducer.js

import baseBookReducer from './baseBookReducer'


class BaseState {
    item = {list_items: []};
    total = 0;
    receivedAt = null;
    progress = 0;
    isFetching = false;
    isUpdating = false;
    isError = false;
    list_items =[];
    list = []
}


class InitialState {
    quote = new BaseState();
    invoice = new BaseState();
    refund = new BaseState();
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
        case 'REFUND': 
            return {
                ...state,
                refund:  baseBookReducer(state.refund, action)
            }
      default: return state;
    }
}

