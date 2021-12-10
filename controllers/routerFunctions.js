//remove for Heroku
require('dotenv').config()
//declare environmental variables
const URL = process.env.URL
const API_KEY = process.env.API_KEY
//require axios for API requests
const axios = require('axios')
//constants for use in functions
let responseImages = []
//pull from the API using API Key and URL
const grabImages = async (search) => {
    try {
        const response = await axios.get(`${URL}${API_KEY}${search}`)
        //attach the images to the new variable
        responseImages = response.data.results
    } catch (err) {
        console.log(err,() => console.log(err))
    }
}

//a function to update the variables as provided by the edit/new pages where checkbox values are changed before
//they are saved in the database
function checkboxUpdater(productObject) {
    if (productObject.purchased !== undefined) {
        productObject.purchased = true
        
    } else {
        productObject.purchased = false
    }
    if (productObject.inStock !== undefined) {
        productObject.inStock = true

    } else {
        productObject.inStock = false
    }
    //set a default image if nothing is input
    if (productObject.imgURL == undefined || productObject.imgURL == '') {
        productObject.imgURL = 'http://atlas-content-cdn.pixelsquid.com/stock-images/christmas-gift-box-3yLoqyA-600.jpg'
    }
}


//a function used to grab all the products to create variables used by the nav on the index page
function findAllProductsIndex(model,response,showPage) {
    model.find({}, (err,allProducts) => {
        let holiday = new Set()
        let recipient = new Set()
        allProducts.forEach(element => {
            holiday.add(element.holiday)
            recipient.add(element.recipient)
        })
        response.render(`${showPage}`, {
            product: allProducts,
            holiday,
            recipient
        })
    })
}

//a function used to grab all the products to create variables used by the nav on show pages
function findAllProductsShow(model,response,showPage,product) {
    model.find({}, (err,allProducts) => {
        let holiday = new Set()
        let recipient = new Set()
        allProducts.forEach(element => {
            holiday.add(element.holiday)
            recipient.add(element.recipient)
        })
        response.render(`${showPage}`, {
            product,
            holiday,
            recipient
        })
    })
}

//a function used to grab all the products to create variables used by the nav on new/update pages
function findAllProductsUpdate(model,response,showPage,product) {
    model.find({}, (err,allProducts) => {
        let holiday = new Set()
        let recipient = new Set()
        allProducts.forEach(element => {
            holiday.add(element.holiday)
            recipient.add(element.recipient)
        })
        response.render(`${showPage}`, {
            product,
            holiday,
            recipient,
            images: responseImages
        })
    })
}

module.exports = {
    checkboxUpdater,
    grabImages,
    findAllProductsIndex,
    findAllProductsShow,
    findAllProductsUpdate,
    responseImages
}