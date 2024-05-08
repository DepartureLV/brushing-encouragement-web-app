const { FLOSSY_TABLE, FLOSSY_TABLE_V2 } = require("../../src/global/global");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.renameTable(FLOSSY_TABLE, FLOSSY_TABLE_V2);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.renameTable(FLOSSY_TABLE_V2, FLOSSY_TABLE);
};
