const express = require('express');

module.exports = (req, res, next) => {
  res.locals.user = 1;
  next();
};
