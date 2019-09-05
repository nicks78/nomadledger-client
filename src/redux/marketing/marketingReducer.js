//src/redux/marketing/marketingReducer.js


const initialState = {
    list: [],
    isFetching: false,
    total: 0,
    isError: false
}



const marketingReducer = (state = initialState, action) => {


    switch (action.type) {
        case `FETCH_MARKETING`:
            return {
                isFetching: action.isFetching,
                isError: action.isError,
            }
        case `SET_MARKETING`:
            return {
                list: action.payload,
                isFetching: action.isFetching,
                total: action.total,
                isError: action.isError,
            }
        case `RESET_MARKETING`:
            return initialState
        default:
            return state;
    }
}

export default marketingReducer;