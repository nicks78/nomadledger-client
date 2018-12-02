// redux store 
import { createStore, applyMiddleware, compose } from 'redux';
import { setAuthUser } from '../pages/auth/actions'

import thunk from 'redux-thunk';
import reducers from './reducers';

const logger = (store) => (next) => (action) => {
    if(typeof action !== "function"){
        console.log('Dispatching:', action);
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
    store.dispatch(setAuthUser())
}

export default store;