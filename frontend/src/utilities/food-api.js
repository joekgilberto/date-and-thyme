import axios from 'axios';
const BASE_URL = process.env.REACT_APP_FOOD_API_URL;

const config={
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
    }
}

export async function index() {
    return axios
        .get(BASE_URL,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function show(id) {

    return axios
        .get(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function create(data) {
 
    return axios
        .post(BASE_URL,data,config)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function update(id,data) {
    return axios
        .put(`${BASE_URL}${id}/`,data,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function destroy(id) {
    return axios
        .delete(`${BASE_URL}${id}/`,config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));
    
}