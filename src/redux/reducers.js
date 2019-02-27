//src/redux/reducer.js

import { combineReducers } from 'redux';


// Reducer import
import localeReducer from './locale/localeReducer'
import libraryReducer from './library/libraryReducer'
import authReducer from './auth/authReducer'
import accountReducer from './account/accountReducer'
import bookReducer from './book/bookReducer'
import searchReducer from './search/searchReducer'





export default combineReducers({
    locale: localeReducer,
    library: libraryReducer,
    auth: authReducer,
    account: accountReducer,
    book: bookReducer,
    search: searchReducer
})