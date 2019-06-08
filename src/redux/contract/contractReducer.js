//src/redux/task/contractReducer.js

const initialState = {
    isCreating: false,
    isFetching: false,
    isError: false,
    list: []
}


const contractReducer = (state = initialState, action) => {

    switch (action.type) {
        case `REQUEST_CONTRACT`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_CONTRACT`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
            }
        case `RECEIVE_CONTRACT`:
            return  {
                ...state,
                isFetching: action.isFetching,
                [action.fieldName]: action.payload
            }
        case `RESET_CONTRACT`:
            return initialState
        default:
            return state;
    }
}

export default contractReducer;
