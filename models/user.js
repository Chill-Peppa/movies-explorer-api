const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректно введен email. Ожидается строка, разделенная символом @.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // так хэш пароля не будет по умолчанию возвращаться из базы
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
