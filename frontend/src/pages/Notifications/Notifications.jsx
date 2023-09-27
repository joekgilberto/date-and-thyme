import './Notifications.css';

import { useContext, useEffect } from "react";
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Notif from '../../components/Notif/Notif';

export default function Notifications() {

    const { notifs, toggle, setToggle } = useContext(FridgeContext);

    async function handleClick(notif) {
        await notifServices.updateNotifRead(notif).then(() => setToggle(!toggle))
    }

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    return (
        <div className='Notifications'>
            <h1>Notifications 🔔</h1>
            <Paper>
                <Stack sx={{ width: '100%', padding:'20px' }} spacing={2}>
                    {notifs?.length ? notifs.map((notif, idx) => {
                        return <Notif notif={notif} />
                    }) : null}
                </Stack>
            </Paper>
        </div>
    );
}