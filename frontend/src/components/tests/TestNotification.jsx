import { useState, useEffect } from "react"

import axios from 'axios';

export default function TestNotification({ notification,handleBoth }) {

    const [foodItem, setFoodItem] = useState(null);

    async function handleRequest() {
        axios
            .get(`http://localhost:8000/api/food-items/${notification.food_item}/`)
            .then((res) => setFoodItem(res.data))
            .catch((err)=>console.log(err));
    }

    async function handleClick(){
        const updatedNotification = { ...notification, read: !notification.read }
        axios
            .put(`http://localhost:8000/api/notifications/${notification.food_item}/`, updatedNotification)
            .then((res) => {
                handleBoth()})
            .catch((err) => console.log(err));
    }

    useEffect(()=>{
        handleRequest()
    },[notification])

    return <p><span onClick={handleClick}>{notification.read?'OLD: ':'NEW: '}</span>{foodItem ? `Your ${foodItem.name.toLowerCase()} has ${notification.days_left} day(s) left` : null}</p>
}