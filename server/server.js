// Import module
const express = require("express")
const mongoose = require("mongoose")
const router = require("./routes/api")
require("dotenv").config()

// Express server
const server = express()

// Desctructing process.env
const { PORT, MONG_URI } = process.env

// Middleware
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(function(req, res, next) {
    console.log(req.path, req.method)
    next()
})

// Routes
server.use("/api", router)

// Connect to database
mongoose.connect(MONG_URI)
    .then(function() {
        // Listen for request
        server.listen(PORT, function() {
            console.log(`Server is listening on http://localhost:${PORT}`)
        })
    })
    .catch(function(error) {
        console.log(error)
    })
