const $img = $('img')
const $nextImg = $('#img-next')
const $returnImg = $('#img-return')
const $imgURL = $('#imgURL')
const $imgUpdate = $('#img-update')
const imgSrc = $img.attr('src')
let promise = ''
let searchTerm = ''
let counter = 0


$imgUpdate.on('click', function(evt) {
    evt.preventDefault()
    //insert result URL into the URL field for product
    $imgURL.attr('value', `${$img.attr('src')}`)
})

