const { USER_CREDENTIALS_TABLE, SCORES_TABLE, BRUSH_TIMESTAMP_TABLE_V2 } = require("../../src/global/global");
const { generateHashedPassword, generateSalt } = require('../../src/authentication/password-hasher')
const crypto = require('crypto');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(SCORES_TABLE).del();
  await knex(BRUSH_TIMESTAMP_TABLE_V2).del();
  await knex(USER_CREDENTIALS_TABLE).del();
  const brendaPasswordSalt = generateSalt();
  const brendaPlainTextPassword = "test";
  const brendaCredentialsEntry = {
    id: 1, 
    user_email: 'brenda@gmail.com', 
    salt: brendaPasswordSalt, 
    hashed_password: generateHashedPassword(brendaPlainTextPassword, brendaPasswordSalt)};

  await knex(USER_CREDENTIALS_TABLE).insert([
    brendaCredentialsEntry,
  ]);
};
