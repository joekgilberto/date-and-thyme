import axios from 'axios';
import { getUserToken } from './auth-token'
const BASE_URL = process.env.REACT_APP_NOTIF_API_URL;
const QUERY_URL = process.env.REACT_APP_QUERY_API_URL;

export async function index() {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios
        .get(BASE_URL,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function show(id) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios
        .get(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function create(data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios
        .post(BASE_URL,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function update(id,data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios
        .put(`${BASE_URL}${id}/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};