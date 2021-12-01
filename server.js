//contstants
const express = require('express')
const mongoose = require('mongoose')
const productsRouter = require('./controllers/products')
const app = express();
const methodOverride = require('method-override')

//remove after done with nodemon
require('dotenv').config()

//env constants
const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

//middleware

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use('/public', express.static('public'))

//appRouter
app.use('/',productsRouter)

//open port
app.listen(PORT, () => console.log(`Port ${PORT} is open`))


//connect to DB

mongoose.connect(MONGODB_URL)

const db = mongoose.connection

db.on('connected', () => console.log('MongoDB server connected'))
db.on('disconnected', () => console.log('MongoDB has been disconnected'))
db.on('error', (err) => console.log(`MongoDB Error: ${err}`))

