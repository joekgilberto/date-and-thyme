import axios from 'axios';
const BASE_URL = process.env.REACT_APP_AUTH_API_URL;

export async function create(data) {
    return axios
        .post(BASE_URL, data)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => console.log(err));

};