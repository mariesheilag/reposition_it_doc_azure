// @ts-nocheck
exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.raw(`SET TIME ZONE 'UTC';`),

    knex.schema.createTable('devices', table => {
      table.bigIncrements('id').primary();
      table.string('fingerprint').index();
      table.text('useragent');
      table.string('os', 24);
      table.specificType('ip', 'inet');
      table.datetime('created_on').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('registrations', table => {
      table.bigIncrements('id').primary();
      table.string('name', 255);
      table.string('email', 255).index();
      table.string('company', 255);
      table.string('country', 255);
      table.string('mobile_number', 24);
      table.string('office_number', 24).nullable();
      table.text('useragent');
      table.specificType('ip', 'inet');
      table.datetime('created_on').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('companies', table => {
      table.bigIncrements('id').primary();
      table.string('name', 255);
      table.string('country_of_main_office', 255);
      table.jsonb('addresses').defaultTo('{}'); // validate against /schema/company_addresses.yml
      table.jsonb('contact_info').defaultTo('{}'); // validate against /schema/company_contact_info.yml
      table.datetime('archived_on');
    }),

    knex.schema.createTable('roles', table => {
      table.bigIncrements('id').primary();
      table.string('name', 24).index();
      table.string('description', 255);
      table.datetime('created_on').defaultTo(knex.fn.now());
      table.datetime('archived_on');
    }),

    knex.schema.createTable('users', table => {
      table.bigIncrements('id').primary();
      table
        .bigInteger('role_id')
        .references('roles.id')
        .nullable();
      table.string('name', 255);
      table.string('email', 255).unique();
      table.string('position', 255);
      table.bigInteger('company_id').references('companies.id');
      table.string('mobile_number', 24);
      table.string('office_number', 24).nullable();
      table.datetime('created_on').defaultTo(knex.fn.now());
      table.datetime('archived_on');
    }),

    knex.schema.createTable('permissions', table => {
      table.bigIncrements('id').primary();
      table.string('scope', 24).index();
      table.string('resource', 60).index();
      table.string('description', 255);
      table.datetime('created_on').defaultTo(knex.fn.now());
      table.datetime('archived_on');
    }),

    knex.schema.createTable('role_permissions', table => {
      table.bigInteger('role_id').references('roles.id');
      table.bigInteger('permission_id').references('permissions.id');
      table.primary(['role_id', 'permission_id']);
    }),

    knex.schema.createTable('user_permissions', table => {
      table
        .bigInteger('user_id')
        .references('users.id')
        .onDelete('CASCADE');
      table.bigInteger('permission_id').references('permissions.id');
      table.boolean('allow').defaultTo(false);
      table.datetime('assigned_on').defaultTo(knex.fn.now());
      table.primary(['user_id', 'permission_id']);
    }),

    knex.schema.createTable('otp', table => {
      table.bigIncrements('id').primary();
      table
        .bigInteger('user_id')
        .references('users.id')
        .onDelete('CASCADE');
      table.text('otp'); // otp hash + fingerprint + receipient
      table.datetime('created_on').defaultTo(knex.fn.now());
      table.datetime('expires_on');
      table.datetime('verified_on');
    }),

    knex.schema.createTable('sessions', table => {
      table.bigIncrements('id').primary();
      table
        .bigInteger('user_id')
        .references('users.id')
        .onDelete('CASCADE');
      table.string('fingerprint').index();
      table.datetime('created_on').defaultTo(knex.fn.now());
      table.datetime('expires_on');
      table.datetime('revoked_on');
    }),

    knex.schema.createTable('tokens', table => {
      table.uuid('id').primary();
      table.string('fingerprint').index();
      table.string('token');
      table.datetime('created_on').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('activities', table => {
      table.bigIncrements('id').primary();
      table.string('fingerprint').index();
      table
        .bigInteger('company_id')
        .references('companies.id')
        .nullable();
      table
        .bigInteger('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .nullable();
      table.string('context', 24); // model
      table.string('action', 24);
      table.string('message', 255);
      table.specificType('ip', 'inet');
      table.jsonb('data').defaultTo('{}');
      table.timestamp('created_on').defaultTo(knex.fn.now(6));
      table.index(['action', 'context']);
    }),

    knex.schema.createTable('regions', table => {
      table.bigIncrements('id').primary();
      table.string('name', 1000).unique();
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('countries', table => {
      table.bigIncrements('id').primary();
      table
        .integer('region_id')
        .unsigned()
        .references('regions.id');
      table.string('name', 1000).unique();
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('ports', table => {
      table.bigIncrements('id').primary();
      table
        .integer('country_id')
        .unsigned()
        .references('countries.id');
      table.string('name', 1000);
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('terminals', table => {
      table.bigIncrements('id').primary();
      table
        .integer('port_id')
        .unsigned()
        .references('ports.id');
      table.string('name', 1000);
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('slot_offers', table => {
      table.bigIncrements('id').primary();
      table
        .integer('supplier_id')
        .unsigned()
        .references('companies.id');
      table
        .integer('terminal_from')
        .unsigned()
        .references('terminals.id');
      table
        .integer('terminal_to')
        .unsigned()
        .references('terminals.id');
      table
        .bigInteger('price_unit')
        .unsigned()
        .notNullable();
      table.bigInteger('quantity_twenty_original').unsigned();
      table.bigInteger('quantity_twenty_current').unsigned();
      table.bigInteger('quantity_forty_original').unsigned();
      table.bigInteger('quantity_forty_current').unsigned();
      table.specificType('whitelisted_clients', 'integer ARRAY').notNullable();
      table.date('departure_date_start', { precision: 6, useTz: true }).notNullable();
      table.date('departure_date_end', { precision: 6, useTz: true }).notNullable();
      table.date('arrival_date_start', { precision: 6, useTz: true }).notNullable();
      table.date('arrival_date_end', { precision: 6, useTz: true }).notNullable();
      table.date('expiration_date', { precision: 6, useTz: true }).notNullable();
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('reposition_requests', table => {
      table.bigIncrements('id').primary();
      table
        .integer('demand_id')
        .unsigned()
        .references('companies.id');
      table.enu('from_type', ['terminals', 'ports', 'countries', 'regions']).notNullable();
      table
        .integer('from_id')
        .unsigned()
        .notNullable();
      table.enu('to_type', ['terminals', 'ports', 'countries', 'regions']).notNullable();
      table
        .bigInteger('to_id')
        .unsigned()
        .notNullable();
      table.enu('equipment_type', ['twenty', 'forty', 'and', 'or']).notNullable();
      table.specificType('whitelisted_providers', 'integer ARRAY').notNullable();
      table.date('departure_date_start', { precision: 6, useTz: true }).notNullable();
      table.date('departure_date_end', { precision: 6, useTz: true }).notNullable();
      table.date('expiration_date', { precision: 6, useTz: true }).notNullable();
      table.string('depot_location', 1000);
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('bookings', table => {
      table.bigIncrements('id').primary();
      table
        .integer('supplier_id')
        .unsigned()
        .references('companies.id');
      table
        .integer('demand_id')
        .unsigned()
        .references('companies.id');
      table
        .integer('slot_offer_id')
        .unsigned()
        .references('slot_offers.id');
      table
        .bigInteger('quantity')
        .unsigned()
        .notNullable();
      table.enu('status', ['active', 'delivered', 'completed', 'inactive', 'open', 'reposition_request']);
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),

    knex.schema.createTable('booking_notes', table => {
      table.bigIncrements('id').primary();
      table
        .integer('booking_id')
        .references('bookings.id')
        .unsigned();
      table
        .bigInteger('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .unsigned();
      table.string('description', 1000);
      table.datetime('deleted_on', { precision: 6, useTz: true });
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTableIfExists('tokens'),
    knex.schema.dropTableIfExists('booking_notes'),
    knex.schema.dropTableIfExists('bookings'),
    knex.schema.dropTableIfExists('reposition_requests'),
    knex.schema.dropTableIfExists('slot_offers'),
    knex.schema.dropTableIfExists('terminals'),
    knex.schema.dropTableIfExists('ports'),
    knex.schema.dropTableIfExists('countries'),
    knex.schema.dropTableIfExists('regions'),
    knex.schema.dropTableIfExists('activities'),
    knex.schema.dropTableIfExists('sessions'),
    knex.schema.dropTableIfExists('otp'),
    knex.schema.dropTableIfExists('user_permissions'),
    knex.schema.dropTableIfExists('role_permissions'),
    knex.schema.dropTableIfExists('permissions'),
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('roles'),
    knex.schema.dropTableIfExists('companies'),
    knex.schema.dropTableIfExists('registrations'),
    knex.schema.dropTableIfExists('devices'),
  ]);
