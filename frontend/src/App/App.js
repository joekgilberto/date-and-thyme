import './App.css';

import { useEffect, useState } from 'react';
import { FridgeContext } from '../data';
import * as foodItemServices from '../utilities/food-services'
import * as notifServices from '../utilities/notif-services'
import * as tools from '../utilities/tools'
import { getUserToken } from '../utilities/auth-token';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

const Mooli = {
  fontFamily: '"Mooli", sans-serif',
  textTransform: 'lowercase'
}

const OpenSans = {
  fontFamily: '"Open Sans", sans-serif'
}

export default function App() {

  const { Provider: FridgeInfo } = FridgeContext;
  const [foodItems, setFoodItems] = useState(null);
  const [notifs, setNotifs] = useState(null)
  const [toggle, setToggle] = useState(false)

  async function handleRefresh() {
    if (getUserToken()) {

      await foodItemServices.getAllFoodItems().then((res) => {
        setFoodItems(res)
      })
        .catch((err) => console.log(err))

      await notifServices.getAllNotifs().then((res) => {
        setNotifs(res)
      })
        .catch((err) => console.log(err))
    }
    setToggle(!toggle)
  }

  useEffect(() => {
    handleRefresh()
  }, [])

  useEffect(() => {
    handleRefresh()
    if (getUserToken()) {
      if (foodItems?.length) {
        tools.updateAllDaysLeft(foodItems)
      }
    }
  }, [getUserToken()])

  return (
    <div className='App'>
      <FridgeInfo
        value={{
          handleRefresh: handleRefresh,
          toggle,
          foodItems: foodItems,
          setFoodItems: setFoodItems,
          notifs: notifs,
          setNotifs: setNotifs,
          Mooli: Mooli,
          OpenSans: OpenSans
        }}
      >
        <Header />
        <Main />
        <Footer />
      </FridgeInfo>
    </div>
  );
}