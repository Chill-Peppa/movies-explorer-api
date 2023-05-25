const urlRegExp = /http(s)?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/;

const allowedCors = [
  'https://movies-explorer-diploma.nomoredomains.rocks',
  'http://movies-explorer-diploma.nomoredomains.rocks',
  'https://api.movies-explorer-dip.nomoredomains.rocks',
  'http://api.movies-explorer-dip.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

module.exports = {
  urlRegExp,
  allowedCors,
};
