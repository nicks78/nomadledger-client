//src/redux/helper/helperReducer.js

const initialState = {
    isFetching: false,
    items: [],
    isError: false,
    message: '',
}



const helperReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_HELPERS`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_HELPERS`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                message: action.message
            }
        case `GET_HELPERS`:
            return  { 
                ...state, 
                isFetching: false,
                items: action.items,
            }
        default:
            return state;
    }
}

export default helperReducer;