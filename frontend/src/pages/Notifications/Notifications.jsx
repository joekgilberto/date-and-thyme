import './Notifications.css';

import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'

export default function Notifications() {

    const { notifs, toggle, setToggle } = useContext(FridgeContext);

    async function handleClick(notif) {
        await notifServices.updateNotifRead(notif).then(() => setToggle(!toggle))
    }

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    return (
        <div className='Fridge'>
            {notifs ? notifs.map((notif, idx) => {
                return (notif.days_left < 4 ?
                    <div key={idx}>
                        <p onClick={() => handleClick(notif)}>{notif.read ? 'READ: ' : 'NEW: '} {notif.days_left > 2 ? 'REMINDER' : notif.days_left > 0 ? 'ALERT' : 'EXPIRED'}</p>
                        <Link to={`/fridge/${notif.food_item}`}>
                            {notif.days_left > 0 ? (
                                <p>Your {notif.food_item_name} has {notif.days_left} day{notif.days_left !== 1 ? 's' : ''} left.</p>
                            ) : (
                                <p>Your {notif.food_item_name} has expired.</p>
                            )}
                        </Link>
                        <hr />
                    </div> : null
                )
            }) : null}
        </div>
    );
}