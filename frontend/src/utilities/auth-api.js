import axios from 'axios';
const TOKEN_URL = process.env.REACT_APP_AUTH_API_URL;
const USER_URL = process.env.REACT_APP_USER_API_URL;

export async function login(data) {
    const config={
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios
        .post(TOKEN_URL, data, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

export async function signUp(data) {
    const config={
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
    return axios
        .post(USER_URL, data, config)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};