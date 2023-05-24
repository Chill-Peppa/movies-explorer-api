const signRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { login, createUser } = require('../controllers/users');

const { loginValidation, registrationValidation } = require('../utils/validation');

signRouter.post('/signin', celebrate(loginValidation), login);
signRouter.post('/signup', celebrate(registrationValidation), createUser);

module.exports = signRouter;
