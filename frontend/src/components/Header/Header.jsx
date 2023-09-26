import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FridgeContext } from "../../data";

const style = {
  width: '90%',
}


export default function Header() {
  const { toggle, Mooli } = React.useContext(FridgeContext);

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
                <Button color="inherit" style={Mooli}>notifs</Button>
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