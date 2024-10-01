const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'mydatabase',
  password: process.env.POSTGRES_PASSWORD || 'password',
  port: process.env.DB_PORT || 5433,
});

pool.connect()
  .catch(err => console.error('Connection error', err.stack));

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;