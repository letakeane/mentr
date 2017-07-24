exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('programs', (table) => {
      table.increments('id').primary();
      table.string('program_name');
      table.integer('module');
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('programs'),
  ]);
};