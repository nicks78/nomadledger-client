//manager/src/api/constant.js


export const API_ENDPOINT = 'http://localhost:8080/api/v1/'
export const GOOGLE_API = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBrDuQLE4sPVZLKnMvptotXNu1LNrE72kI&libraries=places&callback=initAutocomplete'



// export const API_ADRESSES = {
//     GET_CONTACT: 'contact/list',
//     POST_CONTACT: 'contact/create',
//     DELETE_CONTACT: 'contact/delete',
//     GET_CLIENT: 'client/list',
//     POST_CLIENT: 'contact/create',
//     DELETE_CLIENT: 'contact/delete',
// };


export const apiCall = (name) => {
    const endPoints = {
        get: `list/${name.toLowerCase()}`,
        get_one: `single-row/${name.toLowerCase()}`,
        post: `create/${name.toLowerCase()}`,
        put: `update/${name.toLowerCase()}`,
        delete: `delete/${name.toLowerCase()}`,
    };
    return {
        endPoints
    };
};