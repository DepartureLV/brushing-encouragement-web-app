const { BRUSH_TIMESTAMP_TABLE_V2 } = require("../../src/global/global");
/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(BRUSH_TIMESTAMP_TABLE_V2).del();
  await knex(BRUSH_TIMESTAMP_TABLE_V2).truncate();
  await knex(BRUSH_TIMESTAMP_TABLE_V2).insert([
    {id: 1, user_id: 1},
  ]);
};
