exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mentors', (table) => {
      table.increments('id').primary();
      table.integer('gh_id');
      table.string('location');
      table.string('preferred_contact');
      table.string('bio');
      table.string('preferred_name');
      table.string('slack');
      table.string('email');
      table.string('phone');
      table.string('accepting_new');
      table.string('availability');
      table.string('company');
      table.string('position');
      table.string('dev_type');
      table.string('stack');
      table.string('pairing_location');
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mentors'),
  ]);
};
