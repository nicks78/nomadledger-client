//src/redux/locale/localeReducer.js

import { GET_LOCALE } from '../../redux/actionsTypes'

import { fr } from './index'
const initialState = {
    locale: fr
}

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_LOCALE:
        return   {locale: action.payload}

    default:
        return state
  }
}