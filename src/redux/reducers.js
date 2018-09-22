import { combineReducers } from 'redux';


// Reducer import
import clientReducer from '../pages/client/clientReducer'
import localeReducer from '../utils/locale/localeReducer'

export default combineReducers({
    client: clientReducer,
    locale: localeReducer
})