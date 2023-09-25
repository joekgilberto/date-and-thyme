import axios from 'axios';

import { useState, useEffect } from 'react';

import TestEdit from '../../components/tests/TestEdit';
import TestNotification from '../../components/tests/TestNotification';

const initState = {
  name: "",
  expiration_date: "",
  quantity: 1
}

export default function TestApp() {

  const [foodItems, setFoodItems] = useState(null)
  const [notifications, setNotificaitions] = useState(null)
  const [formData, setFormData] = useState(initState);

  async function handleFoodItemsRequest() {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/food-items/")
      .then((res) => setFoodItems(res.data))
      .catch((err) => console.log(err));
  };

  async function handleNotificationsRequest() {
    axios   //Axios to send and receive HTTP requests
      .get("http://localhost:8000/api/notifications/")
      .then((res) => setNotificaitions(res.data))
      .catch((err) => console.log(err));
  };

  function handleBoth(){
    handleFoodItemsRequest()
    handleNotificationsRequest()
  }

  function handleChange(e) {
    const updatedData = { ...formData, [e.target.name]: e.target.value }
    setFormData(updatedData)
  }

  async function handleNewNotification(data) {
    const expire = new Date(data.expiration_date)
    const bought = new Date(data.purchase_date)
    let daysLeft = Math.abs(expire - bought)
    daysLeft = daysLeft / (1000 * 3600 * 24)
    console.log(daysLeft)
    const newNotification = { food_item: data.pk, days_left: daysLeft }

    axios
      .post("http://localhost:8000/api/notifications/", newNotification)
      .then((res) => handleBoth())
      .catch((err) => console.log(err));
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // if new post to submit
    axios
      .post("http://localhost:8000/api/food-items/", formData)
      .then((res) => handleNewNotification(res.data));

    setFormData(initState)
  };

  async function handleDelete(item) {
    axios
      .delete(`http://localhost:8000/api/food-items/${item.pk}/`)
      .then((res) => handleBoth());
  };


  useEffect(() => {
    handleBoth()
  }, [])

  return (
    <div className="App">
      <h1>date & thyme</h1>
      <h2>Fridge</h2>
      {foodItems ? foodItems.map((foodItem, idx) => {
        return (<div key={idx}>
          <h4>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h4>
          <p>Bought: {foodItem.purchase_date}</p>
          <p>Expires: {foodItem.expiration_date}</p>
          <TestEdit handleFoodItemsRequest={handleFoodItemsRequest} foodItem={foodItem} />
          <button onClick={() => handleDelete(foodItem)}>Delete</button>
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
      <div>
        <h2>Notifications</h2>
        {notifications ? notifications.map((notification, idx) => {
          return (<TestNotification key={idx} notification={notification} />)
        }) : null}
      </div>
    </div>
  );
}