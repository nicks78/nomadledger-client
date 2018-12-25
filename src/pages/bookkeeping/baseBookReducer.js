//src/pages/bookkeeping/baseBookReducer.js

import {removeFromArray} from '../../utils/help_function'
import { removeDuplicateAndAddQuantity, discountPrice, manageQuantity} from './common/_helper'

const initialState = {
    tmp_state : {},
    item : null,
    receivedAt : null,
    progress : 0,
    isCreating : false,
    isFetching : false,
    isError : false,
    message : '',
    list_items: [],
    list : []
}

const authReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isCreated: false,
                isError: false
            }
        case `FAILED`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isCreated: false,
                message: action.message
            }
        case `RECEIVE`:
            return  { 
                ...state, 
                isFetching: false,
                isCreated: true,
                list: action.payload,
                tmp_state: initialState.tmp_state,
            }
        case `GET`:
            return  { 
                ...state,
                isFetching: false,
                isError: false,
                item: action.item
            }
        case `STATE_ITEM`:
            return  { 
                ...state, 
                isFetching: false,
                isError: false,
                list_items: removeDuplicateAndAddQuantity(state.list_items, action),
            }
        case `STATE`:
            return {
                ...state,
                tmp_state: { ...state.tmp_state, [ action.payload.fieldName ] : action.payload.value },
                item: { ...state.item, [ action.payload.fieldName ] : action.payload.value },
            }

        case `UP_DOWN_QUANTITY`:
            return {
                ...state,
                list_items: manageQuantity(state.list_items, action),
            }

        case `DISCOUNT`:
            return {
                ...state,
                list_items: discountPrice(state.list_items, action),
            }

        case `REMOVE_ITEM`:
            return {
                ...state,
                list_items: removeFromArray( state.list_items, action.payload ),
            }
        default:
            return state;
    }
}

export default authReducer;

