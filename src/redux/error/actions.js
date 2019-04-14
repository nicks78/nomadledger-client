//src/redux/notifications/actions.js

import {setNotification} from '../notification/actions'
import {history} from '../../routes/history'


export function setError(error){

    return dispatch => {
        var message = error.response && error.response.data ? error.response.data.message : 'error_500';

        switch (error.response.status) {
            case 403: // Not authorized
                dispatch(setNotification(message, "error"))
                history.push('/')
                break;
            case 404:
                dispatch(setNotification(message, "error"))
                break;
            case 401: // Wrong token
                dispatch(setNotification(message, "error"))
                break;
            case 422: // Wrong token
                dispatch(setNotification(message, "error"))
                break;
            default: 
                dispatch(setNotification(message, "error"))
                break
        }
        dispatch(resetError())
    }
}

export function resetError(){
    return {
        type: "RESET_ERROR",
        error: null
    }
}