import './App.css';
import axios from 'axios';

import { useState, useEffect } from 'react';

const initState = {
  name: "",
  expiration_date: "",
  quantity: 1
}

export default function App() {

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

  async function handleSubmit(e){
    e.preventDefault()
    // if new post to submit
    axios
      .post("http://localhost:8000/api/food-items/", formData)
      .then((res) => handleFoodItemsRequest());
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
      <h1>Date & Thyme</h1>
      {foodItems ? foodItems.map((foodItem, idx) => {
        return (<div key={idx}>
          <p>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</p>
          <p>{foodItem.purchase_date}</p>
          <p>{foodItem.expiration_date}</p>
          <p onClick={() => handleDelete(foodItem)}>X</p>
          <hr />
        </div>
        )
      }) : null}
      <form className="new" onSubmit={handleSubmit}>
            <label>Name
              <input type="text" name="name" onChange={handleChange} required />
            </label>
            <label>Expiration Date
              <input type="date" name="expiration_date" onChange={handleChange} required />
            </label>
            <label>Quantity
              <input type="number" name="quantity" onChange={handleChange} min="1" defaultValue={1} required />
            </label>
            <button type="submit">Add</button>
          </form>
    </div>
  );
}