import './SignIn.css';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FridgeContext } from "../../data";
import * as authServices from '../../utilities/auth/auth-services'
import { setUserToken, setUsername } from '../../utilities/local-storage'

import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignIn({ handleClick }) {
    const initState = {
        username: "",
        password: "",
    }
    const { handleRefresh } = useContext(FridgeContext)
    const [signInError, setSignInError] = useState(null)

    const navigate = useNavigate()

    const [formData, setFormData] = useState(initState);
    const [view, setView] = useState(false)

    function handleChange(e) {
        const updatedData = { ...formData, [e.target.name]: e.target.value }
        setFormData(updatedData)
    }

    function handleViewPassword() {
        setView(!view)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await authServices.login(formData).then((res) => {
            setUsername(formData.username)
            setUserToken(res.token)
            handleRefresh()
            navigate('/')
        })
            .catch((err) => {
                console.log(err)
                setSignInError('Sign In Error: Username and/or password not found.  Please retype your credentials or sign up below')
            })
    };

    return (
        <div className='SignIn'>
            <h1>Sign In</h1>
            <form className='auth-form' onSubmit={handleSubmit}>
                <label>Username
                    <input type="text" name="username" autoComplete="username" onChange={handleChange} value={formData.username} required />
                </label>
                <label>
                    <div className='password-label'>Password
                        {view ? <VisibilityOffIcon onClick={() => handleViewPassword()} color="disabled" /> : <VisibilityIcon onClick={() => handleViewPassword()} color="disabled" />}
                    </div>
                    <input type={view ? 'text' : 'password'} name="password" autoComplete="current-password" onChange={handleChange} value={formData.password} required />
                </label>
                {signInError ?
                    <p className="password-error">{signInError}</p>
                    : null
                }
                <div className='auth-buttons'>
                    <Button type='submit' variant='contained' style={{ margin: '10px 5px 10px 0' }}>Submit</Button>
                    <Button size="large" onClick={handleClick} style={{ margin: '10px 0 10px 5px' }}>Sign Up</Button>
                </div>
            </form>
        </div>
    );
}