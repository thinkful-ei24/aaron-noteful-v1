'use strict';

const logger = function(req, res, next) {
  const time = new Date();
  console.log(`${time.toLocaleString()} ${req.method} ${req.url}`);
  next();
};

module.exports = {
  logger
};