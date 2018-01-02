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
const jsonfile = require('jsonfile')
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
[|] GPIO Status object
[|]
[|] TODO:
[|] 01: Make a separate module for controlling the GPIO
[*/
const GPIO = {
    a_side_on: false,
    b_side_on: false,
    activate_a_side () {
        this.a_side_on = true
    },
    activate_b_side () {
        this.b_side_on = true
    },
    deactivate_a_side () {
        this.a_side_on = false
    },
    deactivate_b_side () {
        this.side_b_on = false
    }
}
/*]
[|] Define the Poll configuration object
[*/
const poll_object = {
    poll_active: true,
    poll_rate: 3000,
    a_side_on: false,
    b_side_on: false
}
/*]
[|] Define the poll
[*/
function poll () {
    /*]
    [|] Turn flags off every poll.
    [|]
    [|] TODO:
    [|] 01: Design a smarter way to do this.  I'm turning the flags on with every poll to ensure that
    [|]     the lights turn off immediately when a phone is no longer detected on the network.
    [*/
    poll_object.a_side_on = false
    poll_object.b_side_on = false
    /*]
    [|] Convenience references (typing savers)
    [*/
    const a_side_address = network_module.network_deets
    /*]
    [|] Check for phone presence.
    [*/
    network_module.mac_addresses().forEach((n) => {
        /*]
        [|]
        [*/
        if (n === network_module.a_side_deets()) {
            poll_object.a_side_on = true
        } else if (n === network_module.b_side_deets()) {
            poll_object.b_side_on = true
        }
    })
    /*]
    [|] Heart Side A logic
    [*/
    if (poll_object.a_side_on === true) {
        GPIO.activate_a_side()
    } else {
        GPIO.deactivate_a_side()
    }
    /*]
    [|] Heart Side B Logic
    [*/
    if (poll_object.b_side_on === true) {
        GPIO.activate_b_side()
    } else {
        GPIO.deactivate_b_side()
    }
    /*]
    [|] DO a network scan
    [*/
    network_module.Scan()
    /*]
    [|] SetTimeout to create interval
    [*/
    setTimeout(() => {
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
    res.sendFile(path.join(__dirname, './dist/index.html'))
})
/*]
[|] Read side A Mac address for heart.
[*/
app.post('/read-side-a', (req, res) => {
    res.send(network_module.a_side_deets())
})
/*]
[|] Set side A Mac address for the heart.
[*/
app.post('/set-side-a', (req, res) => {
    network_module.set_a_side_mac(req.body.val)
    res.send('You\'ve added a new MAC address for side A.')
})
/*]
[|] Read side A Mac address for heart.
[*/
app.post('/read-side-b', (req, res) => {
    res.send(network_module.b_side_deets())
})
/*]
[|] Set side A Mac address for the heart.
[*/
app.post('/set-side-b', (req, res) => {
    const status = {
        route: 'set-side-b',
        msg: 'You have added a new MAC address for side B.'
    }
    /*]
    [|]
    [*/
    network_module.set_b_side_mac(req.body.val)
    res.send(JSON.stringify(status))
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