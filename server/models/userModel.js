const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"]
    },

    password: {
        type: String,
        required: [true, "Please enter your password"]
    },

    image: {
        type: String
    },

    address: {
        type: String
    }
})

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel;