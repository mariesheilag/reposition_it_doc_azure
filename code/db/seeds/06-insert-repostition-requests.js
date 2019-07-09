// @ts-nocheck
const csv = require('csv-parser');
const fs = require('fs');
// const parse = require('date-fns/parse');

const rows = [];

fs.createReadStream(`./db/data/${process.env.NODE_ENV}/reposition_requests.csv`)
  // fs.createReadStream('./db/data/test/reposition_requests.csv') // * Date Range Test
  .pipe(csv())
  .on('data', data => rows.push(data));

const setTable = type => {
  switch (type) {
    case 'terminal':
      return 'terminals';
    case 'port':
      return 'ports';
    case 'country':
      return 'countries';
    case 'region':
      return 'regions';
    default:
      return;
  }
};

exports.seed = async knex => {
  try {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const { id: demandId } = await knex('companies')
        .select('id')
        .where({ name: row.demand })
        .first();

      const { id: fromId } = await knex(setTable(row.from_type))
        .select('id')
        .where({ name: row.from })
        .first();

      const { id: toId } = await knex(setTable(row.to_type))
        .select('id')
        .where({ name: row.to })
        .first();

      const whitelistedProviders = await Promise.all(
        row.whitelisted_providers.split(',').map(async name => {
          const { id } = await knex('companies')
            .select('id')
            .where({ name })
            .first();
          return id;
        })
      );

      await knex('reposition_requests').insert({
        demand_id: demandId,
        from_type: setTable(row.from_type),
        from_id: fromId,
        to_type: setTable(row.to_type),
        to_id: toId,
        equipment_type: row.equipment_type,
        whitelisted_providers: whitelistedProviders,
        depot_location: row.depot_location,
        departure_date_start: row.departure_date_start,
        departure_date_end: row.departure_date_end,
        expiration_date: row.expiration_date,
        // departure_date_start: parse(row.departure_date_start, 'yyyy-MM-dd', new Date()).toISOString(),
        // departure_date_end: parse(row.departure_date_end, 'yyyy-MM-dd', new Date()).toISOString(),
        // expiration_date: parse(row.expiration_date, 'yyyy-MM-dd', new Date()).toISOString(),
        deleted_on: null,
      });
    }
    return;
  } catch (err) {
    console.error('Error in inserting Reposition Request Seed Data:\n', err);
    throw err;
  }
};
