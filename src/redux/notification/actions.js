//src/redux/notifications/actions.js



export function setNotification(text, status){
    return {
        type: "SET_NOTIFICATION",
        status: status,
        text: text,
        openSnack: true,
    }
}

export function resetNotification(){
    return {
        type: "RESET_NOTIFICATION",
        openSnack: false,
        text: null,
        status: null
    }
}