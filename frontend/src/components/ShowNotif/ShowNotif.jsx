import './ShowNotif.css'

import { useContext } from 'react';
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'
import { getUserToken } from '../../utilities/auth-token';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function ShowNotif({ notif, foodItem }) {

    const { toggle, setToggle } = useContext(FridgeContext);

    async function handleClick(notif) {
        if (getUserToken()) {
            await notifServices.updateNotifRead(notif).then(() => setToggle(!toggle))
        }
    }

    return (
        <div className='ShowNotif'>
            <Alert onClick={() => handleClick(notif)} style={{ fontSize: '16px' }} severity={notif.days_left > 2 ? "info" : notif.days_left <= 2 && notif.days_left > 0 ? "warning" : "error"}>
                <AlertTitle>{notif.days_left > 2 ? "REMINDER" : notif.days_left <= 2 && notif.days_left > 0 ? "WARNING" : "ERROR"}</AlertTitle>
                {notif.days_left > 0 ? (
                    <p>Your {notif.food_item_name} has {notif.days_left} day{notif.days_left !== 1 ? 's' : ''} left.</p>
                ) : (
                    <p>Your {notif.food_item_name} expired on {foodItem.expiration_date}.</p>
                )}
            </Alert>
        </div>
    );
}