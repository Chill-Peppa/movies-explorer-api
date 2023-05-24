const usersRouter = require('express').Router();

const { getInfoMe, updateProfile } = require('../controllers/users');

usersRouter.get('/me', getInfoMe);
usersRouter.patch('/me', updateProfile);

module.exports = usersRouter;

// !допилить валидацию joi, celebrate и импорт контроллеров
