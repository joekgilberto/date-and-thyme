import './Header.css'

import * as React from 'react';
import { Link } from 'react-router-dom';
import * as tools from '../../utilities/tools'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Badge from '@mui/material/Badge';
import { FridgeContext } from "../../data";
import { getUserToken, clearUserToken } from '../../utilities/auth-token';

const style = {
  width: '95%',
}


export default function Header() {
  const { toggle, setToggle, Mooli } = React.useContext(FridgeContext);
  const [notifNum, setNotifNum] = React.useState(null)
  const [token, setToken] = React.useState(null)

  async function handleUnread() {
    await tools.unreadNotifs().then((res) => {
      setNotifNum(res)
    })
      .catch((err) => console.log(err))
  }

  async function handleSignOut() {
    clearUserToken()
    setToggle(!toggle)
    console.log(getUserToken())
  }
  //TODO update everytime a notification is added, and maybe every time the date changes?  if not just loaded?
  React.useEffect(() => {
    handleUnread()
    setToken(getUserToken())
  }, [])

  React.useEffect(() => {
    handleUnread()
    setToken(getUserToken())
  }, [toggle, getUserToken()])


  return (
    <header>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Toolbar style={style}>
            <div className='header-spreader'>
              <div className='header-logo'>
                <img className='thyme' src={require('../../assets/thyme.png')} />
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
                    <Button color="inherit" style={{ ...Mooli, fontSize: '24px', margin: '0 5px' }}>fridge</Button>
                  </Link>
                  |
                  <Link to="/fridge/new">
                    <Button color="inherit" style={{ ...Mooli, fontSize: '24px', margin: '0 5px' }}>add groceries</Button>
                  </Link>
                  |
                <Link to="/feed">
                  <Button color="inherit" style={{ fontSize: '24px', margin: '0 5px' }}>
                    <Badge badgeContent={notifNum} color="error">
                      <KitchenIcon />
                    </Badge>
                  </Button>
                </Link>
                  <Link onClick={handleSignOut} to="/">
                    <Button style={{ ...Mooli, fontSize: '24px', margin: '0 5px', backgroundColor: '#fff', color: '#1976d2' }}>SIGN OUT</Button>
                  </Link>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button style={{ ...Mooli, fontSize: '24px', margin: '0 5px', backgroundColor: '#fff', color: '#1976d2' }}>SIGN IN</Button>
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