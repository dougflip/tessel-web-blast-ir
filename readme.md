Overview
=============

WebBlastir is designed to provide two IR services for the [Tessel](https://tessel.io/) IR module:

1. Report received IR codes over a websocket.
1. Receive IR codes over HTTP and then transmit them over [Tessel IR](https://tessel.io/modules#module-infrared).

## Before Starting

1. [Set up Wifi on your Tessel](https://tessel.io/docs/wifi) if you have not already.

## Running the Application locally

1. `npm install`
1. `NODE_ENV=local npm start`

This will use a "mock" IR module which will emit data events every 5 seconds.
Useful for verifying the web and socket server are up and reachable (debugging mostly).

[http://localhost:8001/](http://localhost:8001/) will show the socket connected client

You should also be able to `POST` to [http://localhost:8001/single-blast](http://localhost:8001/single-blast)

```
curl -X POST -H "Content-Type: application/json" -d '{ "signal": [0, 100, 255] }' http://localhost:8001/single-blast
```

Again, this is using a stubbed IR interface so we are really just verifying the server is up and running.
The next section shows you how to get the code deployed on the Tessel.

## Running the Application on the Tessel

1. `npm install` (if you didn't do this above)
1. `npm run tessel:prepare` - removes node_modules and re-installs with --production flag (to minimize file size)
1. `npm run tessel:run` - runs the code on the Tessel board (tessel run)

As above, you should be able to hit the client page, but this time served from your Tessel:

[http://TESSEL-IP-ADDRESS-HERE:8001/](http://TESSEL-IP-ADDRESS-HERE:8001/)

Now any IR data received by your Tessel will be sent over a websocket and displayed on this page.

You should also be able to send IR codes to your Tessel to translate into IR output.

```
curl -X POST -H "Content-Type: application/json" -d '{ "signal": [3,182,252,224,7,8,252,174,3,132,252,174,3,132,252,174,3,132,252,174,3,132,252,174,3,132,252,174,3,132,249,42,6,214,252,174,3,182,252,224,3,182,252,174,3,132] }' http://TESSEL-IP-ADDRESS-HERE:8001/single-blast
```

## Unit Tests

1. `npm install` (if you didn't do this above)
1. `npm test`
