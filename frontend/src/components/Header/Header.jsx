import './Header.css';

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import * as tools from '../../utilities/tools'

export default function Header() {

  const [notifNum,setNotifNum] = useState(null)

  async function handleNotifications(){
    await tools.unreadNotifs().then((res)=>{
      setNotifNum(res)
    })
  }
  //TODO update everytime a notification is added, and maybe every time the date changes?  if not just loaded?
  useEffect(()=>{
    handleNotifications()
  },[])



  return (
    <header>
      <Link to="/">
        <h1>Date & Thyme</h1>
      </Link>
      <nav>
        <Link to="/fridge">
          <h2>fridge</h2>
        </Link>
        <Link to="/fridge/new">
          <h2>add groceries</h2>
        </Link>
        <Link to="/notifications">
          <h2>notifs{notifNum?` (${notifNum})`:null}</h2>
        </Link>
        <Link to="/test">
          <h2>Tests</h2>
        </Link>
      </nav>
    </header>
  );
}