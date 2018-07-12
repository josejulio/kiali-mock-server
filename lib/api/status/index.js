const read = require('read-file');

module.exports = (client, path) => {
  const response = read.sync(__dirname + '/status.json', 'utf-8');
  return client.mockResponse(
    client,
    path, 'GET',
    response,
    200
  );
};
