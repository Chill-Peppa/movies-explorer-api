const NotFoundError = require('../errors/notfound-err');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError('Такого адреса не существует'));
};

module.exports = { pageNotFound };
