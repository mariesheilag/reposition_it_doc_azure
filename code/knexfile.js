require('dotenv').config();

const config = {
  acquireConnectionTimeout: 5000,
    asyncStackTraces: true,
    client: 'pg',
    connection: process.env.PG_HOST || 'postgres://postgres:password@127.0.0.1:5432/reposition',
    migrations: {
      directory: './db/migrations',
      loadExtensions: ['.js', '.ts'],
      tableName: 'knex_migrations',
    },
    pool: { min: 2, max: 10 },
    seeds: {
      directory: './db/seeds',
      loadExtensions: ['.js', '.ts'],
    },
};
module.exports = {
  development: {
    ...config
  },
  test: {
    ...config
  },
};
