/*
 * kiali-mock-server
 * https://github.com/josejulio/kiali-mock-server
 *
 * Copyright (c) 2018 Josejulio Martínez
 * Licensed under the MIT license.
 */

'use strict';
const mockServerClient = require('./decorate-client')(
  require('mockserver-client')
  .mockServerClient('localhost', 1080)
);


mockServerClient.reset()
  .then(
    () => {
      return Promise.all([
        require('./api/status/index.js')(mockServerClient, '/api/status'),
        require('./api/token/index.js')(mockServerClient, '/api/token'),
        require('./api/namespaces/index.js')(mockServerClient, '/api/namespaces'),
        require('./api/namespaces/__/health/index.js')(mockServerClient, '/api/namespaces/.*/health'),
        require('./api/namespaces/__/graph/index.js')(mockServerClient, '/api/namespaces/.*/graph')
      ]);
    })
  .then(
    () => {
      console.log('Finished reconfiguration the mock server');
    },
    (error) => {
      console.log('Failed to reset configuration.', error);
    }
  );
