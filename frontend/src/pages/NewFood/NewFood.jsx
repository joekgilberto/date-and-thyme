import './NewFood.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { FridgeContext } from "../../data";
import * as tools from '../../utilities/food-services'

import BackgroundText from '../../components/BackgroundText/BackgroundText';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const initState = {
  name: "",
  expiration_date: "",
  quantity: 1
}

export default function NewFood() {
  const navigate = useNavigate()
  const { toggle, setToggle, Mooli } = useContext(FridgeContext);
  const [formData, setFormData] = useState(initState);

  function handleChange(e) {
    const updatedData = { ...formData, [e.target.name]: e.target.value }
    setFormData(updatedData)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    tools.createFoodItem(formData).then(() => {
      setToggle(!toggle)
      navigate('/fridge')
    })
  };

  return (
    <div className='NewFood'>
      <div className='background-text-comp'>
        <BackgroundText />
      </div>
      <div className='new-food-card'>
        <Paper style={{ padding: '40px 20px', backgroundColor: '' }}>
          <form className="new">
            <h1>Add Groceries 🛒</h1>
            <label>Grocery
              <input type="text" name="name" onChange={handleChange} value={formData.name} required />
            </label>
            <label>Quantity
              <input type="number" name="quantity" onChange={handleChange} min="1" step="1" value={formData.quantity} required />
            </label>
            <label>Expiration Date
              <input type="date" name="expiration_date" onChange={handleChange} value={formData.expiration_date} required />
            </label>
            <Button size="large" variant='contained' style={{ ...Mooli, fontSize: '22px' }} onClick={handleSubmit}>add to fridge</Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}