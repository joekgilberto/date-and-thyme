import './FoodItem.css'

import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function FoodItem({ foodItem }) {

    return (
        <Paper elevation={3} style={{ margin: '20px', padding: '20px' }}>
            <Link to={`/fridge/${foodItem.pk}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{foodItem.name} {foodItem.quantity > 1 ? `(${foodItem.quantity})` : null}</h3>
                <div className='exp-info'>
                    <p>Expires: {foodItem.expiration_date}</p>
                    <InfoOutlinedIcon color="action" />
                </div>
            </Link>
        </Paper>
    );
}