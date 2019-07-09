// @ts-nocheck
const users = require('../data/users');

const createUser = (knex, user) => {
  const { company, ...userProps } = user;
  return knex('companies')
    .where('name', company)
    .first()
    .then(compRecord => {
      return knex('users').insert({
        company_id: compRecord.id,
        ...userProps,
      });
    });
};

exports.seed = (knex, Promise) => {
  try {
    return Promise.all(users.map(user => createUser(knex, user)));
  } catch (err) {
    console.error('Error in inserting User Seed Data:\n', err);
    throw err;
  }
};
