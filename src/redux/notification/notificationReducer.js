//src/redux/notifications/notificationReducer.js


const initialState = {
    text: null,
    status: null,
    openSnack: false
}



const notificationReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case `SET_NOTIFICATION`:
            return  { 
                text: action.text,
                status: action.status,
                openSnack: action.openSnack,
            }
        case `RESET_NOTIFICATION`:
            return  { 
                text: action.text,
                status: action.status,
                openSnack: action.openSnack,
            }
        default:
            return state;
    }
}

export default notificationReducer;