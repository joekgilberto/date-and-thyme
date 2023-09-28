import './SignUp.css';

import { useState, useContext } from 'react';
import * as authServices from '../../utilities/auth-services'
import { FridgeContext } from "../../data";
import { setUserToken, setUsername } from '../../utilities/auth-token'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function SignUp({ handleClick }) {

    const initState = {
        username: "",
        password: "",
        reenterPassword: ""
    }

    const navigate = useNavigate()

    const { toggle, setToggle } = useContext(FridgeContext);
    const [formData, setFormData] = useState(initState);
    const [error, setError] = useState(null);


    function handleChange(e) {
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (formData.password === formData.reenterPassword) {
            delete formData.reenterPassword
            await authServices.signUp(formData).then((res) => {
                setUsername(formData.username)
                setUserToken(res.token)
                setToggle(!toggle)
                setError(null)
                navigate('/')
            })
                .catch((err) => console.log(err))
        } else {
            setError('Passwords do not match.')
            setFormData(initState)
        }
    };

    return (
        <div className='SignUp'>
            <h1>Sign Up</h1>
            <form className='auth-form' onSubmit={handleSubmit}>
                <label>Username
                    <input type="text" name="username" onChange={handleChange} value={formData.username} required />
                </label>
                <label>Password
                    <input type="password" name="password" onChange={handleChange} value={formData.password} required />
                </label>
                <label>Re-Enter Password
                    <input type="password" name="reenterPassword" onChange={handleChange} value={formData.reenterPassword} required />
                </label>
                <p className="password-error">{error}</p>
                <div className='auth-buttons'>
                    <Button type='submit' variant='contained' style={{ margin: '10px 5px 10px 0' }}>Submit</Button>
                    <Button size="large" onClick={handleClick} style={{ margin: '10px 0 10px 5px' }}>Sign In</Button>
                </div>
            </form>
        </div>
    );
}