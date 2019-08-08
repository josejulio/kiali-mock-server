# kiali-mock-server

Kiali mock server

## Getting Started

A basic mock server for interacting with kiali-ui (but it works for anything else), this is useful to load some responses from the server when you want to test something specific in the UI.

In `config.js` you will find the basic configuration of the http proxy [talkback](https://github.com/ijpiantanida/talkback)

To use, install the dependencies 
```
yarn
```

Set your Kiali server address and start the mock server
```
export KIALI_SERVER="https://kiali-istio-system.127.0.0.1.nip.io"
yarn start
```

By default, all requests are going to be recorded for the first time, and then it will reuse the requests.

Then point your [kiali-ui](https://github.com/kiali/kiali-ui#testing-with-kiali) proxy to http://localhost:3030

You can close with `ctrl+c` 

## Configuration

Useful values are `server.record` and `server.fallbackMode`.

The first control when to `record` a request:

- NEW - Record requests when a cassette is not found.
- OVERWRITE - Always record a cassette (overwrite if exists)
- DISABLED - Never record a cassette if not found (see fallbackMode)

When using record: DISABLED, `fallbackMode` is used to decide what to do:

- PROXY - Proxy requests to the original server (when you want to mock some requests and proxy the rest)
- NOT_FOUND - Use 404 for no matching cassettes

If for example, you only want to mock one request, you can:
- Run a session with `record=NEW`
- Stop the session 
- Delete all the cassettes and only leave the one you want
- Set `record=DISABLED` and `fallbackMode=PROXY`
- Start the server

## Modifying requests

Requests are saved in the `tapes` folder, for example the request GET api/auth/info is saved in:
`tapes/auth/GET-info.json5`  ([json5](https://json5.org/) is a superset of JSON with extra features)
You can open that file and update the "res" data, it is in plain text so you can update the json.
After saving, the mock server is going to restart. When is ready, the request is going to pick the new values.


## License
Licensed under the MIT license.
