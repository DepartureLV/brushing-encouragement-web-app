const {
  FLOSSY_TABLE,
  USER_CREDENTIALS_TABLE,
} = require("../../src/global/global");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(FLOSSY_TABLE, (table) => {
    table.increments("id").primary();
    table.timestamp("flossy_timestamp").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned().notNullable();

    table.foreign("user_id").references(`${USER_CREDENTIALS_TABLE}.id`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(FLOSSY_TABLE);
};
