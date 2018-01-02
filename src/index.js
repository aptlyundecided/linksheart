/*]
[|] || ========================================================================== ||
[|]     Program:        index.js
[|]     Description:    Entry point for the browser JS on Links Heart Project.
[|]     Author:         Alex Wilson
[|]     Born On:        1 January 2017
[|] || ========================================================================== ||
[*/
/*]
[|]
[*/
$('#side-a-read').on('click', () => {
    $.post( "/read-side-a", (data) => {
        $('#side-a-input').val(data)
        /*]
        [|] No need for fanciness
        [*/
        $('#side-a-input-box').addClass('is-dirty')
    })
})
/*]
[|]
[*/
$('#side-a-set').on('click', () => {
    /*]
    [|] Create data object containing new mac address to send to server
    [*/
    const data = {
        name: 'new mac address',
        val: $('#side-a-input').val()
    }
    /*]
    [|] Perform asynchronous javascript http request.
    [*/
    $.ajax({
        type: "POST",
        url: '/set-side-a',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log('You successfully set a device for side A.')
        }
    })
})
/*]
[|] 
[*/
$('#side-b-read').on('click', () => {
    $.post( "/read-side-b", (data) => {
        $('#side-b-input').val(data)
        /*]
        [|] No need for fanciness
        [*/
        $('#side-b-input-box').addClass('is-dirty')
    })
})
/*]
[|]
[*/
$('#side-b-set').on('click', () => {
    /*]
    [|] Create data object containing new mac address to send to server
    [*/
    const data = {
        name: 'new mac address',
        val: $('#side-b-input').val()
    }
    /*]
    [|] Perform asynchronous javascript http request.
    [*/
    $.ajax({
        type: "POST",
        url: '/set-side-b',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            console.log(data)
        }
    })
})
/*]
[E] END
[*/
