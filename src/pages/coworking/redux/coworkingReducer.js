//src/redux/task/coworkingReducer.js

const initialState = {
    isCreating: false,
    isFetching: false,
    isError: false,
    item: {},
    receivedAt: null,
    list: []
}



const coworkingReducer = (state = initialState, action) => {


    switch (action.type) {
        case `REQUEST_COWORKING`:
            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_COWORKING`:
            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isCreating: action.isCreating
            }
        case `RECEIVE_COWORKING`:
            return {
                ...state,
                isFetching: action.isFetching,
                receivedAt: Date.now(),
                item: null,
                ["total_" + action.fieldName]: action.total,
                [action.fieldName]: action.payload
            }
        case `GET_COWORKING`:
            return {
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                item: action.payload
            }
        case `STATE_COWORKING`:
            return {
                ...state,
                item: { ...state.item, [action.payload.fieldName]: action.payload.value }
            }
        case `RESET_COWORKING`:
            return initialState
        default:
            return state;
    }
}

export default coworkingReducer;