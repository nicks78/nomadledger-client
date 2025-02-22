//src/redux/auth/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {getAccount} from '../account/actions'
import {history} from '../../routes/history'
import {setNotification} from '../notification/actions'
import {setError} from '../error/actions'

// Set withCredentials
// axios.defaults.withCredentials = true;

// GET AUTHENTICATED
export function authUser(data){

    return dispatch => {

      dispatch(requestUser());

      axios.post(`${API_ENDPOINT}auth`,
        {
            data: data,
            mode: 'cors',
            withCredentials: true
        },
        { headers: {
            'Content-Type': 'application/json',
        }
        })
        .then(function (response) {
            return response.data
        })
        .then( res => {

            // Check if user has confirm his email
             if( res.isMembershipEnd ){
                /**
                 * Redirect to payment-gateway/:token
                 */
                history.push(res.url);
                dispatch(resetUser())
                dispatch(setNotification(res.message, "info"))
            }else{
                // Set locale
                localStorage.setItem('locale', res.locale);
                localStorage.setItem('auth', "1");

                // Set user auth
                dispatch(getAccount("COMPANY"));
                dispatch(getAccount("USER"));
                dispatch(setAuthUser());


                if(!res.last_co){
                    dispatch(setNotification("first_co", "info"))
                    history.push('/account')
                }else{
                    history.push('/dashboard')
                }
            }
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
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

export function requestFailed( ) {
    return {
        type: `FAILED_AUTH`,
        isFetching: false,
        isError: true
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

    localStorage.setItem('auth', "0");

    axios.get(`${API_ENDPOINT}auth/logout`, {
        method: 'GET',
        mode: 'cors'
    })
    .then( res => {
        history.push('/');
        window.location.reload(true)
    })
    .catch(function (error) {
        history.push('/');
        window.location.reload(true)
    })
    }
}


// Recover my password
export function recoverPassword(email){
    return dispatch => {

        dispatch(requestUser())

        axios.post(`${API_ENDPOINT}auth/forgot-password?locale=${localStorage.getItem("locale")}`,
        {
            email: email,
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
            dispatch(setNotification("request_reset_pw", "success"));
            dispatch(resetUser())
            // Redirect to home page
            history.push('/')

        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}

// Recover my password
export function resetPassword(token, password){
    return dispatch => {

        dispatch(requestUser())

        var data = {
            token: token,
            password: password
        }

        axios.post(`${API_ENDPOINT}public/reset-password?locale=${localStorage.getItem("locale")}`,
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
            dispatch(setNotification(res.message, "success"))
            dispatch(resetUser())
            // Redirect to home page
            history.push('/login')

        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}

// Recover my password
export function verifyToken( token ){
    return dispatch => {

        axios.get(`${API_ENDPOINT}public/verify/${token}`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(function (response) {
            return response.data
        })
        .then( res => {
            return
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
            history.push('/')
        })
    }
}


export function confirmEmail(email){
    return dispatch => {

        dispatch(requestUser())

        axios.post(`${API_ENDPOINT}public/resend/email-confirm?locale=${localStorage.getItem("locale")}`,
        {
            email: email,
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
            dispatch(setNotification(res.message, "success"));
            dispatch(resetUser())
            // Redirect to home page
            history.push('/login')

        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}
