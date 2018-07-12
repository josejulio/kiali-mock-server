module.exports = (client, path) => {
  return Promise.all([
    client.mockWithCallback(
      {
        'path': path,
        'method': 'GET'
      },
      () => {
        return {
          "statusCode": 200,
          "body": JSON.stringify({
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTMxMTkyMDU2fQ.q8lZrPDy9dzfO-wK8yJmbG3-edkMDjJG8CSpHxVcSKA",
            "expired_at": new Date(new Date() + 30 * 60 * 1000).toISOString()
          })
        };
      },
      {
        'unlimited': true
      }
    )
  ]);
};
