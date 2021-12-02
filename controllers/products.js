const express = require('express')
const productRouter = express.Router() 
const Product = require('../models/product')

//index page
productRouter.get('/', (req,res) => {
    Product.find({}, (err,allProducts) => {
        res.render('index.ejs', {
            product: allProducts
        })
    })
})

//show holidays
productRouter.get('/holiday/:holidayID',(req,res) => {
    //need to add holiday ID
    res.render('show_holiday.ejs')
})

module.exports = productRouter