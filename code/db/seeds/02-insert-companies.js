// @ts-nocheck
const companies = require('../data/companies');

exports.seed = knex => {
  try {
    return knex('companies').insert(companies);
  } catch (err) {
    console.error('Error in inserting Company Seed Data:\n', err);
    throw err;
  }
};
