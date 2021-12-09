const express = require('express')
const productRouter = express.Router() 
const Product = require('../models/product')
const seedProducts = require('../models/seed')
const routerFunctions = require('../models/routerFunctions')
const checkboxUpdater = routerFunctions.checkboxUpdater
const grabImages = routerFunctions.grabImages
const findAllProductsIndex = routerFunctions.findAllProductsIndex
const findAllProductsShow = routerFunctions.findAllProductsShow
const findAllProductsUpdate = routerFunctions.findAllProductsUpdate
const axios = require('axios')
let counter = 0


//remove when moving to heroku
require('dotenv').config()

//image search setup
const URL = process.env.URL
const API_KEY = process.env.API_KEY
let searchTerm = ''
let responseImages = []


//index page redirect
productRouter.get('/', (req,res) => {
    res.redirect('/gift-guide')
})


//index page
productRouter.get('/gift-guide', (req,res) => {
    findAllProductsIndex(Product,res,'index.ejs')
})


//seed
productRouter.get('/gift-guide/seed', (req,res) => {
    Product.create(seedProducts, (err,newProduct) => {
        res.redirect('/gift-guide')
    })
})


//show holidays
productRouter.get('/gift-guide/holiday/:holidayID',(req,res) => {
    Product.find({holiday: `${req.params.holidayID}`}, (err,product) => {
        findAllProductsShow(Product,res,'show_holiday.ejs',product)
    })

})

//show recipient
productRouter.get('/gift-guide/recipient/:recipientID',(req,res) => {
    Product.find({recipient: `${req.params.recipientID}`}, (err,product) => {
        findAllProductsShow(Product,res,'show_recipient.ejs',product)
    })

})

//show recipient-holidays
productRouter.get('/gift-guide/recipient-holiday/:recipientID/:holidayID',(req,res) => {
    Product.find({holiday: `${req.params.holidayID}`,recipient: `${req.params.recipientID}`}, (err,product) => {
        findAllProductsShow(Product,res,'show_recHol.ejs',product)
    })

})


//new page
productRouter.get('/gift-guide/new', (req,res) => {
    findAllProductsUpdate(Product,res,'new.ejs','')
})

//show product
productRouter.get('/gift-guide/:productID', (req,res) => {
    Product.findById(req.params.productID, (err, product) => {
        findAllProductsShow(Product,res,'show_product.ejs',product)
    })

})



//edit page
productRouter.get('/gift-guide/:productID/edit', (req,res) => {
    Product.findById(req.params.productID, (err,product) => {
        findAllProductsUpdate(Product,res,'edit.ejs',product)
    })
})

//create
productRouter.post('/gift-guide', (req,res) => {
    //update checkboxes, if they haven't been filled out and are undefined set the value to false
    checkboxUpdater(req.body)
    //calculate total cost based on input
    req.body.totalCost = req.body.price * req.body.quantity
    Product.create(req.body, (err,product) => {
        res.redirect('/gift-guide')
    })
})

//image-selector edit search
productRouter.post('/gift-guide/:productID/edit', (req,res) => {
    //grab the search input from the user
    searchTerm = `&query=${req.body.imgSearchTerm}`
    grabImages(searchTerm)
    //need to create a timeout to allow for the API to grab the images
    setTimeout(function() {res.redirect(`/gift-guide/${req.params.productID}/edit`)},1000)
})


//image-selector new
productRouter.post('/gift-guide/new', (req,res) => {
    //grab the search input from the user
    searchTerm = `&query=${req.body.imgSearchTerm}`
    grabImages(searchTerm)
    //need to create a timeout to allow for the API to grab the images
    setTimeout(function() {res.redirect('/gift-guide/new')},1000)
})

//update
productRouter.put('/gift-guide/:productID', (req,res) => {
    //update checkboxes, if they haven't been filled out and are undefined set the value to false
    checkboxUpdater(req.body)
    //update total cost based on input price and quantity
    req.body.totalCost = req.body.price * req.body.quantity
    Product.findByIdAndUpdate(req.params.productID, req.body, {new:true}, (err, product) => {
        res.redirect('/gift-guide')
    })
})



//delete
productRouter.delete('/gift-guide/:productID', (req,res) => {
    Product.findByIdAndDelete(req.params.productID, (err, deletedProduct) => {
        res.redirect('/gift-guide')
    })
})


module.exports = productRouter