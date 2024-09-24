const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: process.env.DB_HOST || 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

pool.connect()
  .catch(err => console.error('Connection error', err.stack));

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;