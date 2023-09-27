import './ShowFood.css';

import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../data";
import * as foodItemServices from '../../utilities/food-services'
import * as notifServices from '../../utilities/notif-services'
import Paper from '@mui/material/Paper';

import EditFood from '../../components/EditFood/EditFood';
import ShowNotif from '../../components/ShowNotif/ShowNotif';

export default function ShowFood() {

  const { toggle, setToggle } = useContext(FridgeContext);
  const [foodItem, setFoodItem] = useState(null)
  const [notif, setNotif] = useState(null)
  const { id } = useParams()

  async function handleRequest() {
    await foodItemServices.getFoodItem(id).then((res) => {
      setFoodItem(res)
    })
      .catch((err) => console.log(err))

    await notifServices.getNotif(id).then((res) => {
      setNotif(res)
    })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    handleRequest()
  }, [])

  useEffect(() => {
    handleRequest()
  }, [toggle])

  return (
    <div className='ShowFood'>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {foodItem && notif ? (
          <>
            <div className='show-food-item'>
              <h2>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h2>
              <p>Bought: {foodItem.purchase_date}</p>
              <p className='show-exp'>Expires: {foodItem.expiration_date}</p>
            </div>
            <EditFood foodItem={foodItem} />
            <div className='show-notif'>
              <ShowNotif notif={notif} foodItem={foodItem} />
            </div>
          </>
        ) : null}
      </Paper>

    </div>
  );
}