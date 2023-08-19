const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../helpers/jwt-token.js");
const User = require("../models/userModel.js");

//@disc User Registration
//@api POST /user_registration
//@access Public
exports.userRegistration = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {

            return res.status(400).json({ status: false, message: "User already exists" });
        }
        if (!existingUser) {

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({ ...req.body, password: hashedPassword });

            return res.status(201).json({ status: true, user, message: "Account successfully created" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
});

//@disc User Login
//@api POST /user_login
//@access Public
exports.userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {

        res.status(400).json({ status: false, message: "Please provide email and password" });
    }

    try {
        const existingUser = await User.findOne({ email }).select("+password");

        if (!existingUser) {

            return res.status(404).json({ status: false, message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(404).json({ status: false, message: "Invalid credentials" });
        }

        // jwt token
        const token = await generateToken({ id: existingUser._id }, "1d");

        const fetchedUser = await {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        }
        return res.status(200).json({ status: true, existingUser: fetchedUser, token, message: "Successfully logged in" });

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

//@disc Get Logged User
//@api GET /get_logged_user
//@access Private
exports.getLoggedUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const existingUser = await User.findOne({ _id: id });

        return res.status(200).json({ status: true, existingUser, message: "Successfully fetched user details" });

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});


//@disc Update User
//@api POST /update_user
//@access Private
exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(201).json({ status: true, updatedUser, message: "User updated" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, error: error.message })
    }
})

//@disc Delete User
//@api DELETE /delete_user
//@access Private
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {

        const deletedUser = await User.findByIdAndDelete({_id:id})
        return res.status(201).json({ status: true, message: "User deleted" })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: false, error: error.message })
    }
})