import axios from 'axios';
import { API_ENDPOINT } from '../../../redux/constant'
import { setNotification } from '../../../redux/notification/actions'
import { setError } from '../../../redux/error/actions'


// GET
export function getListCoworking(endPoint, fieldName) {

    return dispatch => {

        dispatch(requestCoworking());

        axios.get(`${API_ENDPOINT}coworking/${endPoint}`)
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(receiveCoworking(res.payload, fieldName, res.total))
            })
            .catch(function (error) {
                dispatch(setNotification("error_500", "error"))
                dispatch(setError(error));
            })
    }
}

// POST
export const createCoworking = () => {
    return dispatch => {
        dispatch(requestCoworking());

    }
}


export function receiveItems(fieldName, total) {
    return {
        type: "RECEIVE_COWORKING",
        isFetching: false,
        payload: [],
        total: total,
        fieldName
    }
}

export function requestCoworking() {
    return {
        type: "REQUEST_COWORKING",
        isFetching: true,
        isError: false,
        message: "",
    }
}

export function receiveCoworking(items, fieldName, total) {
    return {
        type: "RECEIVE_COWORKING",
        isFetching: false,
        payload: items,
        total: total || 0,
        fieldName
    }
}


export function createStateCoworking(fieldName, value) {
    return {
        type: "STATE_COWORKING",
        payload: { fieldName, value }
    }
}
