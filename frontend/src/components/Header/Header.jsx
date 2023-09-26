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

const style = {
  width: '90%',
}


export default function Header() {
  const { toggle, Mooli } = React.useContext(FridgeContext);
  const [notifNum, setNotifNum] = React.useState(null)

  async function handleUnread() {
    await tools.unreadNotifs().then((res) => {
      setNotifNum(res)
    })
  }
  //TODO update everytime a notification is added, and maybe every time the date changes?  if not just loaded?
  React.useEffect(() => {
    handleUnread()
  }, [])

  React.useEffect(() => {
    handleUnread()
  }, [toggle])
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar style={style}>
          <div className='header-spreader'>
            <div className='header-logo'>
              <img className='thyme' src={require('../../assets/thyme.png')} />
              <Link to="/">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={Mooli}>
                  date & thyme
                </Typography>
              </Link>
            </div>
            <div className='header-buttons'>
              <Link to="/fridge">
                <Button color="inherit" style={Mooli}>fridge</Button>
              </Link>
              <Link to="/fridge/new">
                <Button color="inherit" style={Mooli}>add groceries</Button>
              </Link>
              <Link to="/feed">
                <Button color="inherit">
                  <Badge badgeContent={notifNum} color="error">
                    <KitchenIcon />
                  </Badge>
                </Button>
              </Link>
              <Link to="/test">
                <Button color="inherit" style={Mooli}>test</Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}