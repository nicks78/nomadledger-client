// redux store 
import { createStore, applyMiddleware, compose } from 'redux';
import { setAuthUser, getLogout } from '../pages/auth/actions'
import { getAccount } from '../pages/account/actions'
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
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// Check if user is loggedIn
var x =   document.cookie.replace('auth=', '')

if( parseInt(x, 10) ){
    // Set company && user infos
    store.dispatch(getAccount('COMPANY'))
    store.dispatch(getAccount('USER'))
    store.dispatch(setAuthUser())
    
}else{
    store.dispatch(getLogout());
    history.push('/')
}

export default store;