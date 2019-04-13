// redux store 
import { createStore, applyMiddleware, compose } from 'redux';
import { setAuthUser, getLogout } from './auth/actions'
import {getHelpers} from './helper/actions'
import { getAccount } from './account/actions'
import {history} from '../routes/history'


import thunk from 'redux-thunk';
import reducers from './reducers';

const logger = (store) => (next) => (action) => {
    if(typeof action !== "function"){
        console.log('DISPATCHING:', action);
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
var x =   document.cookie.replace('auth=', '')

if(history.location.pathname === "/"){
    console.log("STORE-1")
    history.push('/')
}else if( parseInt(x, 10) || localStorage.getItem('locale') !== ""){
    console.log("STORE-2")
    // Set company && user infos
    store.dispatch(getAccount('COMPANY'))
    store.dispatch(getAccount('USER'))
    store.dispatch(setAuthUser())

}else if(history.location.pathname.indexOf("/public") >= 0 ){
    console.log("STORE-3")
    history.push(history.location.pathname)
}else{
    console.log("STORE-4")
    store.dispatch(getLogout());
    history.push('/')
}

export default store;