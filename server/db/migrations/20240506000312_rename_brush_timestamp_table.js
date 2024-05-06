const { BRUSH_TIMESTAMP_TABLE, BRUSH_TIMESTAMP_TABLE_V2 } = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.renameTable(BRUSH_TIMESTAMP_TABLE, BRUSH_TIMESTAMP_TABLE_V2);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.renameTable(BRUSH_TIMESTAMP_TABLE_V2, BRUSH_TIMESTAMP_TABLE);
};
