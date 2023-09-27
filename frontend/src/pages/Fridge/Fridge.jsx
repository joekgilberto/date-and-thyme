import './Fridge.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { FridgeContext } from "../../data";

import Paper from '@mui/material/Paper';

export default function Fridge() {

    const { foodItems, toggle, setToggle } = useContext(FridgeContext);

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    console.log(foodItems)
    return (
        <div className='Fridge'>
            <h1>Fridge</h1>
            {foodItems ? foodItems.map((foodItem, idx) => {
                return (
                    <Paper elevation={3} key={idx} style={{ margin:'20px',padding: '20px'}}>
                        <Link to={`/fridge/${foodItem.pk}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h3>
                            <p>Expires: {foodItem.expiration_date}</p>
                        </Link>
                    </Paper>
            )}) : null}
        </div>
    );
}