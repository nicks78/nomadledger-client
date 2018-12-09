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
                isUploading: action.isUploading, 
                message: action.message,
                receivedAt: action.receivedAt, 
                isError: action.isError,
            }
        case `GET`: 
            return {
                ...state,
                item: action.item,
                isError: false,
                isUploading: action.isUploading, 
                progress: 0,
                isFetching: action.isFetching,
            }
        case `STATE`: 
            return {
                ...state,
                tmp_state: { ...state.tmp_state, [ action.payload.fieldName ] : action.payload.value },
                item: { ...state.item, [ action.payload.fieldName ] : action.payload.value }
            }
        case `PROGRESS`:
            return {
                ...state,
                progress: action.value,
            }

        case `UPLOADING`:
            return {
                ...state,
                isUploading: action.isUploading,
            }
        case `RESET_STATE`: 
            return new BaseState()
        default:
            return state;
    }
}



export default baseAccountReducer;