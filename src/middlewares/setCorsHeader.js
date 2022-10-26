class SetHeader {
  corsHeader = function (req, res, next) {
    const origin = req.headers?.origin;

    res.set({
      // 'Access-Control-Allow-Headers': 'X-Requested-With',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': origin || ['http://localhost:3000'],
      'Access-Control-Allow-Headers': 'X-Requested-With',
    });
    next();
  };
}

module.exports = new SetHeader();
// Access-Control-Allow-Origin: https://www.domain.com
// Access-Control-Allow-Method: GET, POST, OPTIONS, PUT
