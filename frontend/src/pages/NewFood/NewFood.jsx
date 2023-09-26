import './NewFood.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as tools from '../../utilities/food-services'

const initState = {
  name: "",
  expiration_date: "",
  quantity: 1
}

export default function NewFood() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initState);

  function handleChange(e) {
    const updatedData = { ...formData, [e.target.name]: e.target.value }
    setFormData(updatedData)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    tools.createFoodItem(formData)
    setFormData(initState)

    navigate('/fridge')
  };

  return (
    <div className='NewFood'>
      <h2>Add Groceries</h2>
      <form className="new" onSubmit={handleSubmit}>
        <label>Grocery
          <input type="text" name="name" onChange={handleChange} value={formData.name} required />
        </label>
        <label>Quantity
          <input type="number" name="quantity" onChange={handleChange} min="1" step="1" value={formData.quantity} required />
        </label>
        <label>Expiration Date
          <input type="date" name="expiration_date" onChange={handleChange} value={formData.expiration_date} required />
        </label>
        <button type="submit">Add to Fridge</button>
      </form>
    </div>
  );
}