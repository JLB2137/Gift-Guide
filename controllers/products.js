const express = require('express')
const productRouter = express.Router() 
const Product = require('../models/product')



//index page redirect
productRouter.get('/', (req,res) => {
    res.redirect('/gift-guide')
})


//index page
productRouter.get('/gift-guide', (req,res) => {
    Product.find({}, (err,allProducts) => {
        res.render('index.ejs', {
            product: allProducts
        })
    })
})

//show holidays
productRouter.get('/gift-guide/holiday/:holidayID',(req,res) => {
    //need to add holiday ID
    res.render('show_holiday.ejs')
})


//create
productRouter.post('/gift-guide', (req,res) => {
    console.log(req.body)
    Product.create(req.body, {new:true}, (err,product) => {
        res.redirect('/gift-guide')
    })
})

//new page
productRouter.get('/gift-guide/new', (req,res) => {
    res.render('new.ejs')
})


module.exports = productRouter