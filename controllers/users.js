const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../config');

const BadRequestError = require('../errors/badrequest-err');
const NotFoundError = require('../errors/notfound-err');
const ConflictError = require('../errors/conflict-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const createUser = (req, res, next) => {
  const { email, name } = req.body;

  bcrypt
    .hash(req.body.password, 5)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((newUser) => {
      res.status(200).send({
        email: newUser.email,
        name: newUser.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован'),
        );
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль.');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          throw new UnauthorizedError('Неправильная почта или пароль.');
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'diploma-secret-key',
          {
            expiresIn: '7d',
          },
        );
        res.status(200).send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getInfoMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден.');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c указанным id не найден.');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля.',
          ),
        );
        return;
      }
      next(err);
    });
};

module.exports = {
  getInfoMe,
  updateProfile,
  createUser,
  login,
};
