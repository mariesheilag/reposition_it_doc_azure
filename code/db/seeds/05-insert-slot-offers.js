// @ts-nocheck
const csv = require('csv-parser');
const fs = require('fs');
// const parse = require('date-fns/parse');

const rows = [];

fs.createReadStream(`./db/data/${process.env.NODE_ENV}/slot_offers.csv`)
  // fs.createReadStream('./db/data/test/slot_offers.csv') // * Date Range Test
  .pipe(csv())
  .on('data', data => rows.push(data));

exports.seed = async knex => {
  try {
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const { id: supplierId } = await knex('companies')
        .select('*')
        .where({ name: row.supplier })
        .first();

      const { id: terminalFromId } = await knex('terminals')
        .select('*')
        .where({ name: row.terminal_from })
        .first();

      const { id: terminalToId } = await knex('terminals')
        .select('*')
        .where({ name: row.terminal_to })
        .first();

      const whitelistedClients = await Promise.all(
        row.whitelisted_clients.split(',').map(async name => {
          const { id } = await knex('companies')
            .select('*')
            .where({ name })
            .first();
          return id;
        })
      );

      await knex('slot_offers').insert({
        supplier_id: supplierId,
        terminal_from: terminalFromId,
        terminal_to: terminalToId,
        price_unit: row.price_unit,
        quantity_twenty_original: row.quantity_twenty_original,
        quantity_twenty_current: row.quantity_twenty_current,
        quantity_forty_original: row.quantity_forty_original,
        quantity_forty_current: row.quantity_forty_current,
        whitelisted_clients: whitelistedClients,
        departure_date_start: row.departure_date_start,
        departure_date_end: row.departure_date_end,
        arrival_date_start: row.arrival_date_start,
        arrival_date_end: row.arrival_date_end,
        expiration_date: row.expiration_date,
        // departure_date_start: parse(row.departure_date_start, 'yyyy-MM-dd', new Date()).toISOString(),
        // departure_date_end: parse(row.departure_date_end, 'yyyy-MM-dd', new Date()).toISOString(),
        // arrival_date_start: parse(row.arrival_date_start, 'yyyy-MM-dd', new Date()).toISOString(),
        // arrival_date_end: parse(row.arrival_date_end, 'yyyy-MM-dd', new Date()).toISOString(),
        // expiration_date: parse(row.expiration_date, 'yyyy-MM-dd', new Date()).toISOString(),
        deleted_on: null,
      });
    }
    return;
  } catch (err) {
    console.error('Error in inserting Slot Offer Seed Data:\n', err);
    throw err;
  }
};
