# kiali-mock-server

[![Greenkeeper badge](https://badges.greenkeeper.io/josejulio/kiali-mock-server.svg)](https://greenkeeper.io/)

Kiali mock server

## Getting Started

A basic mock server for interacting with kiali-ui, this is useful to load some responses from the server when you want to test something specific in the UI.

Currently there is code in `lib/api/namespaces/__/graph/index.js` to show
some graphs, it needs to be manually swapped but we could use the request object
passed to the callback of `mockWithCallback` to react depending the request.

To run use:

```
npm install -g grunt-cli
yarn
grunt
```

And set in your kiali-ui package.json the proxy to: http://localhost:1080


## License
Licensed under the MIT license.
