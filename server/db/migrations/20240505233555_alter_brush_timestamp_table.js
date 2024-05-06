const { BRUSH_TIMESTAMP_TABLE, USER_CREDENTIALS_TABLE } = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable(BRUSH_TIMESTAMP_TABLE, (table) => {
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references(`${USER_CREDENTIALS_TABLE}.id`);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(BRUSH_TIMESTAMP_TABLE, (table) => {
    table.dropColumn('user_id');
  })
  
};
