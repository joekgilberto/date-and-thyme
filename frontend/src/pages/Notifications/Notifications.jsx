import './Notifications.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'

export default function Notifications() {

    const { notifs, toggle, setToggle } = useContext(FridgeContext);
    const [notifFoodItems, setNotifFoodItems] = useState(null)

    async function handleRequest(){
        const data = await notifServices.getNotifsFood()
        setNotifFoodItems(data)
    }

    useEffect(() => {
        handleRequest()
        setToggle(!toggle)
    }, [])

    return (
        <div className='Fridge'>
            {notifs && notifFoodItems ? notifs.map((notif, idx) => {
                return (<div key={idx}>
                    <Link to={`/fridge/${notif.food_item}`}>
                        <p>{`Your ${notifFoodItems[idx].name} has ${notif.days_left} day(s) left`}</p>
                    </Link>
                    <hr />
                </div>)
            }) : null}
        </div>
    );
}