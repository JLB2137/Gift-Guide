const mongoose = require('mongoose')
const Schema = mongoose.Schema

const products = new Schema ({
    recipient: String,
    name: String,
    price: Number,
    quantity: Number,
    totalCost: Number,
    holiday: String,
    inStock: Boolean,
    productURL: String,
    imgURL: String,
    purchased: Boolean
})

const Product = mongoose.model('Product', products)

module.exports = Product