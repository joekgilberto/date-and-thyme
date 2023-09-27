import './Auth.css';

import { useState } from 'react';
import * as authServices from '../../utilities/auth-services'

const initState = {
    email: "",
    username: "",
    password: "",
}

export default function Auth() {

    const [formData, setFormData] = useState(initState);

    function handleChange(e) {
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedData)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        authServices.signUp(formData)
    };

    return (
        <div className='Auth'>
            <form onSubmit={handleSubmit}>
                <label>Username
                    <input type="text" name="username" onChange={handleChange} value={formData.username} required />
                </label>
                <label>Password
                    <input type="text" name="password" onChange={handleChange} value={formData.password} required />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}