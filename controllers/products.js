const express = require('express')
const productRouter = express.Router() 
const Product = require('../models/product')
const seedProducts = require('../models/seed')
const checkboxUpdater = require('../public/scripts/routerFunctions')



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

//seed
productRouter.get('/gift-guide/seed', (req,res) => {
    Product.create(seedProducts, (err,newProduct) => {
        res.redirect('/gift-guide')
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


//show holidays
productRouter.get('/gift-guide/holiday/:holidayID',(req,res) => {
    Product.find({holiday: `${req.params.holidayID}`}, (err,product) => {
        res.render('show_holiday.ejs', {
            product
        })
    })

})

//show recipient
productRouter.get('/gift-guide/recipient/:recipientID',(req,res) => {
    Product.find({recipient: `${req.params.recipientID}`}, (err,product) => {
        res.render('show_recipient.ejs', {
            product
        })
    })

})


//new page
productRouter.get('/gift-guide/new', (req,res) => {
    res.render('new.ejs')
})

//show product
productRouter.get('/gift-guide/:productID', (req,res) => {
    Product.findById(req.params.productID, (err, product) => {
        console.log('showing the product:',product)
        console.log('url',req.url)
        res.render('show_product.ejs', {
            product
        })
    })

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

//current issue is that all products keep duplicating calls for the show page

module.exports = productRouter