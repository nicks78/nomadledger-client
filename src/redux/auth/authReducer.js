//src/redux/auth/authReducer.js


const initialState = {
    isCreated: false,
    isFetching: false,
    isLoggedIn: false,
    isError: false,
    message: '',
    state_user: {}
}



const authReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `REQUEST_AUTH`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isCreated: false,
                isError: false
            }
        case `FAILED_AUTH`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isLoggedIn: false,
                isCreated: false,
                message: action.message
            }
        case `CREATE_AUTH`:
            return  { 
                ...state, 
                isFetching: false,
                isCreated: true,
                state_user: initialState.state_user,
            }
        case `USER_AUTH`:
            return  { 
                ...state,
                isFetching: false,
                isLoggedIn: true
            }
        case `STATE_AUTH`:
            return {
                ...state,
                state_user: { ...state.state_user, [ action.payload.fieldName ] : action.payload.value }
            }
        case `RESET_AUTH`:
            return initialState

        case `LOGOUT_AUTH`:
            return initialState
        default:
            return state;
    }
}

export default authReducer;