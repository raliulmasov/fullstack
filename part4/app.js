const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const mongo = require("./mongo")
const loginRouter = require('./controllers/login')


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

module.exports = app