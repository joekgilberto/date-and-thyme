import './App.css';

import { useEffect, useState } from 'react';
import { FridgeContext } from '../data';
import * as foodItemServices from '../utilities/food-services'
import * as notifServices from '../utilities/notif-services'
import * as tools from '../utilities/tools'

import Header from '../components/Header/Header';
import Header2 from '../components/Header/Header2';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';

export default function App() {

  const { Provider: FridgeInfo } = FridgeContext;
  const [foodItems, setFoodItems] = useState(null);
  const [notifs, setNotifs] = useState(null)
  const [toggle, setToggle] = useState(false)

  const Mooli ={
    fontFamily: '"Mooli", sans-serif',
    textTransform: 'lowercase'
  }

  const OpenSans ={
    fontFamily: '"Open Sans", sans-serif'
  }

  

  async function handleRequest() {
    await foodItemServices.getAllFoodItems().then((res) => {
      setFoodItems(res)
    })
    await notifServices.getAllNotifs().then((res) => {
      setNotifs(res)
    })
  }

  useEffect(() => {
    setToggle(true)
  }, [])

  useEffect(() => {
    handleRequest()
    if (foodItems){
      tools.updateAllDaysLeft(foodItems)
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