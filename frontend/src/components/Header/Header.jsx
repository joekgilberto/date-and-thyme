import './Header.css'

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FridgeContext } from "../../data";
import * as tools from '../../utilities/tools'
import { getUserToken, clearUserToken, clearUsername } from '../../utilities/auth/auth-token';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Badge from '@mui/material/Badge';


export default function Header() {
  const { handleRefresh, toggle, setFoodItems, setNotifs, Mooli } = useContext(FridgeContext);
  const [notifNum, setNotifNum] = useState(null)
  const [token, setToken] = useState(null)

  async function handleUnread() {
    if (getUserToken()) {
      await tools.unreadNotifs().then((res) => {
        setNotifNum(res)
      })
        .catch((err) => console.log(err))
    }
  }
  
  async function handleSignOut() {
    clearUserToken()
    clearUsername()
    setFoodItems(null)
    setNotifs(null)
    handleRefresh()
  }

  useEffect(() => {
    setToken(getUserToken())
    handleUnread()
  }, [])

  useEffect(() => {
    setToken(getUserToken())
    handleUnread()
  }, [toggle, getUserToken()])


  return (
    <header>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar style={{width: '99%'}}>
            <div className='header-spreader'>
              <div className='header-logo'>
                <img className='thyme' alt='thyme logo' src={require('../../assets/thyme.png')} />
                <Link to="/">
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{ ...Mooli, padding: '20px 0' }}>
                    date & thyme
                  </Typography>
                </Link>
              </div>
              <div className='header-buttons'>
                {token ? (
                  <>
                    <Link to="/fridge">
                      <Button color="inherit" style={{ ...Mooli, fontSize: '20px', margin: '0 5px' }}>fridge</Button>
                    </Link>
                    |
                    <Link to="/fridge/new">
                      <Button color="inherit" style={{ ...Mooli, fontSize: '20px', margin: '0 5px' }}>add groceries</Button>
                    </Link>
                    |
                    <Link to="/feed">
                      <Button color="inherit" style={{ fontSize: '20px', margin: '0 5px' }}>
                        <Badge badgeContent={notifNum} color="error">
                          <KitchenIcon />
                        </Badge>
                      </Button>
                    </Link>
                    <Link onClick={handleSignOut} to="/">
                      <Button style={{ ...Mooli, fontSize: '20px', margin: '0 5px', backgroundColor: '#fff', color: '#1976d2' }}>SIGN OUT</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button style={{ ...Mooli, fontSize: '20px', margin: '0 5px', backgroundColor: '#fff', color: '#1976d2' }}>SIGN IN</Button>
                  </Link>
                )}

              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}