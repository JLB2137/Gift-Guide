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

//show product
productRouter.get('/gift-guide/:productID', (req,res) => {
    Product.findById(req.params.productID, (err, product) => {
        res.render('show_product.ejs', {
            product
        })
    })

})

//show holidays
productRouter.get('/gift-guide/holiday/:holidayID',(req,res) => {
    //need to add holiday ID
    res.render('show_holiday.ejs')
})


//new page
productRouter.get('/gift-guide/new', (req,res) => {
    res.render('new.ejs')
})

//edit page
productRouter.get('/gift-guide/:productID/edit', (req,res) => {
    Product.findById(req.params.productID, (err,product) => {
        res.render('edit.ejs', {
            product
        })
    })
})

//update
productRouter.put('/gift-guide/:productID', (req,res) => {
    Product.findByIdAndUpdate(req.params.productID, req.body, {new:true}, (err, product) => {
        res.redirect('/gift-guide')
    })
})

//create
productRouter.post('/gift-guide', (req,res) => {
    console.log(req.body)
    Product.create(req.body, {new:true}, (err,product) => {
        res.redirect('/gift-guide')
    })
})

module.exports = productRouter