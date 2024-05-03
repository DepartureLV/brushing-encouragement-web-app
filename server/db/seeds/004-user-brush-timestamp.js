const { USER_BRUSH_TIMESTAMP_TABLE } = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(USER_BRUSH_TIMESTAMP_TABLE).del()
  await knex(USER_BRUSH_TIMESTAMP_TABLE).insert([
    {user_id: 1, brush_id: 1},
  ]);
};
