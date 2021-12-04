
module.exports = function checkboxUpdater(productObject) {
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