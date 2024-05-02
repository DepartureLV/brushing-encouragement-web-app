const crypto = require('crypto');

function generateHashedPassword (plainTextPassword, saltHex = null) {
  const salt = saltHex || crypto.randomBytes(6).toString('hex');
  const saltAndPassword = `${salt}${plainTextPassword}`
  const hash = crypto.createHash('sha256');
  const hashedPassword = hash.update(saltAndPassword).digest('hex');
  return hashedPassword;
}

module.exports = {
  generateHashedPassword
}