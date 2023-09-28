import './App.css';

import { useEffect, useState } from 'react';
import { FridgeContext } from '../data';
import * as foodItemServices from '../utilities/food-services'
import * as notifServices from '../utilities/notif-services'
import * as tools from '../utilities/tools'

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import { getUserToken } from '../utilities/auth-token';

export default function App() {

  const { Provider: FridgeInfo } = FridgeContext;
  const [foodItems, setFoodItems] = useState(null);
  const [notifs, setNotifs] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [username, setUsername] = useState(null)

  const Mooli = {
    fontFamily: '"Mooli", sans-serif',
    textTransform: 'lowercase'
  }

  const OpenSans = {
    fontFamily: '"Open Sans", sans-serif'
  }



  async function handleRequest() {
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
  }

  useEffect(() => {
    setToggle(true)
  }, [])

  useEffect(() => {
    handleRequest()
    if (getUserToken()) {
      if (foodItems?.length) {
        tools.updateAllDaysLeft(foodItems)
      }
    }
  }, [toggle])

  return (
    <div className='App'>
      <FridgeInfo
        value={{
          foodItems: foodItems,
          setFoodItems: setFoodItems,
          notifs: notifs,
          setNotifs: setNotifs,
          toggle: toggle,
          setToggle: setToggle,
          username: username,
          setUsername: setUsername,
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