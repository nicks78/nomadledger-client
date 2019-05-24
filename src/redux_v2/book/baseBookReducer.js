//src/redux/book/baseBookReducer.js

import {
removeDuplicateAndAddQuantity,
discountPrice,
manageQuantity,
editObjectInArray,
updateArrayOfObject} from '../../utils/help_function'

const initialState = {
    item : {list_items: []},
    total: 0,
    rowsPerPageOptions: [],
    isUpdating: false,
    receivedAt : null,
    progress : 0,
    isFetching : false,
    isError : false,
    list : [],
}

const authReducer = (state = initialState, action) => {


    switch (action.type) {
        case `REQUEST`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isUpdating: action.isUpdating
            }
        case `UPDATING`:
            return  {
                ...state,
                isError: action.isError,
                isFetching: action.isFetching,
                isUpdating: action.isUpdating
            }
        case `FAILED`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                receivedAt: action.receivedAt,
                isUpdating: action.isUpdating,
            }
        case `RECEIVE`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isUpdating: action.isUpdating,
                list: action.payload,
                receivedAt: action.receivedAt,
                total: action.total,
                rowsPerPageOptions: action.rowsPerPageOptions
            }
        case `UPDATE_LIST`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isUpdating: action.isUpdating,
                list: updateArrayOfObject(state.list, action.payload),
                receivedAt: action.receivedAt,
                total: action.total,
                rowsPerPageOptions: action.rowsPerPageOptions
            }

        case `RESET_STATE`:
            return initialState
        default:
            return state;
    }
}

export default authReducer;
