// @ts-nocheck
exports.seed = (knex, Promise) => {
  try {
    // return Promise.all([
    //   knex.schema.dropTableIfExists('booking_notes'),
    //   knex.schema.dropTableIfExists('bookings'),
    //   knex.schema.dropTableIfExists('reposition_requests'),
    //   knex.schema.dropTableIfExists('slot_offers'),
    //   knex.schema.dropTableIfExists('terminals'),
    //   knex.schema.dropTableIfExists('ports'),
    //   knex.schema.dropTableIfExists('countries'),
    //   knex.schema.dropTableIfExists('regions'),
    //   knex.schema.dropTableIfExists('activities'),
    //   knex.schema.dropTableIfExists('sessions'),
    //   knex.schema.dropTableIfExists('otp'),
    //   knex.schema.dropTableIfExists('user_permissions'),
    //   knex.schema.dropTableIfExists('role_permissions'),
    //   knex.schema.dropTableIfExists('permissions'),
    //   knex.schema.dropTableIfExists('users'),
    //   knex.schema.dropTableIfExists('roles'),
    //   knex.schema.dropTableIfExists('companies'),
    //   knex.schema.dropTableIfExists('registrations'),
    //   knex.schema.dropTableIfExists('devices'),
    // ]);
  } catch (err) {
    console.error('Error in clearing Seed Data:\n', err);
    throw err;
  }
};
