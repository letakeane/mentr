const mentors = require('../seedData/mentors.js');

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
  return knex('mentors').del()
    .then(() => {
      const mentorPromises = [];
      
      mentors.forEach((mentor) => {
        mentorPromises.push(createMentor(knex, mentor));
      });

      return Promise.all(mentorPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
