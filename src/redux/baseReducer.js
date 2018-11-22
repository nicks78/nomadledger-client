// manager/src/redux/baseReducer.js
import {updateArrayOfObject} from '../utils/help_function'


class BaseState {
    tmp_state = {};
    item = null;
    isUpdating = false;
    receivedAt = null;
    progress = 0;
    isCreating = false;
    isFetching = false;
    isError = false;
    list = []
}



const baseReducer = (state = new BaseState(), action) => {
    

    switch (action.type) {
        case `REQUEST`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `REQUEST_CREATE`:
            return  { 
                ...state,
                isCreating: action.isCreating,
                isError: action.isError
            }
        case `REQUEST_UPDATE`:
            return  { 
                ...state,
                isUpdating: action.isUpdating,
                isError: action.isError
            }
        case `FAILED`: 
            return {
                ...state,
                isFetching: action.isFetching,
                receivedAt: action.receivedAt, 
                isError: action.isError,
            }

        case `RECEIVE`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                list: action.payload,
                receivedAt: action.receivedAt
            }

        case `GET`: 
            return {
                ...state,
                item: action.item,
                isFetching: action.isFetching,
            }

        case `STATE`: 
            return {
                ...state,
                tmp_state: { ...state.tmp_state, [ action.payload.fieldName ] : action.payload.value }
            }
            
        case `CREATE`:
            return {
                ...state,
                isCreating: action.isCreating,
                progress: action.value,
                tmp_state: {},
                list: [ ...state.list, action.item ]
            }
        case `UPDATE`:
            return {
                ...state,
                progress: action.value,
                isUpdating: action.isUpdating,
                tmp_state: {},
                item: action.item,
                list: updateArrayOfObject(state.list, action.item)
            }
            
        case `PROGRESS`:
            return {
                ...state,
                progress: action.value,
            }

        case `RESET`: 
            return new BaseState()

        case `RESET_STATE`: 
            return {
                ...state,
                tmp_state: action.payload
            }

        default:
            return state;
    }
}



export default baseReducer;