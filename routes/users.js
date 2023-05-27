const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { getInfoMe, updateProfile } = require('../controllers/users');

const { updateProfileValidation } = require('../utils/validation');

usersRouter.get('/me', getInfoMe);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateProfile);

module.exports = usersRouter;
