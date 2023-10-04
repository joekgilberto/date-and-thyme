import './Error.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FridgeContext } from "../../data";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Error() {
  const { Mooli, OpenSans } = useContext(FridgeContext);

  return (
    <div className='Error'>
      <Paper elevation={3} style={{ ...OpenSans, width: '50%', padding: '20px 30px' }}>
        <h1>Error 404 - Page Not Found</h1>
        <Link to="/">
          <Button variant='contained' style={{ ...Mooli }}>Return Home</Button>
        </Link>
      </Paper>
    </div>
  );
}