const $select = $('#selector')
const $form = $('form')
const $recipient = $('h1')


$select.on('change', function(evt) {
    $form.attr('action',`/gift-guide/recipient-holiday/${$recipient.html()}/${$(evt.target).val()}`)
})
