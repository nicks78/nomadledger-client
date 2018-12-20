import { combineReducers } from 'redux';


// Reducer import
import localeReducer from '../../utils/locale/localeReducer'
import libraryReducer from './libraryReducer'
import authReducer from '../../pages/auth/authReducer'
import accountReducer from '../../pages/account/accountReducer'
import bookReducer from '../../pages/bookkeeping/bookReducer'
import autoCompleteReducer from '../../lib/autoComplete/autoCompleteReducer'





export default combineReducers({
    locale: localeReducer,
    library: libraryReducer,
    auth: authReducer,
    account: accountReducer,
    book: bookReducer,
    autocomplete: autoCompleteReducer
})