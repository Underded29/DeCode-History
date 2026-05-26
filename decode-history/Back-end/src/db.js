require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('✅ Підключено до бази даних PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Помилка бази даних:', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};