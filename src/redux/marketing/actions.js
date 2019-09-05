//src/redux/marketing/actions.js
import axios from 'axios';
import { API_ENDPOINT } from '../constant'


// GET PRE-PAYMENT INFOS
export function getMarketing(endPoint) {

    return dispatch => {

        axios.get(`${API_ENDPOINT}${endPoint}`)
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setMarketing(res))
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

export function setMarketing(items) {
    return {
        type: "SET_MARKETING",
        payload: items.payload,
        total: items.total
    }
}