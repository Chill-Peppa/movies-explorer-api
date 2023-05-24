const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
const router = require('./routes');
const signRouter = require('./routes/sign');
const { auth } = require('./middlewares/auth');
const { pageNotFound } = require('./middlewares/pageNotFound');
const { centralErrorHandler } = require('./middlewares/centralErrorHandler');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

// вместо бади парсера
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// роуты, НЕ требующие авторизации
app.use(signRouter);

app.use(auth);
// роуты, требующие авторизацию
app.use(router);

app.use(pageNotFound); // если введен несуществующий адрес

app.use(centralErrorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
