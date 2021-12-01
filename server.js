//contstants
const express = require('express')
const mongoose = require('mongoose')
const { connected } = require('process')
//need to remove once file setup is completed
const app = express()
//need to remove for Heroku
require('dotenv').config()

//env constants
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL


//open port

app.listen(PORT, () => console.log(`Port ${PORT} is open`))


//connect to DB

mongoose.connect(MONGODB_URL)

db = mongoose.connection

db.on('connected', () => console.log('MongoDB server connected'))
db.on('disconnected', () => console.log('MongoDB has been disconnected'))
db.on('error', (err) => console.log(`MongoDB Error: ${err}`))

