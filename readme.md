# Links Heart!

Intended as a sweet valentines day gift, this code will be the 'engine' that powers a physical heart that is divided into two halves like in the Legend Of Zelda.

Two phones will be linked to the system.  One phone assigned to each half. When the MAC Addresses of the two phones are detected on the network, then both halves will light up.  If only one is detected, only the light for that specific heart half will light up.

### Playing sounds!

The heart will be able to play sounds when people connect and disconnect from the network.  These sounds will be from the legend of zelda games.

There will be 4 different sounds to choose from that indicate when a persons phone is detected on the network, and 4 other sounds to indicate when a phone is no longer detected on the network.


### Filesystem!
To prevent from needing to lookup the MAC of the device each time it's powered on and off, the MAC addresses (network details object) will be kept in a persitent object on the PI filesystem.  In theory you should be able to configure the heart one time, and then it should permanently recognize the phones (until new phones are purchased.)