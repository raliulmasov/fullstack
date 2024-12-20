require("dotenv").config()
const mongoose = require('mongoose')

const mongoUri = process.env.MONGO_URI
mongoose.connect(mongoUri)