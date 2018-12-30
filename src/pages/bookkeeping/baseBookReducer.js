//src/pages/bookkeeping/baseBookReducer.js

import {removeFromArray} from '../../utils/help_function'
import { 
removeDuplicateAndAddQuantity, 
discountPrice, 
manageQuantity,
editObjectInArray,
replaceObjectInArray   } from './common/_helper'

const initialState = {
    item : {list_items: []},
    updated: false,
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
                updated: action.updated
            }
        case `FAILED`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                receivedAt: action.receivedAt,
                updated: action.updated,
                message: action.message
            }
        case `RECEIVE`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                updated: action.updated,
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
        case `CREATED`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                updated: action.updated,
                isError: action.isError
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
                item: { ...state.item, list_items: replaceObjectInArray(state.item.list_items, action.payload) },
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
                list_items: removeFromArray( state.list_items, action.payload ),
            }
        case `RESET_STATE`:
            return {
                ...state,
                item: initialState.item,
                updated: initialState.updated,
                isError : initialState.isError,
                message : initialState.message,
            }
        default:
            return state;
    }
}

export default authReducer;

