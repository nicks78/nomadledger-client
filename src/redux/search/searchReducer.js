//src/redux/search/searchReducer.js

const initialState = {
    isFetching: false,
    isError: false,
    message: '',
    list: []
}



const searchReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_ITEM`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: false
            }
        case `FAILED_ITEM`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                message: action.message
            }
        case `RECEIVE_ITEM`:
            return  { 
                ...state, 
                isFetching: false,
                list: action.payload,
            }
        case `RESET_ITEM`:
            return initialState
        default:
            return state;
    }
}

export default searchReducer;