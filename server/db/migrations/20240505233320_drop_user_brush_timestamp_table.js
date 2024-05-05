const { USER_BRUSH_TIMESTAMP_TABLE } = require("../../src/global/global");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.dropTable(USER_BRUSH_TIMESTAMP_TABLE);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.createTable(USER_BRUSH_TIMESTAMP_TABLE, (table) => {
    table.integer('user_id').notNullable();
    table.integer('brush_id').notNullable();

    table.unique(['user_id', 'brush_id'], {
      indexName: 'idx_user_brush_timestamp_id',
    });
  });
};
