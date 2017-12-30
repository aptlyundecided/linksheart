/*]
[|] || ================================================================================================== ||
[|]         Program:        heart-server.js
[|]         Description:    Express server for Links Heart project.  Used to host webpage, and heart 
[|]         Born on:        30 December 2017
[|]         Author:         Alex Wilson
[|] || ================================================================================================== ||
[*/
/*]
[|] || ------------------- ||
[|]       DEPENDENCIES
[|] || ------------------- ||
[*/
const express = require('express')
const path = require('path')
const body_parser = require('body-parser')
const network_module = require('./src/network_module.js')
/*]
[|] || =========================================== ||
[|]     DEFINE HEART SERVER AND SERVER FEATURES
[|] || =========================================== ||
[*/
const app = express()
const port = 3000
/*]
[|] Configure app    
[*/
app.use(express.static('./dist'))
app.use(body_parser.json())
/*]
[|] || ************************************* ||
[|]           Define Heart Functions
[|] || ************************************* ||
[*/
/*]
[|] Define the Poll configuration object
[*/
const poll_object = {
    poll_active: true,
    poll_rate: 2000
}
/*]
[|] Define the poll
[*/
function poll () {
    /*]
    [|] Do things with RPI GPIO here:
    [*/
    setTimeout(() => {
        /*]
        [|] DO a network scan
        [*/
        network_module.Scan()
        if (poll_object.poll_active === true) {
            poll()
        } else {
            console.log('why?')
        }
    },poll_object.poll_rate)
}
/*]
[|] || ************************************* ||
[|]             Define page routes.
[|] || ************************************* ||
[*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/heart.html'))
})
/*]
[|] || ************************************* ||
[|]             Start Server Tasks
[|] || ************************************* ||
[*/
poll()
/*]
[|] Activate server
[*/
app.listen(port)
/*]
[E] END
[*/