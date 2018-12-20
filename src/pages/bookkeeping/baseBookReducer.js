//src/pages/bookkeeping/baseBookReducer.js

import {removeFromArray} from '../../utils/help_function'

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
                isLoggedIn: false,
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
                isLoggedIn: true
            }
        case `STATE_ITEM`:
            return  { 
                ...state, 
                isFetching: false,
                list_items: removeDuplicateAndAddQuantity(state.list_items, action)
            }
        case `STATE`:
            return {
                ...state,
                tmp_state: { ...state.tmp_state, [ action.payload.fieldName ] : action.payload.value },
                item: { ...state.item, [ action.payload.fieldName ] : action.payload.value }
            }

        case `UP_DOWN_QUANTITY`:
            return {
                ...state,
                list_items: manageQuantity(state.list_items, action),
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


function removeDuplicateAndAddQuantity(array, element) {
    var list = array;
    var obj = list.filter((x) => {   
        if(x._id === element.payload._id) { 
            x.quantity = x.quantity +1; 
            x.total = x.total_ht * x.quantity
            return x
        } 
        return 
    });
    
    if(obj.length === 0 ){
        list = [...list, element.payload]
    }else{
        list = Object.assign(obj, list)
    }

    return list
}

function manageQuantity(list, action){
    // function to update array
    var newData = list.map(obj => {
        if(obj._id === action.id){
            if(obj.quantity !== 1 && action.move === "down"){
                obj.quantity = obj.quantity -1;
                obj.total = obj.total_ht * obj.quantity
            }else if(action.move === "up"){
                obj.quantity = obj.quantity +1 ;
                obj.total = obj.total_ht * obj.quantity
            }
            return obj
        }else{
            return obj
        }  
    });

    return newData
}