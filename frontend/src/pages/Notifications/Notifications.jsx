import './Notifications.css';

import { useState, useContext, useEffect } from "react";
import { FridgeContext } from "../../data";
import * as tools from '../../utilities/tools'

import Notif from '../../components/Notif/Notif';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export default function Notifications() {

    const { handleRefresh, notifs } = useContext(FridgeContext);
    const [inactive, setInactive] = useState(null)

    async function handleInactive(){
        await tools.activeNotifs().then((res)=>{
            setInactive(res)
        })
    }

    useEffect(() => {
        handleRefresh()
        handleInactive()
    }, [])

    return (
        <div className='Notifications'>
            <div className='notif-header'>
                <h1>Notifications</h1>
                <h1 className='bell'>🔔</h1>
            </div>
            <Paper>
                <Stack sx={{ width: '100%', padding: '20px' }} spacing={2}>
                    {notifs?.length ? (
                        <>
                        {notifs.map((notif, idx) => {
                            return (notif.days_left <= 5 ? <Notif key={idx} notif={notif} /> : null)
                        })}
                        {inactive?<h2>no notifiactions</h2>:null}
                        </>
                    ) : (
                        <h2>no notifiactions</h2>
                    )}
                </Stack>
            </Paper>
        </div>
    );
}