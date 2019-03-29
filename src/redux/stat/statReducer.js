//src/redux/stat/statReducer.js

const initialState = {
    isFetching: false,
    isError: false,
    message: '',
}



const statReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_DATA`:
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
        case `GET_DATA`:
        console.log("REDUCER")
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