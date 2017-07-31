exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('admins', (table) => {
      table.increments('id').primary();
      table.integer('gh_id');
      table.string('preferred_name');
      table.string('avatar_url');
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('admins'),
  ]);
};
