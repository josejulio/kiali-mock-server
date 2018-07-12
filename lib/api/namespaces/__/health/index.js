module.exports = (client, path) => {
  return client.mockResponse(
    client,
    path, 'GET',
    '{}',
    200
  );
};
