import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useStyles } from './loginStyles'
import { toast } from 'react-toastify'
import Cookies from "js-cookie";
import { userLogin } from '../../services/userServices'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/reducers/userSlice'

const Login = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loginDetails, setLoginDetails] = useState({ email: "", password: "" })

    const handleLogin = async () => {
        if (loginDetails.email === "" || loginDetails.password === "") {
            toast.error("Please enter email and password!")
        }
        else {
            let res = await userLogin(loginDetails)
            if (res?.status) {
                dispatch(setUser(res))
                Cookies.set("user", JSON.stringify(res));

                await navigate("/dashboard")
            }
            else toast.error(res)
        }

    }

    return (
        <>
            <Box component="section" className={classes.loginContainer} >
                <Box component="section" className={classes.loginSection}>
                    <Box component="section" className={classes.loginSectionLogo}>
                        <img className={classes.loginSectionLogoImg} src={Logo} alt="user_logo" />
                    </Box>

                    <Box component="form" className={classes.loginSectionInputs}>
                        <Typography sx={{ display: "flex", justifyContent: "center", fontWeight: "bold" }}>LOGIN</Typography>
                        <TextField type='email' id="Email" label="Email" variant="outlined" placeholder='Enter your email'
                            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} required />
                        <TextField type='password' id="Password" label="Password" variant="outlined" placeholder='Enter your password'
                            onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} required />
                        <Button variant="contained" onClick={handleLogin} sx={{ textTransform: "none" }} className={classes.loginSectionInputsBtn}>Login</Button>
                    </Box>
                </Box>
                <Typography>
                    Dont't have an account ? <span><Link to="/register">Register</Link></span>
                </Typography>
            </Box>
        </>
    )
}

export default Login