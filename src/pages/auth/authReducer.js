//src/pages/auth/authReducer.js

const initialState = {
    isLoggedIn: false,
    isFetching: false,
    isError: false,
    user: null,
    message: '',
    state_user: {}
}



const authReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_USER`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError
            }
        case `FAILED_USER`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                message: action.message
            }
        case `CREATE_USER`:
            return  { 
                ...state, 
                isFetching: action.isFetching,
                state_user: initialState.state_user,
                user: action.user
            }
        case `GET_USER`:
            return  { 
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        case `STATE_USER`:
            return {
                ...state,
                state_user: { ...state.state_user, [ action.payload.fieldName ] : action.payload.value }
            }

        default:
            return state;
    }
}

export default authReducer;