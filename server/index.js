const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config()
const morgan = require("morgan")

const { readdirSync } = require("fs")
const database = require("./config/database.js")


const app = express();

// PARSE Application/json
app.use(express.json());

// PARSE Application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors())
app.use(morgan('dev'))

// ROUTES
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// DATABASE
mongoose.set("strictQuery", true);
database();

// PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
