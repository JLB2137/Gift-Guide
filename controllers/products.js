const express = require('express')

const productRouter = express.Router() 

productRouter.get('/', (req,res) => {
    res.render('index.ejs')
})

modules.export = productRouter