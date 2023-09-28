import './Notifications.css';

import { useContext, useEffect } from "react";
import { FridgeContext } from "../../data";
import * as notifServices from '../../utilities/notif-services'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Notif from '../../components/Notif/Notif';
import { getUserToken } from '../../utilities/auth-token';

export default function Notifications() {

    const { notifs, toggle, setToggle } = useContext(FridgeContext);

    async function handleClick(notif) {
        if (getUserToken()) {
            await notifServices.updateNotifRead(notif).then(() => setToggle(!toggle))
        }
    }

    useEffect(() => {
        setToggle(!toggle)
    }, [])

    return (
        <div className='Notifications'>
            <div className='notif-header'>
                <h1>Notifications</h1>
                <h1 className='bell'>🔔</h1>
            </div>
            <Paper>
                <Stack sx={{ width: '100%', padding: '20px' }} spacing={2}>
                    {notifs?.length ? notifs.map((notif, idx) => {
                        return <Notif key={idx} notif={notif} />
                    }) : null}
                </Stack>
            </Paper>
        </div>
    );
}