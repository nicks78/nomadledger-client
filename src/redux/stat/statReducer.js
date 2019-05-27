//src/redux/stat/statReducer.js

const initialState = {
    isFetching: false,
    isError: false,
    message: '',
}



const statReducer = (state = initialState, action) => {


    switch (action.type) {
        case `REQUEST_STAT`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_DATA`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                message: action.message
            }
        case `RESET_STAT`:
            return  {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                [action.fieldName]: null
            }
        case `GET_DATA`:
            return  {
                ...state,
                isFetching: false,
                [action.fieldName]: action.data,
            }
        default:
            return state;
    }
}

export default statReducer;
