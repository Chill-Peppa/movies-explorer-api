const NotFoundError = require('../errors/notfound-err');
const { addressDoesNotExist } = require('../utils/errorsText');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError(addressDoesNotExist));
};

module.exports = { pageNotFound };
