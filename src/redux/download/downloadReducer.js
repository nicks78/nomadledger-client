//src/redux/download/downloadReducer.js


const initialState = {
    isFetching: false,
    isError: false,
}


const downloadReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_DOWNLOAD`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: false
            }
        case `FAILED_DOWNLOAD`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
            }
        case `GET_DOWNLOAD`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                isError: action.isError
            }
        default:
            return state;
    }
}

export default downloadReducer;