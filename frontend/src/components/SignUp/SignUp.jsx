import './SignUp.css';

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FridgeContext } from "../../data";
import * as authServices from '../../utilities/auth-services'
import { setUserToken, setUsername } from '../../utilities/local-storage'

import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function SignUp({ handleClick }) {

    const initState = {
        username: "",
        password: "",
        confirmPassword: ""
    }

    const navigate = useNavigate()

    const { handleRefresh } = useContext(FridgeContext);
    const [formData, setFormData] = useState(initState);
    const [signUpError, setSignUpError] = useState(null);
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
        if (formData.password === formData.confirmPassword) {
            delete formData.confirmPassword
            await authServices.signUp(formData).then((res) => {
                setUsername(formData.username)
                setUserToken(res.token)
                handleRefresh()
                setSignUpError(null)
                navigate('/')
            })
                .catch((err) =>{
                    setSignUpError('Sign Up Error: Please retype your credentials and try again.')
                    console.log(err)
                })
        } else {
            setSignUpError('Passwords do not match.')
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
                <label>
                    <div className='password-label'>Password
                        {view ? <VisibilityOffIcon onClick={() => handleViewPassword()} color="disabled" /> : <VisibilityIcon onClick={() => handleViewPassword()} color="disabled" />}
                    </div>
                    <input type={view?'text':'password'} name="password" onChange={handleChange} value={formData.password} required />
                </label>
                <label>Confirm Password
                    <input type={view?'text':'password'} name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />
                </label>
                {signUpError ?
                    <p className="password-error">{signUpError}</p>
                    : null
                }                <div className='auth-buttons'>
                    <Button type='submit' variant='contained' style={{ margin: '10px 5px 10px 0' }}>Submit</Button>
                    <Button size="large" onClick={handleClick} style={{ margin: '10px 0 10px 5px' }}>Sign In</Button>
                </div>
            </form>
        </div>
    );
}