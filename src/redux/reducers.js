import { combineReducers } from 'redux';


// Reducer import
import localeReducer from '../utils/locale/localeReducer'
import libraryReducer from './high-order-component/libraryReducer'



export default combineReducers({
    locale: localeReducer,
    library: libraryReducer,
})