const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, NODE_ENV, URL_DB_PROD } = process.env;

const { errors } = require('celebrate');

const app = express();
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { URL_DB_DEV } = require('./utils/constants');

mongoose.connect(NODE_ENV === 'production' ? URL_DB_PROD : URL_DB_DEV);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);
app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(centralErrorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
