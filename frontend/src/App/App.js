import './App.css';
import axios from 'axios';

import { useState, useEffect } from 'react';

export default function App() {

  const [foodItems, setFoodItems] = useState(null)

  async function handleFoodItemsRequest() {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/food-items/")
      .then((res) => setFoodItems(res.data))
      .catch((err) => console.log(err));
  };

  async function handleDelete(item) {
    alert("delete" + JSON.stringify(item));
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
    </div>
  );
}