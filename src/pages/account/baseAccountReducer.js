//manager/src/pages/account/baseAccountReducer.js

class BaseState {
    tmp_state = {};
    item = null;
    isUpdating = false;
    receivedAt = null;
    progress = 0;
    isCreating = false;
    isFetching = false;
    isError = false;
    message = '';
    list = []
}



const baseAccountReducer = (state = new BaseState(), action) => {
    

    switch (action.type) {
        case `REQUEST`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED`: 
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message,
                receivedAt: action.receivedAt, 
                isError: action.isError,
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
        case `RESET_STATE`: 
            return new BaseState()
        default:
            return state;
    }
}



export default baseAccountReducer;