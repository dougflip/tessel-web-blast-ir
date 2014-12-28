Overview
=============

WebBlastir is designed to provide two IR services for the [Tessel](https://tessel.io/) IR module:

1. Report received IR codes over a websocket.
1. Receive IR codes over HTTP and then transmit them over [Tessel IR](https://tessel.io/modules#module-infrared).

## Before Starting

1. [Set up Wifi on your Tessel](https://tessel.io/docs/wifi) if you have not already.
1. Update the `socketUrl` variable of `./sample-client.html` to contain the IP of your Tessel

## Running the Application on the Tessel

```
npm start
```

This will install node_modules and run the application on the connected Tessel.

## Unit Tests

1. `npm test`
