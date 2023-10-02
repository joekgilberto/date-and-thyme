import './Notif.css'

import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'
import { getUserToken } from '../../utilities/local-storage';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Notif({ notif }) {

    const { handleRefresh } = useContext(FridgeContext);

    async function handleClick(notif) {
        if (getUserToken()) {
            await notifServices.updateNotifRead(notif).then(() => handleRefresh())
        }
    }

    return (
        <div className='Notif'>
            <Alert onClick={() => handleClick(notif)} style={{ fontSize: '16px' }} severity={notif.read ? "info" : notif.days_left > 0 ? "warning" : "error"}>
                <AlertTitle>{notif.days_left > 2 ? "REMINDER" : notif.days_left <= 2 && notif.days_left > 0 ? "WARNING" : "EXPIRED"}</AlertTitle>
                <Link to={`/fridge/${notif.food_item}`}>
                    {notif.days_left > 0 ? (
                        <p>Your {notif.food_item_name} has {notif.days_left} day{notif.days_left !== 1 ? 's' : ''} left.</p>
                    ) : (
                        <p>Your {notif.food_item_name} has expired.</p>
                    )}
                </Link>
            </Alert>
        </div>
    );
}