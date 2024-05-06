const userCredentialModel = require('./user-credentials-model');
const { generateSalt, generateHashedPassword } = require('./../authentication/password-hasher');

async function createUserCredential (req, res) {
  const { user_email, password } = req.body;
  const salt = generateSalt();
  const hashedPassword = generateHashedPassword(password, salt);
  const userCredentialObj = {
    user_email: user_email,
    hashed_password: hashedPassword,
    salt: salt,
  }
  try {
    const result = await userCredentialModel.create(userCredentialObj);
    const { id } = result[0];
    res.status(201).send({
      id: id,
      message: "New user, welcome",
      isNewUser: true,
      isLoggedIn: true,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
      isLoggedIn: false
    }) 
  }
}

async function getUserCredential (req, res) {
  const { user_email } = req.body;
  const result = await userCredentialModel.getByEmail(user_email);
  return result;
}

async function handleUserCredential(req, res) {
  const user = await getUserCredential(req, res);
  if (!user) {
    const newUser = await createUserCredential(req, res);
    return newUser;
  } 

  const { password } = req.body;
  const { hashed_password, salt, id } = user;
  if (generateHashedPassword(password, salt) !== hashed_password) { 
    return res.status(403).send({
      message: "Bad credentials",
      isLoggedIn: false,
    })
  } else {
    return res.status(200).send({
      id: id,
      message: "Login successful",
      isLoggedIn: true,
    })
  }
}

module.exports = {
  createUserCredential,
  getUserCredential,
  handleUserCredential,
}