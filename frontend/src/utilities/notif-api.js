// Imports axios for API calls
import axios from 'axios';
// Imports notifications API environmental variables
const BASE_URL = process.env.REACT_APP_NOTIF_API_URL;

// Creates function to get all notifications as authorized by token
export async function index() {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .get(BASE_URL,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

// Creates function to get a specific notification as authorized by token
export async function show(id) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .get(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

// Creates function to get create notifications as authorized by token
export async function create(data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .post(BASE_URL,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

// Creates function to update a specific notification as authorized by token
export async function update(id,data) {
    const config={
        headers: {
            Authorization: `Token ${localStorage.getItem("token")}`
        }
    }
    return axios
        .put(`${BASE_URL}${id}/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};