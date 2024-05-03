const { USER_CREDENTIALS_TABLE, SCORES_TABLE } = require("../../src/global/global");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable(SCORES_TABLE, (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('streak_score').notNullable();
    table.integer('star_score').notNullable();

    table.foreign('user_id').references(`${USER_CREDENTIALS_TABLE}.id`)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable(SCORES_TABLE);
};
