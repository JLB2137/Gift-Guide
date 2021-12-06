
const URL = 'https://serpapi.com/search.json?q='
const API_KEY = 'api_key=ae1778046f5540190b367e434568f827315065f246b3ade6a0f8fee3eb22dd71'
const $search = $('#img-search')
const $searchInput = $('#search-input')
let promise = ''


function imagesAPI() {
    //console.log(`${URL}${$searchInput.val()}&${API_KEY}`)
    console.log(`${URL}grapes&engine=google&tbm=isch&${API_KEY}`)
    promise = $.ajax(`https://serpapi.com/search.json?engine=google&q=Coffee&api_key=ae1778046f5540190b367e434568f827315065f246b3ade6a0f8fee3eb22dd71`)

    promise.then(function(response) {
        console.log(response)
    }, function(error) {
        console.log('error',error)
    })
}

imagesAPI()