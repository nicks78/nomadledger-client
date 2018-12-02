//manager/src/pages/auth/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../../utils/constant'
import { resetState } from '../../redux/actions/initAction'
import {history} from '../../routes/history'

// Set withCredentials
axios.defaults.withCredentials = true;

// CREATE NEW OWNER
export const createUser = ( actionType ) => {

    return (dispatch, getState) => {
    
        // Get current state
        var state = getState().auth.state_user

        // // Set loading time
        dispatch(requestUser());

        axios.post(`${API_ENDPOINT}owner/create`,
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
                dispatch(setCreateUser(res.message));
        })
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed(message));
        })  
    }
}



// GET AUTHENTICATED
export function authUser(data){

    return dispatch => {
  
      dispatch(requestUser());
      
      axios.post(`${API_ENDPOINT}auth`,
        { 
            data: data,
            mode: 'cors',
        },   
        { headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(function (response) { 
            return response.data
        }) 
        .then( res => {
            localStorage.setItem('locale', res.locale)
            dispatch(setAuthUser());
            // Redirect to home page
            history.push('/home')
            
        }) 
        .catch(function (error) {
            // handle error
            var message = error.response ? error.response.data.message : 'error_500'
            dispatch(requestFailed(message));
        })          
    }
}



// Logout 
export function getLogout(){

    return dispatch => {

    axios.get(`${API_ENDPOINT}auth/logout`, {
        method: 'GET',
        mode: 'cors'
      })
      .then( res => {

        // Empty redux state
        dispatch(resetState('CONTACT'))
        dispatch(resetState('SERVICE'))
        dispatch(resetState('EXPENSE'))
        dispatch(resetState('PRODUCT'))
        dispatch(setLogout())
        
        // Redirect to login page
        history.replace("/login");
      })
      .catch(function (error) {
          // Do something when error
            console.log(error)
      })     
    }
}

export function setLogout(){
    return {
        type: `LOGOUT_USER`,
        isLoggedIn: false,
    }
}


function requestUser(){
    return {
        type: `REQUEST_USER`,
        isFetching: true,
    }
}

export function setAuthUser(){
    return {
        type: `GET_USER`,
        isFetching: false,
        isLoggedIn: true,
    }
}
  
function setCreateUser( message ){
    return {
        type: `CREATE_USER`,
        message: message
    }
}

function requestFailed( message ) {
    return {
        type: `FAILED_USER`,
        isFetching: false,
        isError: true,
        message: message
    }
}

export function createStateUser ( fieldName, value ){
    return {
      type: `STATE_USER`,
      payload: {fieldName, value}
    }
}

export function resetUser (){
    return {
      type: `RESET_USER`
    }
}
