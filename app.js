const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const { errors } = require('celebrate');

const app = express();
const router = require('./routes');
const signRouter = require('./routes/sign');
const { auth } = require('./middlewares/auth');
const { pageNotFound } = require('./middlewares/pageNotFound');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

// роуты, НЕ требующие авторизации
app.use(signRouter);

app.use(auth);

// роуты, требующие авторизацию
app.use(router);
app.use(pageNotFound);

app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
