//src/redux/library/libraryReducer.js

import baseReducer from './baseReducer'


class BaseState {
  tmp_state = {};
  item = null;
  progress = 0;
  isUpdating = false;
  receivedAt = null;
  isCreating = false;
  isFetching = false;
  isUploading = false;
  isError = false;
  list = [];
  uploadingContact = false;
  total = 0;
  rowsPerPageOptions = [];
}


class InitialState {
  contact = new BaseState();
  expense = new BaseState();
  service = new BaseState();
  product = new BaseState();
  task = new BaseState();
  company = new BaseState();
  user = new BaseState();
  stat = new BaseState();
  quote = new BaseState();
  invoice = new BaseState();
  refund = new BaseState();
  annuaire = new BaseState();
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
    case 'STAT':
      return {
        ...state,
        stat: baseReducer(state.stat, action)
      }
    case 'TASK':
      return {
        ...state,
        task: baseReducer(state.task, action)
      }
    case 'QUOTE':
      return {
        ...state,
        quote: baseReducer(state.quote, action)
      }
    case 'INVOICE':
      return {
        ...state,
        invoice: baseReducer(state.invoice, action)
      }
    case 'REFUND':
      return {
        ...state,
        refund: baseReducer(state.refund, action)
      }
    case 'ANNUAIRE':
      return {
        ...state,
        annuaire: baseReducer(state.annuaire, action)
      }
    default: return state;
  }
}
