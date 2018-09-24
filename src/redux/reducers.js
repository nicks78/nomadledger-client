import { combineReducers } from 'redux';


// Reducer import
import clientReducer from '../pages/client/clientReducer'
import localeReducer from '../utils/locale/localeReducer'
import productReducer from '../pages/product/productReducer'
import serviceReducer from '../pages/service/serviceReducer'
import expenseReducer from '../pages/expense/expenseReducer'

export default combineReducers({
    client: clientReducer,
    locale: localeReducer,
    product: productReducer,
    service: serviceReducer,
    expense: expenseReducer
})