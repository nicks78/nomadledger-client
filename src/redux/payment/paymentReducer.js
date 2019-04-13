// src/redux/payment/paymentReducer.js



const initialState = {
    isFetching: false,
    payment: null,
    isError: false
}



const paymentReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_PAYMENT`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_PAYMENT`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `SET_PAYMENT`:
            return {
                ...state,
                payment: action.payload,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `GET_PAYMENT`:
            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `RESET_PAYMENT`:
            return initialState
        default:
            return state;
    }
}

export default paymentReducer;