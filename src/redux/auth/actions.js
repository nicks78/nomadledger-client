//src/redux/auth/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import { resetState } from '../library/actions/initAction'
import {getAccount} from '../account/actions'
import {history} from '../../routes/history'

// Set withCredentials
axios.defaults.withCredentials = true;





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
            // Set locale
            localStorage.setItem('locale', res.locale);

            // Set user auth
            dispatch(getAccount("USER"));
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

export function setLogout(){
    return {
        type: `LOGOUT_AUTH`,
        isLoggedIn: false,
    }
}

export function setAuthUser(){
    return {
        type: `USER_AUTH`,
        isFetching: false,
        isLoggedIn: true
    }
}

export function requestUser(){
    return {
        type: `REQUEST_AUTH`,
        isFetching: true,
    }
}

export function requestFailed( message ) {
    return {
        type: `FAILED_AUTH`,
        isFetching: false,
        isError: true,
        message: message
    }
}

export function resetUser (){
    return {
      type: `RESET_AUTH`
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
        dispatch(setLogout());
        history.push('/')
      })
      .catch(function (error) {
            // Do something when error
            var message = error.response ? error.response.data.message : 'error_500';
            // Empty redux state
            dispatch(resetState('CONTACT'))
            dispatch(resetState('SERVICE'))
            dispatch(resetState('EXPENSE'))
            dispatch(resetState('PRODUCT'))
            dispatch(setLogout());
            dispatch(requestFailed(message));
            history.push('/')
      })     
    }
}