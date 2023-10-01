// Imports axios for API calls
import axios from 'axios';
// Imports token and user API environmental variables
const TOKEN_URL = process.env.REACT_APP_AUTH_API_URL;
const USER_URL = process.env.REACT_APP_USER_API_URL;

// Creates API call to login using the token authentication from the backend
export async function login(data) {
    return axios
        .post(TOKEN_URL, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};

// Creates API call to sign up a user model in the backend
export async function signUp(data) {
    return axios
        .post(USER_URL, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err));

};