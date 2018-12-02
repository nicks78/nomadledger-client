import { combineReducers } from 'redux';


// Reducer import
import localeReducer from '../../utils/locale/localeReducer'
import libraryReducer from './libraryReducer'
import authReducer from '../../pages/auth/authReducer'
import accountReducer from '../../pages/account/accountReducer'





export default combineReducers({
    locale: localeReducer,
    library: libraryReducer,
    auth: authReducer,
    account: accountReducer
})