import axios from 'axios';

import { useState, useEffect } from 'react';

import TestEdit from '../../components/tests/TestEdit';

const initState = {
  name: "",
  expiration_date: "",
  quantity: 1
}

export default function TestApp() {

    const [foodItems, setFoodItems] = useState(null)
    const [formData, setFormData] = useState(initState);
  
    async function handleFoodItemsRequest() {
      axios   //Axios to send and receive HTTP requests
        .get("http://localhost:8000/api/food-items/")
        .then((res) => setFoodItems(res.data))
        .catch((err) => console.log(err));
    };
  
    function handleChange(e) {
      const updatedData = { ...formData, [e.target.name]: e.target.value }
      setFormData(updatedData)
    }
  
    async function handleSubmit(e) {
      e.preventDefault()
      // if new post to submit
      axios
        .post("http://localhost:8000/api/food-items/", formData)
        .then((res) => handleFoodItemsRequest());
      
      setFormData(initState)
    };
  
    async function handleDelete(item) {
      axios
        .delete(`http://localhost:8000/api/food-items/${item.id}/`)
        .then((res) => handleFoodItemsRequest());
    };
  
  
    useEffect(() => {
      handleFoodItemsRequest()
      console.log(foodItems)
    }, [])
  
    return (
      <div className="App">
        <h1>date & thyme</h1>
        {foodItems ? foodItems.map((foodItem, idx) => {
          return (<div key={idx}>
            <h4>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h4>
            <p>{foodItem.purchase_date}</p>
            <p>{foodItem.expiration_date}</p>
            <button onClick={() => handleDelete(foodItem)}>Delete</button>
            <TestEdit handleFoodItemsRequest={handleFoodItemsRequest} foodItem={foodItem} />
            <hr />
          </div>
          )
        }) : null}
        <form className="new" onSubmit={handleSubmit}>
          <label>Name
            <input type="text" name="name" onChange={handleChange} value={formData.name} required />
          </label>
          <label>Expiration Date
            <input type="date" name="expiration_date" onChange={handleChange} value={formData.expiration_date} required />
          </label>
          <label>Quantity
            <input type="number" name="quantity" onChange={handleChange} min="1" step="1" value={formData.quantity} required />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }