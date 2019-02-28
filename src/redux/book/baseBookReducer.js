//src/redux/book/baseBookReducer.js

import {removeFromArray,
removeDuplicateAndAddQuantity, 
discountPrice, 
manageQuantity,
editObjectInArray,
replaceObjectInArray } from '../../utils/help_function'

const initialState = {
    item : {list_items: []},
    total: 0,
    isUpdating: false,
    receivedAt : null,
    progress : 0,
    isFetching : false,
    isError : false,
    message : '',
    list : []
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
                isUpdating: action.isUpdating
            }
        case `FAILED`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                receivedAt: action.receivedAt,
                isUpdating: action.isUpdating,
                message: action.message
            }
        case `RECEIVE`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                isUpdating: action.isUpdating,
                list: action.payload,
                receivedAt: action.receivedAt
            }
        case `GET`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                item: action.item,
            }
        case `STATE`:
            return {
                ...state,
                item: { ...state.item, [ action.payload.fieldName ] : action.payload.value },
            }
        case `STATE_ITEM`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                isError: action.isError,
                item: {...state.item, list_items :  removeDuplicateAndAddQuantity(state.item.list_items || [], action)},
            }
        case `UPDATE_LIST_ITEM`:
            return {
                ...state,
                item: { ...state.item, list_items: replaceObjectInArray(state.item.list_items, action.payload.item_id) },
            }

        case `UP_DOWN_QUANTITY`:
            return {
                ...state,
                item: { ...state.item, list_items : manageQuantity(state.item.list_items, action)},
            }

        case `DISCOUNT`:
            return {
                ...state,
                item: { ...state.item, list_items : discountPrice(state.item.list_items, action)},
            }
        case `EDIT_SINGLE_ITEM`:
            return {
                ...state,
                item: { ...state.item, list_items : editObjectInArray(state.item.list_items, action.item, action.payload.fieldName, action.payload.value)},
            }

        case `REMOVE_ITEM`:
            return {
                ...state,
                item: { ...state.item, list_items : removeFromArray( state.item.list_items, action.payload ) },
            }
        case `SET_TOTAL`:
            return {
                ...state,
                total: action.total,
            }
        case `RESET_STATE`:
            return initialState
        default:
            return state;
    }
}

export default authReducer;

