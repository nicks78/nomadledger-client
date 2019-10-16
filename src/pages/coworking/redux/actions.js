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
                dispatch(setError(error));
            })
    }
}

// GET ONE
export function getCoworking(id) {

    return dispatch => {

        dispatch(requestCoworking());

        axios.get(`${API_ENDPOINT}coworking/${id}`)
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setCoworking(res))
            })
            .catch(function (error) {
                dispatch(setError(error));
            })
    }
}

// POST
export const createCoworking = () => {
    return (dispatch, getState) => {
        dispatch(requestCoworking());

        let state = getState().coworking.item

        const formData = new FormData();

        // Set file
        if (state.images) {
            for (var x = 0; x < state.images.length; x++) {
                formData.append("files", state.images[x]);
            }
        }

        // Set input
        formData.append('state', JSON.stringify(state));

        axios.post(`${API_ENDPOINT}coworking/create`,
            formData,
            {
                headers: {
                    'content-type': 'application/form-data'
                },
                // onUploadProgress: progressEvent => { // Check progression for upload
                //     var p = (progressEvent.loaded / progressEvent.total) * 100
                //     // dispatch(progress(parseInt(p, 10)))
                // }
            })
            .then(function (response) {
                return response.data
            })
            .then(res => {
                dispatch(setNotification("success_create", "success"))
                dispatch(resetCoworking())
            })
            .catch(function (error) {
                dispatch(setError(error));
            })

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

const setCoworking = (item) => {
    return {
        type: "GET_COWORKING",
        payload: item,
        isFetching: false,
        isError: false,
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

export const resetCoworking = () => {
    return {
        type: "RESET_COWORKING"
    }
}


export const progress = () => {

}
