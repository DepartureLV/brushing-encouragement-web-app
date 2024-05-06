const userCredentialModel = require('./user-credentials-model');
const { generateSalt, generateHashedPassword } = require('./../authentication/password-hasher');

async function getUserCredential (req, res) {
  const { user_email } = req.body;
  const result = await userCredentialModel.getByEmail(user_email);
  return result;
}

async function handleUserCredential(req, res) {
  const user = await getUserCredential(req, res);
  if (!user) {
    return res.status(403).send({
      message: "User not found",
      isLoggedIn: false,
    });
  } 

  const { password } = req.body;
  const { hashed_password, salt } = user;
  if (generateHashedPassword(password, salt) !== hashed_password) { 
    return res.status(403).send({
      message: "Bad credentials",
      isLoggedIn: false,
    })
  } else {
    return res.status(200).send({
      message: "Login successful",
      isLoggedIn: true,
    })
  }
}

module.exports = {
  getUserCredential,
  handleUserCredential,
}