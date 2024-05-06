const knex = require("./../knex");
const { USER_CREDENTIALS_TABLE } = require ("./../global/global");

function getByEmail(userEmail) {
  return knex
  .select()
  .from(USER_CREDENTIALS_TABLE)
  .where('user_email', userEmail)
  .first();
}

module.exports = {
  getByEmail,
}