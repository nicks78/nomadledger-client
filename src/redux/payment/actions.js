

//src/redux/auth/actions.js

import axios from 'axios';
import { API_ENDPOINT } from '../constant'
import {history} from '../../routes/history'
import {setNotification} from '../notification/actions'
import {setError} from '../error/actions'

// Set withCredentials
axios.defaults.withCredentials = true;

// GET PRE-PAYMENT INFOS
export function getPaymentInfo(token){

    return dispatch => {

      axios.get(`${API_ENDPOINT}public/payment-info/${token}?locale=${localStorage.getItem("locale") || "fr"}`)
        .then(function (response) {
            return response.data
        })
        .then( res => {
            dispatch(setPayment(res))
        })
        .catch(function (error) {
            // Redirect to home page
            history.push('/')
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}

// GET AUTHENTICATED
export function submitPayment(data){

    return dispatch => {

      axios.post(`${API_ENDPOINT}public/payment-gateway`,
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

            dispatch(setNotification(res.message, "success"));
            // Redirect to home page
            history.push('/login')
        })
        .catch(function (error) {
            dispatch(setError(error));
            dispatch(requestFailed());
        })
    }
}

export function requestPayment(){
    return {
        type: `REQUEST_PAYMENT`,
        isFetching: true,
        isError: false
    }
}

export function setPayment(obj){
    return {
        type: "SET_PAYMENT",
        payload: obj,
        isFetching: false,
        isError: false
    }
}

export function resetPayment(){
    return {
        type: "RESET_PAYMENT"
    }
}

export function getPayment(){
    return {
        type: "GET_PAYMENT",
        payload: {},
        isFetching: false,
        isError: false
    }
}


export function requestFailed(){
    return {
        type: `REQUEST_PAYMENT`,
        isFetching: false,
        isError: true
    }
}
