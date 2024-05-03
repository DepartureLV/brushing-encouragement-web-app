const { BRUSH_TIMESTAMP_TABLE } = require("../../src/global/global");
/**
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(BRUSH_TIMESTAMP_TABLE).del();
  await knex(BRUSH_TIMESTAMP_TABLE).truncate();
  await knex(BRUSH_TIMESTAMP_TABLE).insert([
    {id: 1}
  ]);
};
