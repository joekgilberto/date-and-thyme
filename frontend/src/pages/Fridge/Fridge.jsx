import './Fridge.css';

import { useContext, useEffect } from "react";
import { FridgeContext } from "../../data";

import FoodItem from '../../components/FoodItem/FoodItem';

export default function Fridge() {

    const { foodItems, toggle, setToggle } = useContext(FridgeContext);

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    return (
        <div className='Fridge'>
            <h1>Fridge 🧊</h1>
            {foodItems?.length ? foodItems.map((foodItem, idx) => {
                return (
                    <FoodItem key={idx} foodItem={foodItem} />
            )}) : null}
        </div>
    );
}