import './EditFood.css'

import { useContext, useState } from "react";
import { FridgeContext } from "../../data";
import * as foodItemServices from '../../utilities/food-services'

import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';

export default function EditFood({ foodItem }) {

    const [editFormData, setEditFormData] = useState(foodItem);
    const [show, setShow] = useState(false)
    const { toggle, setToggle } = useContext(FridgeContext);

    async function handleSubmit(e) {
        e.preventDefault()
        setShow(false)
        // if old post to edit and submit
        foodItemServices.updateFoodItem(foodItem.pk, editFormData).then(()=> setToggle(!toggle))
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
                        <button type="submit">Save Changes</button>
                        <button onClick={handleClick}>Discard Changes</button>
                    </form>
                    <ConfirmDelete foodItem={foodItem} />
                </>
            ) : <button onClick={handleClick}>Edit</button>}
        </div>
    )
}