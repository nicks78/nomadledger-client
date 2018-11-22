import { combineReducers } from 'redux';


// Reducer import
import localeReducer from '../utils/locale/localeReducer'
import libraryReducer from './high-order-component/libraryReducer'
import authReducer from '../pages/auth/authReducer'




export default combineReducers({
    locale: localeReducer,
    library: libraryReducer,
    auth: authReducer
})