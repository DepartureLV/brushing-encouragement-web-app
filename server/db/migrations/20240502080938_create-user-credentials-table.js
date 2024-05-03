const { USER_CREDENTIALS_TABLE } = require("../../src/global/global");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(USER_CREDENTIALS_TABLE, (table) => {
    table.increments('id').primary();
    table.text('user_email');
    table.text('hashed_password');
    table.text('salt');
  });
  
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable(USER_CREDENTIALS_TABLE);
};
