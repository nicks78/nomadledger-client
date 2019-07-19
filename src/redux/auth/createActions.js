//src/redux/auth/createActions.js
import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {requestUser, requestFailed} from './actions'
import { setNotification } from '../notification/actions'
import {setError} from '../error/actions'


// CREATE NEW OWNER
export const createUser = ( ) => {

    return (dispatch, getState) => {

        // Set loading time
        dispatch(requestUser());

        // Get current state
        var state = getState().auth.state_user

        axios.post(`${API_ENDPOINT}public/create-new-account?locale=${localStorage.getItem("locale") || "fr"}`,
            {
                data: state,
                mode: 'cors'
            },
            { headers: {
                    'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            return response.data
        })
        .then( res => {
                dispatch(setNotification("success_create_new_user", "success"));
                dispatch(setCreateUser(res.message));
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}

export function createStateUser ( fieldName, value ){
    return {
      type: `STATE_AUTH`,
      payload: {fieldName, value}
    }
}

function setCreateUser( message ){
    return {
        type: `CREATE_AUTH`,
        message: message
    }
}
