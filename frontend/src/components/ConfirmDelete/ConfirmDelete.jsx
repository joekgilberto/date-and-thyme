import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FridgeContext } from "../../data";
import * as foodItemServices from '../../utilities/food-services'
import { getUserToken } from '../../utilities/local-storage';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ConfirmDelete({ foodItem }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const { handleRefresh, Mooli, OpenSans } = useContext(FridgeContext);

    async function handleDelete() {
        if (getUserToken()) {
            await foodItemServices.destroyFoodItem(foodItem.pk).then(() => handleRefresh())
            navigate('/fridge')
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant='outlined' style={{ ...Mooli, border: '1px solid #ff0000', color: '#ff0000' }}>Delete</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h4" component="h4" style={OpenSans}>
                            wait!
                        </Typography>
                        <Typography id="transition-modal-title" variant="p" component="p" style={{ ...OpenSans, padding: '20px 0' }}>
                            Are you sure you want to delete your {foodItem.name}?
                        </Typography>
                        <Button size='large' variant='cointained' onClick={handleDelete} style={{ ...Mooli, backgroundColor: '#ff0000', color: "#fff", marginRight: '10px' }}>Delete</Button>
                        <Button size="large" onClick={handleClose} style={Mooli}>Cancel</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}