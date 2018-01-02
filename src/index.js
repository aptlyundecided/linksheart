/*]
[|] || ========================================================================== ||
[|]     Program:        index.js
[|]     Description:    Entry point for the browser JS on Links Heart Project.
[|]     Author:         Alex Wilson
[|]     Born On:        1 January 2017
[|] || ========================================================================== ||
[*/
/*]
[|] || ===================== ||
[|] || ===================== ||
[*/
console.log('WHAT!')
import $ from 'jquery'
const ip = require('ip')
// const $ = require('jquery')
// import classes from 'material-design-lite'
/*]
[|]
[*/
$('#side-a').on('click', function () {
    console.log('Side A!')
    console.log(ip.address())
})
// console.log('ANYTHING?')
/*]
[E] END
[*/
