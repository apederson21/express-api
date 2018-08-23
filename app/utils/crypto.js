'use strict';

const   crypto = require('crypto'),
        algorithm = 'aes-256-ctr',
        secret = process.env.API_ENCRYPTION_SECRET;

const encrypt = ((text) => {
  let   cipher = crypto.createCipher(algorithm, secret),
        crypted = cipher.update(text,'utf8','hex');

  crypted += cipher.final('hex');
  return crypted;
});

const decrypt = ((text) => {
  let   decipher = crypto.createDecipher(algorithm, secret),
        dec = decipher.update(text,'hex','utf8');

  dec += decipher.final('utf8');
  return dec;
});

module.exports = {
  decrypt: decrypt,
  encrypt: encrypt
}
