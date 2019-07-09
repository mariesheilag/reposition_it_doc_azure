// @ts-nocheck
const csv = require('csv-parser');
const fs = require('fs');

const rows = [];

fs.createReadStream('./db/data/terminals.csv')
  .pipe(csv())
  .on('data', data => rows.push(data));

exports.seed = async knex => {
  try {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const regions = await knex('regions')
        .select('*')
        .where({ name: row.region });

      let regionId;

      if (regions[0] === undefined) {
        const result = await knex('regions')
          .returning('id')
          .insert({ name: row.region, deleted_on: null });
        regionId = result[0];
      } else {
        regionId = regions[0].id;
      }

      const countries = await knex('countries')
        .select('*')
        .where({ name: row.country });

      let countryId;

      if (countries[0] === undefined) {
        const result = await knex('countries')
          .returning('id')
          .insert({ name: row.country, region_id: regionId, deleted_on: null });
        countryId = result[0];
      } else {
        countryId = countries[0].id;
      }

      const ports = await knex('ports')
        .select('*')
        .where({ name: row.port });

      let portId;

      if (ports[0] === undefined) {
        const result = await knex('ports')
          .returning('id')
          .insert({ name: row.port, country_id: countryId, deleted_on: null });
        portId = result[0];
      } else {
        portId = ports[0].id;
      }

      const terminals = await knex('terminals')
        .select('*')
        .where({ name: row.terminal });

      if (terminals[0] === undefined) {
        const result = await knex('terminals')
          .returning('id')
          .insert({ name: row.terminal, port_id: portId, deleted_on: null });
      }
    }
    return;
  } catch (err) {
    console.error('Error in inserting Terminal Seed Data:\n', err);
    throw err;
  }
};
