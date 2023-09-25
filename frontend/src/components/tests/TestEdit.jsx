import { useState } from "react"

import axios from 'axios';

export default function TestEdit({ handleFoodItemsRequest, foodItem }) {

    const [editFormData, setEditFormData] = useState(foodItem);
    const [toggle, setToggle] = useState(false)

    async function handleSubmit() {
        setToggle(false)
        // if old post to edit and submit
        axios
            .put(`http://localhost:8000/api/food-items/${foodItem.id}/`, editFormData)
            .then((res) => handleFoodItemsRequest());
    }

    function handleChange(e) {
        const updatedData = { ...editFormData, [e.target.name]: e.target.value }
        setEditFormData(updatedData)
    }

    function handleClick(e){
        setEditFormData(foodItem)
        setToggle(!toggle)

    }

    return (
        <div>
            {toggle?(
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
            ):<button onClick={handleClick}>Edit</button>}
        </div>
    )
}