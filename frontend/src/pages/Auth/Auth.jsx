import './Auth.css';

import { useState, useContext } from 'react';
import * as authServices from '../../utilities/auth-services'
import { FridgeContext } from "../../data";
import { setUserToken } from '../../utilities/auth-token'
import { useNavigate } from 'react-router-dom';

const initState = {
    email: "",
    username: "",
    password: "",
}

export default function Auth() {

    const navigate = useNavigate()

    const { setUsername, toggle, setToggle } = useContext(FridgeContext);
    const [formData, setFormData] = useState(initState);

    function handleChange(e) {
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await authServices.login(formData).then((res)=>{
            setUsername(formData.username)
            setUserToken(res.token)
            setToggle(!toggle)
            navigate('/')
        })
        .catch((err)=>console.log(err))
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