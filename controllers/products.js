const express = require('express')
const productRouter = express.Router() 
const Product = require('../models/product')
const seedProducts = require('../models/seed')
const requestUpdater = require('../public/scripts/routerFunctions')
const axios = require('axios')
let counter = 0

//remove when moving to heroku
require('dotenv').config()

//image search setup
const URL = process.env.URL
const API_KEY = process.env.API_KEY
let searchTerm = ''
let responseImages = []


//pull from the API using API Key and URL
const grabImages = async (search) => {
    try {
        const response = await axios.get(`${URL}${API_KEY}${search}`)
        //attach the images to the new variable
        responseImages = response.data.results
    } catch (err) {
        console.log('Error with API')
    }
}

//need to setup counter reset

//index page redirect
productRouter.get('/', (req,res) => {
    res.redirect('/gift-guide')
})


//index page
productRouter.get('/gift-guide', (req,res) => {
    Product.find({}, (err,allProducts) => {
        let holiday = new Set()
        let recipient = new Set()
        allProducts.forEach(element => {
            holiday.add(element.holiday)
            recipient.add(element.recipient)
        })
        res.render('index.ejs', {
            product: allProducts,
            holiday,
            recipient
        })
    })
})

//image page
productRouter.get('/gift-guide/image-selector', (req,res) => {
    res.json('https://api.unsplash.com/search/photos?client_id=TSXEbab3zM8UTwvTDlYS1KQwT0_b4NyzJs-UZrGxUzY&query=study')
    res.render('index.ejs')
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
    requestUpdater(req.body)
    //calculate total cost based on input
    req.body.totalCost = req.body.price * req.body.quantity
    Product.create(req.body, (err,product) => {
        res.redirect('/gift-guide')
    })
})


//show holidays
productRouter.get('/gift-guide/holiday/:holidayID',(req,res) => {
    Product.find({holiday: `${req.params.holidayID}`}, (err,product) => {
        Product.find({}, (err,allProducts) => {
            let holiday = new Set()
            let recipient = new Set()
            allProducts.forEach(element => {
                holiday.add(element.holiday)
                recipient.add(element.recipient)
            })
            res.render('show_holiday.ejs', {
                product,
                holiday,
                recipient
            })
        })
    })

})

//show recipient
productRouter.get('/gift-guide/recipient/:recipientID',(req,res) => {
    Product.find({recipient: `${req.params.recipientID}`}, (err,product) => {
         Product.find({}, (err,allProducts) => {
            let holiday = new Set()
            let recipient = new Set()
            allProducts.forEach(element => {
                holiday.add(element.holiday)
                recipient.add(element.recipient)
            })
            res.render('show_recipient.ejs', {
                product,
                holiday,
                recipient
            })
        })
    })

})


//new page
productRouter.get('/gift-guide/new', (req,res) => {
    Product.find({}, (err,allProducts) => {
        let holiday = new Set()
        let recipient = new Set()
        allProducts.forEach(element => {
            holiday.add(element.holiday)
            recipient.add(element.recipient)
        })
        res.render('new.ejs', {
            holiday,
            recipient
        })
    })
})

//show product
productRouter.get('/gift-guide/:productID', (req,res) => {
    Product.findById(req.params.productID, (err, product) => {
        Product.find({}, (err,allProducts) => {
            let holiday = new Set()
            let recipient = new Set()
            allProducts.forEach(element => {
                holiday.add(element.holiday)
                recipient.add(element.recipient)
            })
            res.render('show_product.ejs', {
                product,
                holiday,
                recipient
            })
        })
    })

})

//edit page
productRouter.get('/gift-guide/:productID/edit', (req,res) => {
    console.log('imageChecker',responseImages.length)
    Product.findById(req.params.productID, (err,product) => {
        Product.find({}, (err,allProducts) => {
            let holiday = new Set()
            let recipient = new Set()
            allProducts.forEach(element => {
                holiday.add(element.holiday)
                recipient.add(element.recipient)
            })
            res.render('edit.ejs', {
                product,
                holiday,
                recipient,
                images: responseImages
            })
        })
    })
})

//update
productRouter.put('/gift-guide/:productID', (req,res) => {
    //update checkboxes, if they haven't been filled out and are undefined set the value to false
    requestUpdater(req.body)
    console.log(req.body)
    //update total cost based on input price and quantity
    req.body.totalCost = req.body.price * req.body.quantity
    Product.findByIdAndUpdate(req.params.productID, req.body, {new:true}, (err, product) => {
        res.redirect('/gift-guide')
    })
})

//image-selector edit search
productRouter.post('/gift-guide/:productID/edit', (req,res) => {
    //grab the search input from the user
    searchTerm = `&query=${req.body.imgSearchTerm}`
    grabImages(searchTerm)
    console.log('imageChecker on image selector',responseImages.length)
    //need to create a timeout to allow for the API to grab the images
    setTimeout(function() {res.redirect(`/gift-guide/${req.params.productID}/edit`)},1000)
})


//image-selector new
productRouter.post('/gift-guide/new', (req,res) => {
    //grab the search input from the user
    searchTerm = `&query=${req.body.imgSearchTerm}`
    grabImages(searchTerm)
    console.log('imageChecker on image selector',responseImages.length)
    //need to create a timeout to allow for the API to grab the images
    res.redirect('/gift-guide')
})

//delete
productRouter.delete('/gift-guide/:productID', (req,res) => {
    Product.findByIdAndDelete(req.params.productID, (err, deletedProduct) => {
        res.redirect('/gift-guide')
    })
})

//current issue is that all products keep duplicating calls for the show page

module.exports = productRouter