import './Notifications.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'

export default function Notifications() {

    const { notifs, toggle, setToggle } = useContext(FridgeContext);

    async function handleClick(notif){
        await notifServices.updateNotifRead(notif)
        setToggle(!toggle)
        console.log(notifs)
    }

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    return (
        <div className='Fridge'>
            {notifs ? notifs.map((notif, idx) => {
                return (<div key={idx}>
                    <p onClick={()=>handleClick(notif)}>{notif.read?'OLD: ':'NEW: '}</p>
                    <Link to={`/fridge/${notif.food_item}`}>
                        <p>{`Your ${notif.food_item_name} has ${notif.days_left} day(s) left`}</p>
                    </Link>
                    <hr />
                </div>)
            }) : null}
        </div>
    );
}