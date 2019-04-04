//src/redux/locale/actions.js

import { GET_LOCALE } from '../actionsTypes'
import axios from 'axios'
import { API_ENDPOINT } from '../constant'


import {fr, en } from './index'

export function getLocale( locale ){
    return dispatch => {

        var localeObject = locale === 'fr' ? fr : en

        dispatch(setLocale(localeObject)) 

        localStorage.setItem('locale', locale)

        axios.get(`${API_ENDPOINT}company/update/locale/${locale}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then( (response) => { 
            return true
        }) 
        .catch((error) => {
            console.log(error)
            return false
        })
    }
}

export function initLocale( locale ){
    return dispatch => {
        
        var localeObject = locale === 'fr' ? fr : en;
        dispatch(setLocale(localeObject)) 

        localStorage.setItem('locale', locale)
    }
}

export function setLocale(locale){
    
    return {
        type: GET_LOCALE,
        payload: locale
    }
}