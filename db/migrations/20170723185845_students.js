exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.string('preferred_name');
      table.string('slack');
      table.string('email');
      table.string('stack_interests');
      table.integer('program_id').unsigned();
      table.foreign('program_id').references('programs.id');
      table.timestamps();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('students'),
  ]);
};