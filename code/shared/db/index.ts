import knex from 'knex';
import knexStringCase from 'knex-stringcase';

const config = {
  acquireConnectionTimeout: 5000,
  asyncStackTraces: true,
  client: 'pg',
  connection: process.env.PG_HOST || 'postgres://postgres:password@127.0.0.1:5432/reposition',
  debug: process.env.NODE_ENV === 'development' ? true : false,
  migrations: {
    directory: './db/migrations',
    loadExtensions: ['.js', '.ts'],
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
  pool: {
    min: 2,
    max: 10,
    afterCreate: (conn: any, cb: (err: Error, conn: any) => null) => {
      conn.query(`SET TIME ZONE 'UTC';`, (err: Error) => {
        cb(err, conn);
      });
    },
  },
};

const options = knexStringCase(config);
export default knex(options);

export { BaseRepository } from './baserepository';
