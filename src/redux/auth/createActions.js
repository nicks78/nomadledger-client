//src/redux/auth/createActions.js
import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {requestUser, requestFailed} from './actions'
import { setNotification } from '../notification/actions'

// CREATE NEW OWNER
export const createUser = ( actionType ) => {

    return (dispatch, getState) => {
    
        // Get current state
        var state = getState().auth.state_user

        // // Set loading time
        dispatch(requestUser());

        axios.post(`${API_ENDPOINT}public/create-new-account`,
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
            // handle error
            dispatch(setNotification("error_500", "danger"));
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed(message));
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