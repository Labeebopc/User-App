import React, { useState } from 'react'
import { useStyles } from './registrationStyles'
import { Box, Typography, TextField, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/logo.png"
import { userRegistration } from '../../services/userServices';
import axios from 'axios';

const Register = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    //Cloudinary 
    const presetKey = process.env.PRESET_KEY;
    const cloudName = process.env.CLOUD_NAME;

    const [newUserDetails, setNewUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
        address: ""
    })

    // const handleUploadImage = (e) => {

    //     const file = e.target.files[0];
    //     const reader = new FileReader();

    //     reader.onloadend = function (e) {
    //         setNewUserDetails({ ...newUserDetails, image: reader.result });
    //     };

    //     reader.readAsDataURL(file);
    // }

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const formData = new FormData()
        formData.append("file", file)

        formData.append("upload_preset", "voly1t6u")
         axios.post(`https://api.cloudinary.com/v1_1/dxg5hfjvr/image/upload`, formData)
            .then(res => setNewUserDetails({ ...newUserDetails, image: res?.data?.secure_url }))

    }

    const handleRegister = async () => {
        if (newUserDetails.name === "" || newUserDetails.email === "" || newUserDetails.password === "") {
            toast.error("Please enter name, email and password")
        }
        else {
            // console.log(newUserDetails)
            let res = await userRegistration(newUserDetails)
            console.log(res)
            if (res?.status) {
                toast.success(res.message)
                navigate("/login")
            }
        }
    }

    return (
        <Box component="section" className={classes.registrationContainer}>
            <Box component="section" className={classes.registrationSection}>
                <Box component="section" className={classes.registrationSectionLogo}>
                    <img className={classes.registrationSectionLogoImg} src={Logo} alt="user_logo" />
                </Box>
                <Box component="form" className={classes.registrationForm}>
                    <Typography sx={{ display: "flex", justifyContent: "center", fontWeight: "bold", marginBottom: "0.5em" }}>CREATE NEW ACCOUNT</Typography>

                    <Box component="article" className={classes.registrationFormRow}>
                        <TextField className={classes.inputs} type='text' id="Name" label="Name" variant="outlined" placeholder='Enter your name'
                            onChange={(e) => setNewUserDetails({ ...newUserDetails, name: e.target.value })} required
                        />
                        <TextField className={classes.inputs} type='email' id="Email" label="Email" variant="outlined" placeholder='Enter your email'
                            onChange={(e) => setNewUserDetails({ ...newUserDetails, email: e.target.value })} required
                        />
                    </Box>

                    <Box component="article" className={classes.registrationFormRow}>
                        <TextField className={classes.inputs} type='password' id="Password" label="Password" variant="outlined" placeholder='Enter your password'
                            onChange={(e) => setNewUserDetails({ ...newUserDetails, password: e.target.value })} required
                        />
                        <TextField className={classes.inputs} type='file' id="Image" label="Image" variant="outlined" placeholder='Upload your image'
                            onChange={(e) => handleUploadImage(e)}
                        />
                    </Box>

                    <Box component="article" className={classes.registrationFormRow}>
                        <TextField fullWidth type='text' id="Address" label="Address" variant="outlined" placeholder='Enter your address'
                            onChange={(e) => setNewUserDetails({ ...newUserDetails, address: e.target.value })}
                        />
                    </Box>
                    <Button variant="contained" sx={{ textTransform: "none", marginTop: "10px" }} className={classes.registerBtn} onClick={handleRegister}>Register</Button>
                </Box>

            </Box>
            <Typography>
                Already have an account ? <span><Link to="/login">Login</Link></span>
            </Typography>
        </Box>
    )
}

export default Register