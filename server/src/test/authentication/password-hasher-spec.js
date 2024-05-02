const {expect} = require('chai');
const crypto = require ('crypto');
const { generateHashedPassword } = require('../../authentication/password-hasher.js');


describe('Generating a hashed password', () => {
  const salt = crypto.randomBytes(6).toString('hex');
  const plainPassword = 'HelloWorld'

  describe('generateHashedPassword', () => {
    it ('should return a string', () => {
      expect(generateHashedPassword(plainPassword)).to.be.a('string');
    })
    it ('should return the same hashed string if the salt and plain text password are the same', () => {
      expect(generateHashedPassword(plainPassword, salt));
    })
    it ('should return a different string if salt is different', () => {
      const tempSalt = crypto.randomBytes(6).toString('hex');
      const diffHashedPassword = generateHashedPassword(plainPassword, tempSalt);
      expect(generateHashedPassword(plainPassword, salt)).to.not.equal(diffHashedPassword);
    })
  })
})
