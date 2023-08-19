import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useStyles } from './dashboardStyles'
import EditProfileModal from '../edit-profile-modal/EditProfileModal'
import Logo from "../../assets/logo.png"
import { deleteUser, getLoggedUser } from '../../services/userServices'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
import { setUser } from '../../store/reducers/userSlice'


const Dashboard = () => {
    const classes = useStyles()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loggedUser, setLoggedUser] = useState(null)

    const [updateUserBtn, setUpdateUserBtn] = useState(false)
    const handleOpenUpdateUserModal = () => setUpdateUserBtn(true);
    const handleCloseUpdateUserModal = () => setUpdateUserBtn(false);

    const handleUpdateUserBtn = () => {
        handleOpenUpdateUserModal()
    }
    console.log(loggedUser)
    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        let res = await getLoggedUser(user.existingUser.id)
        // console.log(res?.existingUser, "user")
        setLoggedUser(res?.existingUser)
    }

    const handleLogout = () => {
        Cookies.set("user", "");
        dispatch(setUser(""));
        toast.success("Successfully logged out")
        navigate("/login");
    }

    const handleDeleteUser = async () => {
        let res = await deleteUser(user.existingUser.id, user.token)
        if (res?.status) {
            toast.success(res?.message)
            navigate("/login")
        }
    }


    return (
        <Box component="section" className={classes.dashboardContainer}>
            {
                updateUserBtn &&
                <EditProfileModal
                    handleOpenUpdateUserModal={handleOpenUpdateUserModal}
                    handleCloseUpdateUserModal={handleCloseUpdateUserModal}
                    loggedUser={loggedUser}
                    getUser={getUser}
                />
            }
            <Typography sx={{ textAlign: "center", fontWeight: "bold", marginTop: "2em", fontSize: "1.5em" }}>Hello {`${loggedUser?.name}`}, Welcome to Dashboard </Typography>
            <Box component="section" className={classes.userImageSection} >
                <img className={classes.userImg} src={loggedUser?.image} alt="user_logo" />

            </Box>
            <Box component="section" className={classes.dashboardActions}>
                <Button variant="contained" sx={{ textTransform: "none", fontSize: "1em" }} onClick={() => handleUpdateUserBtn()}>Update User</Button>
                <Button variant="contained" sx={{ textTransform: "none", fontSize: "1em", background: "red", '&:hover': { backgroundColor: 'red' } }}
                    onClick={handleDeleteUser}>Delete User</Button>
            </Box>

            <Box component="section" className={classes.dashboardLogout}>
                <Button variant="outlined" onClick={handleLogout} sx={{ textTransform: "none", fontSize: "1em" }} color='error'>Logout</Button>
            </Box>
        </Box>
    )
}

export default Dashboard