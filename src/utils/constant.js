//manager/src/api/constant.js


export const API_ENDPOINT = 'http://localhost:8080/api/v1/'
export const DEFAULT_URL = 'http://localhost:8080/'
export const GOOGLE_API = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBrDuQLE4sPVZLKnMvptotXNu1LNrE72kI&libraries=places&callback=initAutocomplete'



export const apiCall = (name) => {
    const endPoints = {
        get: `${name.toLowerCase()}/list`,
        get_one: `${name.toLowerCase()}/single-row`,
        post: `${name.toLowerCase()}/create`,
        put: `${name.toLowerCase()}/update`,
        delete: `${name.toLowerCase()}/delete`,
    };
    return {
        endPoints
    };
};