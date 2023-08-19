import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Modal, Paper } from '@mui/material'
import { toast } from 'react-toastify';
import { useStyles } from './editProfileStyles';
import { useSelector } from 'react-redux';
import { updatedUser } from '../../services/userServices';

const EditProfileModal = ({
    handleOpenUpdateUserModal,
    handleCloseUpdateUserModal,
    loggedUser,
    getUser
}) => {
    const classes = useStyles()
    const { user } = useSelector(state => state.user)
    // console.log(loggedUser, "loggd")
    const [updateUser, setUpdateUser] = useState({
        name: loggedUser ? loggedUser.name : "",
        email: loggedUser ? loggedUser.email : "",
        // password: loggedUser ? loggedUser.password : "",
        image: loggedUser ? loggedUser.image : "",
        address: loggedUser ? loggedUser.address : ""
    })


    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = function (e) {
            setUpdateUser({ ...updateUser, image: reader.result ? reader.result : loggedUser?.image });
        };

        reader.readAsDataURL(file);
    }

    const handleUpdateUser = async () => {
        let res = await updatedUser(loggedUser?._id, updateUser)
        console.log(res,"up")
        if (res?.status) {
            toast.success(res?.message)
            getUser()
            handleCloseUpdateUserModal()
        }
    }

    return (
        <Modal
            open={handleOpenUpdateUserModal}
            onClose={handleCloseUpdateUserModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Paper sx={{ border: "none", display: "flex", justifyContent: "center" }}>
                <Box component="section" className={classes.editProfileModalContainer}>

                    <Typography component="h2" sx={{ fontSize: "1.5em", fontWeight: "bold", textAlign: "center" }}>User Details</Typography>
                    <Box component="section" className={classes.editProfileModalSection} >
                        <TextField defaultValue={loggedUser ? loggedUser.name : ""} size='small' fullWidth id="outlined-basic" label="Name" variant="outlined"
                            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })} />
                        <TextField defaultValue={loggedUser ? loggedUser.email : ""} size='small' fullWidth id="outlined-basic" label="Email" variant="outlined"
                            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} />
                        {/* <TextField defaultValue={loggedUser? loggedUser.password:""} size='small' fullWidth id="outlined-basic" label="Password" variant="outlined" /> */}

                        <TextField type='file' size='small' onChange={(e) => handleUploadImage(e)} fullWidth id="outlined-basic" label="Image" variant="outlined" />
                        <TextField defaultValue={loggedUser ? loggedUser.address : ""} size='medium' fullWidth id="outlined-basic" label="Address" variant="outlined"
                            onChange={(e) => setUpdateUser({ ...updateUser, address: e.target.value })} />

                        <Box component="article" className={classes.editProfileModalSectionBtn} >
                            <Button variant="contained" sx={{ textTransform: "none", fontSize: "1em" }} onClick={handleCloseUpdateUserModal}>Cancel</Button>
                            <Button variant="contained" sx={{ textTransform: "none", fontSize: "1em" }} onClick={handleUpdateUser} color='error'>Update</Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>

        </Modal>
    )
}

export default EditProfileModal