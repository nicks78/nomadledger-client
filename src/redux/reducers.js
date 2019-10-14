//src/redux/reducer.js

import { combineReducers } from 'redux';


// Reducer import
import localeReducer from './locale/localeReducer'
import libraryReducer from './library/libraryReducer'
import authReducer from './auth/authReducer'
import accountReducer from './account/accountReducer'
import bookReducer from './book/bookReducer'
import searchReducer from './search/searchReducer'
import helperReducer from './helper/helperReducer'
import taskReducer from './task/taskReducer'
import statReducer from './stat/statReducer'
import notificationReducer from './notification/notificationReducer'
import paymentReducer from './payment/paymentReducer';
import errorReducer from './error/errorReducer'
import downloadReducer from './download/downloadReducer'
import contractReducer from './contract/contractReducer'
import marketingReducer from './marketing/marketingReducer'

// v2 
import coworkingReducer from '../pages/coworking/redux/coworkingReducer'

export default combineReducers({
    locale: localeReducer,
    library: libraryReducer,
    auth: authReducer,
    account: accountReducer,
    book: bookReducer,
    search: searchReducer,
    helper: helperReducer,
    task: taskReducer,
    stat: statReducer,
    notification: notificationReducer,
    payment: paymentReducer,
    error: errorReducer,
    download: downloadReducer,
    contract: contractReducer,
    marketing: marketingReducer,
    coworking: coworkingReducer
})
