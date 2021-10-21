module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './dist/migrations',
  },
  seeds: {
    directory: './dist/seeds'
  },
  migrate: {
    client: 'postgresql',
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
      stub: './src/migrations/config.stub'
    },
    seeds: {
      directory: './src/seeds'
    }
  }
};
