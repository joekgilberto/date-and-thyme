import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as foodItemServices from '../../utilities/food-services'
import { FridgeContext } from "../../data";

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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ConfirmDelete({ foodItem }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const { toggle, setToggle, Mooli, OpenSans } = React.useContext(FridgeContext);

    const textStyle = {
        ...Mooli,
        color: '#ff0000'
    }

    async function handleDelete() {
        await foodItemServices.destroyFoodItem(foodItem.pk).then(() => setToggle(!toggle))
        navigate('/fridge')
    }

    return (
        <div>
            <Button onClick={handleOpen} style={textStyle}>Delete</Button>
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
                        <Typography id="transition-modal-title" variant="h6" component="h2" style={OpenSans}>
                            wait!
                        </Typography>
                        <Typography id="transition-modal-title" variant="p" component="p" style={OpenSans}>
                            Are you sure you want to delete your {foodItem.name}?
                        </Typography>
                        <Button onClick={handleDelete} style={textStyle}>Delete</Button>
                        <Button onClick={handleClose} style={Mooli}>Cancel</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}