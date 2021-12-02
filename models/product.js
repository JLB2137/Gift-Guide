const mongoose = require('mongoose')
const Schema = mongoose.Schema

const products = new Schema ({
    recipiet: String,
    name: String,
    price: Number,
    quantity: Number,
    totalCost: Number,
    holiday: String,
    inStock: Boolean,
    productURL: String,
    purchased: Boolean
})

const Product = mongoose.model('Product', products)

module.exports = Product