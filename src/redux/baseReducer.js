// manager/src/redux/baseReducer.js

class BaseState {
    tmp_state = { addresses: {}  };
    item = null;
    receivedAt = null;
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
            var fieldName = action.payload.fieldName.startsWith('_')
            if(fieldName){
                state.tmp_state.addresses = { ...state.tmp_state.addresses , [ action.payload.fieldName ] : action.payload.value }
            }else{
                state.tmp_state = { ...state.tmp_state, [ action.payload.fieldName ] : action.payload.value }
            }
            return {
                ...state,
            }
            
        case `CREATE`:
            return {
                ...state,
                isCreating: action.isCreating,
                tmp_state: { addresses: {} },
                list: [ ...state.list, action.item ]
            }

        case `RESET`: 
            return new BaseState()

        default:
            return state;
    }
}

export default baseReducer;