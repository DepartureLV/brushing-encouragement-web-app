const { FLOSSY_TABLE_V2 } = require("../../src/global/global");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(FLOSSY_TABLE_V2).del();
  await knex(FLOSSY_TABLE_V2).truncate();
  await knex(FLOSSY_TABLE_V2).insert([{ id: 1, user_id: 1 }]);
  await knex.raw(
    `select setval(\'brush_timestamp_id_seq\', max(id)) from ${FLOSSY_TABLE_V2}`
  );
};
