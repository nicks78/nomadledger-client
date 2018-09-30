// redux store 
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducers from './reducers';

const logger = (store) => (next) => (action) => {
    if(typeof action !== "function"){
        console.log('dispatching:', action);
    }
    return next(action);
}


const store = createStore(reducers,
    compose(
    applyMiddleware(logger, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));


export default store;