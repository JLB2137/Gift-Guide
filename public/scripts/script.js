//$header = $('h1')

//$header.html('Still working')

console.log('working')
//holiday constants
const $holidaySubmit = $('#submit-holday')
const $selectHoliday = $('#holiday-selector')
const $holidaySelectorLink = $('#holiday-selector-link')
//recipient constants
const $recipientSubmit = $('#submit-recipient')
const $selectRecipient = $('#recipient-selector')
const $recipientSelectorLink = $('#recipient-selector-link')

$selectHoliday.on('change', function(evt) {
    //when the holiday is changed, change the link of the submit to
    //the selected holday
    $holidaySelectorLink.attr('href',`/gift-guide/holiday/${$(evt.target).val()}`)
})

$selectRecipient.on('change', function(evt) {
    //when the holiday is changed, change the link of the submit to
    //the selected holday
    $recipientSelectorLink.attr('href',`/gift-guide/recipient/${$(evt.target).val()}`)
})



