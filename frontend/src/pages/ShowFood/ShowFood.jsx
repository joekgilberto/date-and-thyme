import './ShowFood.css';

import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../data";
import * as foodItemServices from '../../utilities/food-services'
import * as notifServices from '../../utilities/notif-services'

import EditFood from '../../components/EditFood/EditFood';

export default function ShowFood() {

  const { toggle, setToggle } = useContext(FridgeContext);
  const [foodItem, setFoodItem] = useState(null)
  const [notif, setNotif] = useState(null)
  const { id } = useParams()

  async function handleRequest() {
    await foodItemServices.getFoodItem(id).then((res) => {
      setFoodItem(res)
    })

    await notifServices.getNotif(id).then((res) => {
      setNotif(res)
    })
  }

  useEffect(() => {
    handleRequest()
  }, [])

  useEffect(() => {
    handleRequest()
  }, [toggle])

  return (
    <div className='ShowFood'>
      {foodItem && notif ? (
        <>
          <div className='show-food-item'>
            <h4>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h4>
            <p>Bought: {foodItem.purchase_date}</p>
            <p>Expires: {foodItem.expiration_date}</p>
          </div>
          <EditFood foodItem={foodItem} />
          <div className='show-notification'>
          <p>{foodItem && notif ? `Your ${notif.food_item_name.toLowerCase()} has ${notif.days_left} day(s) left` : null}</p>
          </div>
        </>
      ) : null}

    </div>
  );
}