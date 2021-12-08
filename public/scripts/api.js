
console.log('this is working as a controller')
const $search = $('#img-search')
const $searchInput = $('#search-input')
const $img = $('img')
const $nextImg = $('#img-next')
const $returnImg = $('#img-return')
const $imgURL = $('#imgURL')
let promise = ''
let searchTerm = ''
let counter = 0


$nextImg.on('click', function(evt) {
    evt.preventDefault()
    counter = 1
    //if counter is greater than the total length of the object set to 0
    if (counter==images.length) {
        counter = 0
    } else {
        //updated the counter
        counter++
    }
    console.log(counter)
    //update with new image
    $img.attr('src',`${images[counter].urls.full}`)
    //insert result URL into the URL field for product
    $imgURL.attr('value', `${images[counter].urls.full}`)
})

$returnImg.on('click', function(evt) {
    evt.preventDefault()
    //if counter is equal to 0 do nothing
    if (counter == 0) {

    } else {
        //updated the counter
        counter--
    }
    //update with new image
    $img.attr('src',`${images[counter].urls.full}`)
    //insert result URL into the URL field for product
    $imgURL.attr('value', `${images[counter].urls.full}`)
})
