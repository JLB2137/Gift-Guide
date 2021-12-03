
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
}