import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FridgeContext } from "../../data";

export default function HomeCard() {

    const { Mooli, OpenSans } = React.useContext(FridgeContext);

    return (
        <Card sx={{ minWidth: '100%' }} style={{...OpenSans,padding: '0px'}}>
            <CardContent sx={{ minWidth: '100%' }}>
                <Typography variant="h4" component="div" style={Mooli}>
                    Welcome! 🧑‍🍳
                </Typography>
                <Typography sx={{ mb: 1.5 }} variant="h5" style={{color:'#1976d2'}}>
                    to <span style={Mooli}>date & thyme</span>
                </Typography>
                <Typography variant="body" style={{...OpenSans, fontSize:'18px'}}>
                Your ultimate solution for managing your kitchen's inventory and ensuring that nothing goes to waste. We understand that keeping track of the food in your fridge can be a challenging task, often resulting in forgotten items that go bad. That's why we've created a user-friendly and efficient platform that helps you effortlessly monitor the contents of your refrigerator, pantry, and more. With <span className='d-t'>date & thyme</span>, you can bid farewell to food waste and say hello to a more organized and eco-conscious way of managing your kitchen. Say goodbye to spoiled surprises and hello to a smarter, more sustainable way of cooking and eating.
                </Typography>
            </CardContent>
            <CardActions>
                <Link to='/auth'>
                    <Button size="large" style={{...Mooli, fontSize:'20px'}}>Sign In</Button>
                </Link>
            </CardActions>
        </Card>
    );
}