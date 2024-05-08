const {
  USER_CREDENTIALS_TABLE,
  SCORES_TABLE,
} = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(SCORES_TABLE).del();
  await knex(SCORES_TABLE).insert([
    { id: 1, user_id: 1, streak_score: 10, star_score: 20 },
    { id: 2, user_id: 2, streak_score: 1, star_score: 32 },
    { id: 3, user_id: 3, streak_score: 3, star_score: 8 },
    { id: 4, user_id: 4, streak_score: 12, star_score: 48 },
    { id: 5, user_id: 5, streak_score: 8, star_score: 22 },
  ]);
  await knex.raw(
    `select setval(\'${SCORES_TABLE}_id_seq\', max(id)) from ${SCORES_TABLE}`
  );
};
