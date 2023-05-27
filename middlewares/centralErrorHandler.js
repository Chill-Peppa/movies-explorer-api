const centralErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Произошла ошибка в работе сервера.' : message,
  });
  next();
};

module.exports = { centralErrorHandler };
