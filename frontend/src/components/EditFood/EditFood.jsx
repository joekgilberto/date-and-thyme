import './EditFood.css'

import { useState, useContext } from "react";
import { FridgeContext } from "../../data";
import * as foodItemServices from '../../utilities/food/food-services'
import { getUserToken } from '../../utilities/local-storage';

import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


export default function EditFood({ foodItem }) {

    const { handleRefresh, Mooli } = useContext(FridgeContext);
    const [editFormData, setEditFormData] = useState(foodItem);
    const [show, setShow] = useState(false)

    console.log(foodItem)

    async function handleSubmit(e) {
        e.preventDefault()
        if (getUserToken) {
            setShow(false)
            foodItemServices.updateFoodItem(foodItem.pk, editFormData).then(async() => {
                handleRefresh()
            })
        }
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
                <div className='EditFood'>
                    <Paper style={{ padding: '20px', backgroundColor: '#e5f6fd' }}>
                        <form className="edit-food-form" onSubmit={handleSubmit}>
                            <label>Name
                                <input type="text" name="name" onChange={handleChange} value={editFormData.name} required />
                            </label>
                            <label>Expiration Date
                                <input type="date" name="expiration_date" onChange={handleChange} min={foodItem.purchase_date}  value={editFormData.expiration_date} required />
                            </label>
                            <label>Quantity
                                <input type="number" name="quantity" onChange={handleChange} min="1" value={editFormData.quantity} required />
                            </label>
                            <Button type="submit" style={Mooli} variant="contained">Save</Button>
                            <Button style={Mooli} variant="outlined" onClick={handleClick}>Discard</Button>
                            <ConfirmDelete foodItem={foodItem} />
                        </form>
                    </Paper>
                </div>
            ) :
                <Button style={Mooli} onClick={handleClick} variant="outlined">Edit</Button>
            }
        </div>
    )
}