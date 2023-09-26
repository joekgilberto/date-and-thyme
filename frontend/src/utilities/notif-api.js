import axios from 'axios';
const BASE_URL = process.env.REACT_APP_NOTIF_API_URL;
const QUERY_URL = process.env.REACT_APP_QUERY_API_URL;

export async function index() {
    return axios
        .get(BASE_URL)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function show(id) {
    return axios
        .get(`${BASE_URL}${id}/`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function create(data) {
    return axios
        .post(BASE_URL, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function update(id,data) {
    return axios
        .put(`${BASE_URL}${id}/`, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function find(id) {
    return axios
        .get(`${QUERY_URL}${id}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};