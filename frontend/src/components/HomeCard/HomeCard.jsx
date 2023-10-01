import "./HomeCard.css"
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FridgeContext } from "../../data";
import { getUserToken, getUsername } from '../../utilities/local-storage';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function HomeCard() {
    
    const { Mooli, OpenSans, toggle } = useContext(FridgeContext);
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        setToken(getUserToken())
        setUsername(getUsername())
    }, [])

    useEffect(() => {
        setToken(getUserToken())
    }, [toggle, getUserToken()])

    return (
        <Paper elevation={3} style={{ ...OpenSans, width: '90%', padding: '20px 30px' }}>
            <div className='home-header'>
                <h1>{username ? `Welcome, ${username}!` : 'Welcome!'} 🧑‍🍳</h1>
            </div>
            <p style={{ fontSize: '20px' }}><span className='d-t'>date & thyme</span> is your ultimate solution for managing your kitchen's inventory and ensuring that nothing goes to waste. We understand that keeping track of the food in your fridge can be a challenging task, often resulting in forgotten items that go bad. That's why we've created a user-friendly and efficient platform that helps you effortlessly monitor the contents of your refrigerator, pantry, and more. With <span className='d-t'>date & thyme</span>, you can say goodbye to spoiled surprises and hello to a smarter, more sustainable way of cooking and eating.</p>
            {!token ? (
                <Link to='/auth'>
                    <Button size="large" variant='contained' style={{ ...Mooli, fontSize: '22px', margin: '20px 0' }}>Sign In</Button>
                </Link>
            ) : null}
        </Paper>
    );
}