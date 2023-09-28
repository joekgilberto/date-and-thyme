import { useState } from "react"

import axios from 'axios';

export default function TestEdit({ handleBoth, foodItem }) {

    const [editFormData, setEditFormData] = useState(foodItem);
    const [show, setShow] = useState(false)

    async function handleFindNotification(foodItem) {
        axios
            .get(`http://localhost:8000/api/notifications/?food=${foodItem.pk}`, { header: { 'Content-Type': 'application/json' } })
            .then((res) => handleUpdateNotification(foodItem,res.data[0]))
            .catch((error) => console.log(error));
    }

    async function handleUpdateNotification(foodItem,notification) {
        const expire = new Date(foodItem.expiration_date)
        const bought = new Date()
        let daysLeft = Math.abs(expire - bought)
        daysLeft = Math.ceil(daysLeft / (1000 * 3600 * 24))
        const updatedNotification = { ...notification, days_left: daysLeft }

        axios
            .put(`http://localhost:8000/api/notifications/${notification.food_item}/`, updatedNotification)
            .then((res) => handleBoth())
            .catch((err) => console.log(err));
    }

    async function handleSubmit() {
        setShow(false)
        // if old post to edit and submit
        axios
            .put(`http://localhost:8000/api/food-items/${foodItem.pk}/`, editFormData)
            .then((res) => { handleFindNotification(res.data) })
            .catch((err)=>console.log(err));
    }

    function handleChange(e) {
        const updatedData = { ...editFormData, [e.target.name]: e.target.value }
        setEditFormData(updatedData)
    }

    function handleClick(e) {
        setEditFormData(foodItem)
        setShow(!show)

    }

    return (
        <div>
            {show ? (
                <>
                    <form className="new" onSubmit={handleSubmit}>
                        <label>Name
                            <input type="text" name="name" onChange={handleChange} value={editFormData.name} required />
                        </label>
                        <label>Expiration Date
                            <input type="date" name="expiration_date" onChange={handleChange} value={editFormData.expiration_date} required />
                        </label>
                        <label>Quantity
                            <input type="number" name="quantity" onChange={handleChange} min="1" value={editFormData.quantity} required />
                        </label>
                        <button type="submit">Save</button>
                        <button onClick={handleClick}>Discard Changes</button>
                    </form>
                </>
            ) : <button onClick={handleClick}>Edit</button>}
        </div>
    )
}