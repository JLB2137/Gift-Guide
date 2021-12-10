const $img = $('img')
const $imgURL = $('#imgURL')
const $imgUpdate = $('#img-update')



$imgUpdate.on('click', function(evt) {
    evt.preventDefault()
    //insert result URL into the URL field for product
    $imgURL.attr('value', `${$img.attr('src')}`)
})

