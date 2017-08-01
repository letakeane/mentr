const admins = require('../seedData/admins.js');

const createAdmin = (knex, admin) => {
  const { gh_id, preferred_name, avatar_url } = admin;

  return knex('admins').insert({
    gh_id,
    preferred_name,
    avatar_url
  }, 'id');
};

exports.seed = (knex, Promise) => {
  return knex('admins').del()
    .then(() => {
      const adminPromises = [];
      
      admins.forEach((admin) => {
        adminPromises.push(createAdmin(knex, admin));
      });

      return Promise.all(adminPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
