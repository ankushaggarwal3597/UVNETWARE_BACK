const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(
  path.join(__dirname, '../../keys/private.key'),
  'utf8'
);

const publicKey = fs.readFileSync(
  path.join(__dirname, '../../keys/public.key'),
  'utf8'
);

exports.signToken = (payload) => {
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: '1h'
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, publicKey, {
    algorithms: ['RS256']
  });
};