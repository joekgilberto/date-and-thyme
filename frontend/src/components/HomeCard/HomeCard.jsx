import * as React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FridgeContext } from "../../data";
import { getUserToken, getUsername } from '../../utilities/auth-token';

export default function HomeCard() {
    const [token, setToken] = React.useState(null)
    const { Mooli, OpenSans, toggle } = React.useContext(FridgeContext);

    React.useEffect(() => {
        setToken(getUserToken())
    }, [])

    React.useEffect(() => {
        setToken(getUserToken())
    }, [toggle, getUserToken()])

    return (
        <Paper elevation={3} style={{ ...OpenSans, minWidth: '100%', padding: '20px 30px' }}>
            <h1>{getUsername()?`Welcome, ${getUsername()}! 🧑‍🍳`:'Welcome! 🧑‍🍳'}</h1>
            <p style={{ fontSize: '20px' }}><span className='d-t'>date & thyme</span> is your ultimate solution for managing your kitchen's inventory and ensuring that nothing goes to waste. We understand that keeping track of the food in your fridge can be a challenging task, often resulting in forgotten items that go bad. That's why we've created a user-friendly and efficient platform that helps you effortlessly monitor the contents of your refrigerator, pantry, and more. With <span className='d-t'>date & thyme</span>, you can bid farewell to food waste and say hello to a more organized and eco-conscious way of managing your kitchen. Say goodbye to spoiled surprises and hello to a smarter, more sustainable way of cooking and eating.</p>
            {!token ? (
                <Link to='/auth'>
                    <Button size="large" variant='contained' style={{ ...Mooli, fontSize: '22px', margin: '20px 0' }}>Sign In</Button>
                </Link>
            ) : null}
        </Paper>
    );
}