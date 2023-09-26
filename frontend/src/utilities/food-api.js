import axios from 'axios';
const BASE_URL = process.env.REACT_APP_FOOD_API_URL;

export async function index() {
    let response;

    axios
        .get(BASE_URL)
        .then((res) => {
            response = res.data
        })
        .catch((err) => console.log(err));

    return response
};

export async function show(id) {
    let response;

    axios
        .get(`${BASE_URL}${id}/`)
        .then((res) => {
            response = res.data
        })
        .catch((err) => console.log(err));

    return response
};

export async function create(data) {
    let response;

    axios
        .post(BASE_URL, data)
        .then((res) => {
            response = res.data
        })
        .catch((err) => console.log(err));

    return response
};

export async function update(id,data) {
    let response;

    axios
        .put(`${BASE_URL}${id}/`, data)
        .then((res) => {
            response = res.data
        })
        .catch((err) => console.log(err));

    return response
};

export async function destroy(id) {
    let response;

    axios
        .delete(`${BASE_URL}${id}/`)
        .then((res) => {
            response = res.data
        })
        .catch((err) => console.log(err));
    
    return response
}