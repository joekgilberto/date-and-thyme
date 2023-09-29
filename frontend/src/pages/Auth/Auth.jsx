import './Auth.css';

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FridgeContext } from "../../data";
import { getUserToken } from '../../utilities/auth/auth-token'

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import Paper from '@mui/material/Paper';

export default function Auth() {

    const { OpenSans } = useContext(FridgeContext);

    const navigate = useNavigate()
    const [signIn, setSignIn] = useState(true)

    useEffect(() => {
        if (getUserToken()) {
            navigate('/')
        }
    }, [])

    function handleClick() {
        setSignIn(!signIn)
    }

    return (
        <div className='Auth'>
            <Paper elevation={3} style={{ ...OpenSans, padding: '20px 30px' }}>

                {signIn ? <SignIn handleClick={handleClick} /> : <SignUp handleClick={handleClick} />}
            </Paper>
        </div>
    );
}