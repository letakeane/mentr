const programs = require('../seedData/programs.js');
const students = require('../seedData/students.js');
const mentors = require('../seedData/mentors.js');

const createProgram = (knex, program) => {
  const { program_name, module, id } = program;

  return knex('programs').insert({
    program_name,
    module,
    id
  }, 'id');
};


const createStudent = (knex, student) => {
  const { gh_id, preferred_name, slack, email, stack_interests, program_id, avatar_url, id } = student;

  return knex('students').insert({
    gh_id,
    preferred_name,
    avatar_url,
    slack,
    email,
    stack_interests,
    program_id,
    id
  }, 'id');
};

const createMentor = (knex, mentor) => {
  const { gh_id, preferred_name, slack, email, location, phone, accepting_new, availability, company, position, dev_type, stack, pairing_location, avatar_url, preferred_contact, bio } = mentor;

  return knex('mentors').insert({
    gh_id,
    preferred_name,
    preferred_contact,
    bio,
    slack,
    email,
    location,
    avatar_url,
    phone,
    accepting_new,
    availability,
    company,
    position,
    dev_type,
    stack,
    pairing_location
  }, 'id');
};

exports.seed = (knex, Promise) => {
  return knex('students').del()
    .then(() => knex('mentors').del())
    .then(() => knex('programs').del())
    .then(() => {
      const programPromises = [];

      programs.forEach((program) => {
        programPromises.push(createProgram(knex, program));
      });

      return Promise.all(programPromises);
    })
    .then(() => {
      const mentorPromises = [];

      mentors.forEach((mentor) => {
        mentorPromises.push(createMentor(knex, mentor));
      });

      return Promise.all(mentorPromises);
    })
    .then(() => {
      const studentPromises = [];
      
      students.forEach((student) => {
        studentPromises.push(createStudent(knex, student));
      });

      return Promise.all(studentPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
