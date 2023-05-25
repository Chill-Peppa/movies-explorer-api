const signRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

const { loginValidation, registrationValidation } = require('../utils/validation');

signRouter.post('/signup', celebrate(registrationValidation), createUser);
signRouter.post('/signin', celebrate(loginValidation), login);

module.exports = signRouter;
