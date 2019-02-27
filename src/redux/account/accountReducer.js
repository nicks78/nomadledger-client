//src/redux/account/accountReducer.js

import baseAccountReducer from './baseAccountReducer'


class BaseState {
    tmp_state = {};
    item = null;
    isUpdating = false;
    receivedAt = null;
    progress = 0;
    isCreating = false;
    isFetching = false;
    isError = false;
    message = '';
    list = []
}


class InitialState {
    company = new BaseState();
    user = new BaseState();
}
  
export default (state = new InitialState(), action) => {
 
    switch (action.subtype) {
      case 'USER':
        return {
          ...state,
          user:     baseAccountReducer(state.user, action)
        }
      case 'COMPANY': 
        return {
          ...state,
          company:  baseAccountReducer(state.company, action)
        }
      default: return state;
    }
}

