const { USER_CREDENTIALS_TABLE, SCORES_TABLE } = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(SCORES_TABLE).del();
  await knex(SCORES_TABLE).insert([
    {id: 1, user_id:1, streak_score: 10, star_score: 0},
  ]);
};
