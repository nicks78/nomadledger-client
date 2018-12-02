//src/pages/auth/authReducer.js

const initialState = {
    isCreated: false,
    isFetching: false,
    isLoggedIn: false,
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
                isCreated: false,
                isError: false
            }
        case `FAILED_USER`:
            return  { 
                ...state,
                isFetching: action.isFetching,
                isError: action.isError,
                isLoggedIn: false,
                isCreated: false,
                message: action.message
            }
        case `CREATE_USER`:
            return  { 
                ...state, 
                isFetching: false,
                isCreated: true,
                state_user: initialState.state_user,
            }
        case `GET_USER`:
            return  { 
                ...state,
                isFetching: false,
                isLoggedIn: true
            }
        case `STATE_USER`:
            return {
                ...state,
                state_user: { ...state.state_user, [ action.payload.fieldName ] : action.payload.value }
            }
        case `RESET_USER`:
            return initialState

        case `LOGOUT_USER`:
            return initialState
        default:
            return state;
    }
}

export default authReducer;