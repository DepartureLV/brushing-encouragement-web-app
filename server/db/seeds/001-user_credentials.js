const {
  USER_CREDENTIALS_TABLE,
  SCORES_TABLE,
  BRUSH_TIMESTAMP_TABLE_V2,
  FLOSSY_TABLE_V2,
} = require("../../src/global/global");
const {
  generateHashedPassword,
  generateSalt,
} = require("../../src/authentication/password-hasher");
const crypto = require("crypto");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(SCORES_TABLE).del();
  await knex(FLOSSY_TABLE_V2).del();
  await knex(BRUSH_TIMESTAMP_TABLE_V2).del();
  await knex(USER_CREDENTIALS_TABLE).del();
  const brendaPasswordSalt = generateSalt();
  const brendaPlainTextPassword = "test";
  const brendaCredentialsEntry = {
    id: 1,
    user_email: "brenda@gmail.com",
    salt: brendaPasswordSalt,
    hashed_password: generateHashedPassword(
      brendaPlainTextPassword,
      brendaPasswordSalt
    ),
  };

  await knex(USER_CREDENTIALS_TABLE).insert([
    {
      id: 1,
      user_email: "drenba@gmail.com",
      salt: brendaPasswordSalt,
      hashed_password: generateHashedPassword(
        brendaPlainTextPassword,
        brendaPasswordSalt
      ),
    },
    {
      id: 2,
      user_email: "DominikIsACat@gmail.com",
      salt: brendaPasswordSalt,
      hashed_password: generateHashedPassword(
        brendaPlainTextPassword,
        brendaPasswordSalt
      ),
    },
    {
      id: 3,
      user_email: "Buddhist@gmail.com",
      salt: brendaPasswordSalt,
      hashed_password: generateHashedPassword(
        brendaPlainTextPassword,
        brendaPasswordSalt
      ),
    },
    {
      id: 4,
      user_email: "Citypop@gmail.com",
      salt: brendaPasswordSalt,
      hashed_password: generateHashedPassword(
        brendaPlainTextPassword,
        brendaPasswordSalt
      ),
    },
    {
      id: 5,
      user_email: "badren@gmail.com",
      salt: brendaPasswordSalt,
      hashed_password: generateHashedPassword(
        brendaPlainTextPassword,
        brendaPasswordSalt
      ),
    },
  ]);
  await knex.raw(
    `select setval(\'${USER_CREDENTIALS_TABLE}_id_seq\', max(id)) from ${USER_CREDENTIALS_TABLE}`
  );
};
