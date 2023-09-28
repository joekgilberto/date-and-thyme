import axios from 'axios';
const TOKEN_URL = process.env.REACT_APP_AUTH_API_URL;
const USER_URL = process.env.REACT_APP_USER_API_URL;

export async function login(data) {
    return axios
        .post(TOKEN_URL, data)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function signUp(data) {
    console.log("NEW USER",data)
    return axios
        .post(USER_URL, data)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => console.log(err));

};