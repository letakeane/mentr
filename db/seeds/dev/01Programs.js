const programs = require('../seedData/programs.js');

const createProgram = (knex, program) => {
  const { program_name, module } = program;
  return knex('programs').insert({
    program_name,
    module
  }, 'id');
};

exports.seed = (knex, Promise) => {
  return knex('programs').del()
    .then(() => {
      const programPromises = [];
      programs.forEach((program) => {
        programPromises.push(createProgram(knex, program));
      });

      return Promise.all(programPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};