//manager/src/redux/locale/actions.js

import { GET_LOCALE } from '../../redux/actionsTypes'

import Locale from './index'

export function getLocale( locale ){
    return dispatch => {

        var newLocale =  locale.lang === 'fr' ? Locale.en : Locale.fr

        dispatch(setLocale(newLocale))      
    }
}

export function setLocale(locale){
    
    return {
        type: GET_LOCALE,
        payload: locale
    }
}