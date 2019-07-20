//src/redux/locale/actions.js

import { GET_LOCALE } from '../actionsTypes'
import axios from 'axios'
import { API_ENDPOINT } from '../constant'
import {setError} from '../error/actions'

import {fr, en } from './index'

export function getLocale( locale ){
    return dispatch => {

        axios.get(`${API_ENDPOINT}user/update/locale/${locale}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then( (response) => {
            var localeObject = locale === 'fr' ? fr : en
            dispatch(setLocale(localeObject))
            localStorage.setItem('locale', locale)
            document.location.reload(true)
            return true
        })
        .catch((error) => {
            dispatch(setError(error));
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
