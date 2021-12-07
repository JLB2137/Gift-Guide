
console.log('this is working as a controller')

const URL = 'https://api.unsplash.com/search/photos?'
const API_KEY = 'client_id=TSXEbab3zM8UTwvTDlYS1KQwT0_b4NyzJs-UZrGxUzY'
const $search = $('#img-search')
const $searchInput = $('#search-input')
const $img = $('img')
const $nextImg = $('#img-next')
const $returnImg = $('#img-return')
const $imgURL = $('#imgURL')
let promise = ''
let searchTerm = ''
let counter = 0




function imagesAPI() {
    //console.log(`${URL}${$searchInput.val()}&${API_KEY}`)
    console.log(`${URL}grapes&engine=google&tbm=isch&${API_KEY}`)
    promise = $.ajax(`${URL}${API_KEY}${searchTerm}`)

    promise.then(function(response) {
        console.log(response.results)
        images = response.results
        //reset the counter
        counter = 0
        //set the image source equal to the response URL
        $img.attr('src',`${images[counter].urls.full}`)
        //insert result URL into the URL field for product
        $imgURL.attr('value', `${images[counter].urls.full}`)
    }, function(error) {
        console.log('error',error)
    })
}

$search.on('click', function(evt) {
    evt.preventDefault()
    searchTerm = `&query=${$searchInput.val()}`
    imagesAPI()
})

$nextImg.on('click', function(evt) {
    evt.preventDefault()
    console.log(images[1])
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
