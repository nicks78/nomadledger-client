//manager/src/redux/locale/actions.js

import { GET_LOCALE } from '../../redux/actionsTypes'
import axios from 'axios'
import { API_ENDPOINT } from '../../utils/constant'


import Locale from './index'

export function getLocale( locale ){
    return dispatch => {

        dispatch(setLocale(Locale[locale])) 

        localStorage.setItem('locale', locale)

        axios.get(`${API_ENDPOINT}account/update/locale/${locale}`, {
            method: 'GET',
            mode: 'cors',
        })
        .then( (response) => { 
            return true
        }) 
        .catch((error) => {
            return false
        })
    }
}

export function initLocale( locale ){
    return dispatch => {

        dispatch(setLocale(Locale[locale])) 

        localStorage.setItem('locale', locale)
    }
}

export function setLocale(locale){
    
    return {
        type: GET_LOCALE,
        payload: locale
    }
}