import './Fridge.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { FridgeContext } from "../../data";

export default function Fridge() {

    const { foodItems, toggle, setToggle } = useContext(FridgeContext);

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    console.log(foodItems)
    return (
        <div className='Fridge'>
            {foodItems ? foodItems.map((foodItem, idx) => {
                return (<div key={idx}>
                    <Link to={`/fridge/${foodItem.pk}`}>
                        <h4>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h4>
                        <p>Expires: {foodItem.expiration_date}</p>
                    </Link>
                    <hr />
                </div>)
            }) : null}
        </div>
    );
}