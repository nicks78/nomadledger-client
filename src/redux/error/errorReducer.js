//src/redux/notifications/errorReducer.js


const initialState = {
    error: null,
}



const errorReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case `RESET_ERROR`:
            return  { 
                error: null
            }
        default:
            return state;
    }
}

export default errorReducer;