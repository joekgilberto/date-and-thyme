import './SignIn.css';

import { useState, useContext } from 'react';
import * as authServices from '../../utilities/auth-services'
import { FridgeContext } from "../../data";
import { setUserToken, setUsername } from '../../utilities/auth-token'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function SignIn({ handleClick }) {
    const initState = {
        username: "",
        password: "",
    }

    const navigate = useNavigate()

    const { toggle, setToggle } = useContext(FridgeContext);
    const [formData, setFormData] = useState(initState);

    function handleChange(e) {
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await authServices.login(formData).then((res) => {
            setUsername(formData.username)
            setUserToken(res.token)
            setToggle(!toggle)
            navigate('/')
        })
            .catch((err) => console.log(err))
    };

    return (
        <div className='SignIn'>
            <h1>Sign In</h1>
            <form className='auth-form' onSubmit={handleSubmit}>
                <label>Username
                    <input type="text" name="username" onChange={handleChange} value={formData.username} required />
                </label>
                <label>Password
                    <input type="password" name="password" onChange={handleChange} value={formData.password} required />
                </label>
                <div className='auth-buttons'>
                    <Button type='submit' variant='contained' style={{ margin: '10px 5px 10px 0' }}>Submit</Button>
                    <Button size="large" onClick={handleClick} style={{ margin: '10px 0 10px 5px' }}>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}