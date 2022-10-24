const { InvalidParamsError, ValidationError } = require('../exceptions/index.exception');

const errorLogger = (error, req, res, next) => {
  console.error(error);
  next(error); // errorLogger -> errorHandler
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof InvalidParamsError || error instanceof ValidationError) {
    const status = error.status || 400;
    return res.status(status).json({ errorMessage: error.message });
  } else {
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = { errorLogger, errorHandler };
