import './Fridge.css';

import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { FridgeContext } from "../../data";
import { getUsername } from '../../utilities/auth-token';

import FoodItem from '../../components/FoodItem/FoodItem';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
            }) : null}
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