const students = require('../seedData/students.js');

const createStudent = (knex, student) => {
  const { preferred_name, slack, email, stack_interests, program_id } = student;
  return knex('students').insert({
    preferred_name,
    slack,
    email,
    stack_interests,
    program_id,
  }, 'id');
};

exports.seed = (knex, Promise) => {
  return knex('students').del()
    .then(() => {
      const studentPromises = [];
      students.forEach((student) => {
        studentPromises.push(createStudent(knex, student));
      });

      return Promise.all(studentPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};