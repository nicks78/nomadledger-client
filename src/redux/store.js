// redux store
import { createStore, applyMiddleware, compose } from 'redux';
import { setAuthUser } from './auth/actions'
import { getHelpers } from './helper/actions'
import { getAccount } from './account/actions'
import { setNotification } from './notification/actions'
import { history } from '../routes/history'
import thunk from 'redux-thunk';
import reducers from './reducers';

const logger = (store) => (next) => (action) => {
  if (typeof action !== "function") {
    console.log("DISPATCH", action)
  }
  return next(action);
}

const store = createStore(reducers,
  compose(
    applyMiddleware(logger, thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));

store.dispatch(getHelpers());


// Check if user is loggedIn
var auth = document.cookie.replace('auth=', '')
var confirm = document.cookie.replace('confirm=', '');

if (parseInt(confirm, 10) === 1) {
  store.dispatch(setNotification("email_confirmed", "success"))
}



if (parseInt(auth, 10) === 1 || parseInt(localStorage.getItem('auth'), 10) === 1) {
  // Set company && user infos
  store.dispatch(getAccount('COMPANY'))
  store.dispatch(getAccount('USER'))
  store.dispatch(setAuthUser())
} else {
  if (history.location.pathname.indexOf("public") >= 0) {
    history.push(history.location.pathname + history.location.search)
  } else {
    history.push('/')
  }

}

export default store;
