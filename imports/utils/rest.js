export default {
  getRequestContents: request => {
    switch (request.method) {
      case 'GET':
        return _.omit(request.query, '__proto__');
      case 'POST':
        return _.omit(request.body, '__proto__');
      case 'PUT':
        return _.omit(request.body, '__proto__');
      case 'DELETE':
        return _.omit(request.body, '__proto__');
    }
  },

  hasData: data => {
    return Object.keys(data).length > 0 ? true : false;
  },

  response: (response, data = 'success', statusCode = 200) => {
    statusCode = statusCode; // (statusCode === 403) ? 200 : statusCode;
    // ----------------------------------------------------
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = statusCode;
    response.end(JSON.stringify(data));
  },

  validate: (data, pattern) => {
    return Match.test(data, pattern);
  },
};
