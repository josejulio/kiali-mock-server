module.exports = (client) => {
  client.mockResponse = (client, path, method, body, statusCode) => {
    return client.mockAnyResponse({
      'httpRequest': {
        'path': path,
        'method': method
      },
      'httpResponse': {
        'body': body,
        'statusCode': statusCode
      },
      'times': {
        'unlimited': true
      }
    });
  };
  
  return client;
};
