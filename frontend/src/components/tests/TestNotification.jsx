import { useState, useEffect } from "react"

import axios from 'axios';

export default function TestNotification({ notification }) {

    const [foodItem, setFoodItem] = useState(null);

    async function handleRequest() {
        axios
            .get(`http://localhost:8000/api/food-items/${notification.food_item}/`)
            .then((res) => setFoodItem(res.data));
    }

    useEffect(()=>{
        handleRequest()
    },[notification])

    return <p>{foodItem ? `Your ${foodItem.name.toLowerCase()} has ${notification.days_left} day(s) left` : null}</p>
}