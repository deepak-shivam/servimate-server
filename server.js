const express = require('express');
const mongodb  =  require('mongodb')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config()


const morgan = require('morgan')

//MIDDILWARES
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))

// Routes
const userRoutes = require('./routes/userRoutes')
const serviceRoutes = require('./routes/serviceRoutes')

// Passport Middleware
app.use(passport.initialize());

// Passport Config.
require('./config/passport')(passport)


//ROUTES
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/service', serviceRoutes)

//Catching 404 Error
app.use((req, res, next) => {
    const error = new Error('INVALID ROUTE')
    error.status = 404
    next(error);
})

//Error handler function
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const PORT = process.env.PORT || 4000;


mongoose.connect("mongodb://127.0.0.1:27017/servimate"
    , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
        console.log("server Started")
        app.listen(PORT)
    }).catch((err) => {
        console.log("Error in connecting to DataBase", err.message)
    })

// process.env.MONGO_URL.replace("<password>", process.env.MONGO_PASSWORD)
// "mongodb://127.0.0.1:27017/frontEndProject"

