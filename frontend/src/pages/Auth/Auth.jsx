import './Auth.css';

import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserToken } from '../../utilities/auth-token'

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';

export default function Auth() {
    const initState = {
        username: "",
        password: "",
    }

    const navigate = useNavigate()
    const [signIn, setSignIn] = useState(true)

    useEffect(()=>{
        if(getUserToken()){
            navigate('/')
        }
    },[])

    function handleClick(){
        setSignIn(!signIn)
    }

    return (
        <div className='Auth'>
            {signIn?<SignIn initState={initState} />:<SignUp initState={initState} />}
            {signIn?<button onClick={handleClick}>Sign Up</button>:<button onClick={handleClick}>Sign In</button>}
        </div>
    );
}