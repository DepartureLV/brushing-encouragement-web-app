const { BRUSH_TIMESTAMP_TABLE } = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(BRUSH_TIMESTAMP_TABLE, (table) => {
        table.increments('id').primary();
        table.timestamp('brush_timestamp').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(BRUSH_TIMESTAMP_TABLE);
};
