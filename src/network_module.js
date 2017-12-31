/*]
[|] || ========================================================================== ||
[|]     Program:        network_module.js
[|]     Description:    This module will be responsible for storing the Mac
[|]                     Addresses of the two phones that light up the heart.
[|]                     It will also be where the network 'scanner' is defined.
[|]     Author:         Alex Wilson
[|]     Born On:        30 December 2017
[|] || ========================================================================== ||
[*/
/*]
[|] || ====================== ||
[|]         DEPENDENCIES
[|] || ====================== ||
[*/
const network = require('network')
const cmd = require('node-cmd')
/*]
[|] || ============================ ||
[|]       Network Details Object
[|] || ============================ ||
[*/
const network_deets = {
    gateway: '0.0.0.0',
    arp_table: {},
    a_side_mac: '',
    b_side_mac: '',
    range: '25'
}
/*]
[|] || ============================================================ ||
[|]                     General Purpose Functions
[|] || ============================================================ ||
[*/
/*]
[|] Create a regular expression for ip addresses
[*/
function ip_regexp () {
    const octet = '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.'
    return new RegExp(octet + octet + octet + octet)
}
/*]
[|] Create a regular expression for MAC Addresses
[*/
function mac_regexp () {
    return new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$')
}
/*]
[|] Take the arp table string, and turn it into a list of IP addresses,
[|] and MAC addresses
[*/
function arp_table_parse (table) {
    /*]
    [|] Create arp table object to contain arp table information
    [*/
    const arp_table = {}
    /*]
    [|] Create empty lists to contain items from the arp table.
    [*/
    const ip_list = []
    const mac_list = []
    let item_buffer = []
    /*]
    [|] Split the arp table string into individual characters
    [*/
    const split_arr = table.split('')
    /*]
    [|] Loop through every character in the arp table.
    [*/
    split_arr.forEach((n, i) => {
        if (n !== ' ') {
            item_buffer.push(n)
        } else {
            /*]
            [|] Check to see if item_buffer currently holds a value
            [*/
            if (item_buffer.length >= 1) {
                const joined = item_buffer.join('')
                /*]
                [|] Add item to ip address list, if determined to be an IP
                [*/
                if (joined.match(ip_regexp()) !== null){
                    ip_list.push(joined)
                } else if (joined.match(mac_regexp()) !== null) {
                    mac_list.push(joined)
                }
                /*]
                [|] Clear out the item_buffer / string buffer
                [*/
                item_buffer = []
            }
        }
    })
    /*]
    [|] Add the list of items to the appropriate property of the arp table object
    [*/
    arp_table.ip_addresses = ip_list
    arp_table.mac_addresses = mac_list 
    /*]
    [|]
    [*/
    console.log(arp_table)
    return arp_table
}
/*]
[|] || ================================ ||
[|]        Network Scan Function!
[|] || ================================ ||
[*/
/*]
[|] This will be the way to periodically check the network for the set devices.
[*/
function Scan() {
    /*]
    [|] Retrieve the name of the network the raspberry pi is connected to.
    [*/
    network.get_gateway_ip(function(err, ip) {
        if (!err) {
            /*]
            [|] create a string to enter into the command prompt.
            [*/
            const scan_string = 'nmap -sP ' + ip + '-' + network_deets.range
            /*]
            [|] Retain the gateway of the network the pi is connected to
            [*/
            network_deets.gateway = ip
            /*]
            [|] Run nmap Sp then parse network details into a javascript object.
            [*/
            cmd.get(scan_string, (err, data, stderr) => {
                if (!err) {
                    network_deets.arp_table = arp_table_parse(data)
                }
            })
        }
    })
}
/*]
[|] MODULE
[*/
module.exports = {
    Scan,
    network_deets,
    a_side_deets () { 
        return this.network_deets.a_side_mac
    },
    b_side_deets () {
        return this.network_deets.b_side_mac
    },
    ip_addresses () {
        if (typeof this.network_deets.ip_addresses !== 'undefined') {
            return this.network_deets.ip_addresses
        } else {
            return []
        }
    },
    mac_addresses () {
        if (typeof this.network_deets.mac_addresses !== 'undefined') {
            return this.network_deets.mac_addresses
        } else {
            return []
        }
    }
}
/*]
[E] END
[*/