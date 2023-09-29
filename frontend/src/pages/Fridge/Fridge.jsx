import './Fridge.css';

import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { FridgeContext } from "../../data";
import { getUsername } from '../../utilities/auth/auth-token';

import FoodItem from '../../components/FoodItem/FoodItem';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';

export default function Fridge() {

    const { handleRefresh, foodItems } = useContext(FridgeContext);
    const [username, setUsername] = useState(null)

    useEffect(() => {
        handleRefresh()
        setUsername(getUsername())
    }, [])

    return (
        <div className='Fridge'>
            <h1>{username ? `${username}'s Fridge` : 'Fridge'} 🧊</h1>
            {foodItems?.length ? foodItems.map((foodItem, idx) => {
                return (
                    <FoodItem key={idx} foodItem={foodItem} />
                )
            }) : (
                <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
                    <h2>No groceries yet, get shopping!</h2>
                </Paper>
            )}
            <div className='add-button'>
                <Link to="/fridge/new">
                    <Fab size="medium" color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </div>
        </div>
    );
}