require('dotenv').config();
const mysql = require('mysql2/promise');

// Створюємо пул підключень 
const pool = mysql.createPool(process.env.DATABASE_URL);

// Перевірка підключення при запуску
pool.getConnection()
  .then(connection => {
    console.log('✅ Підключено до бази даних MySQL');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Помилка підключення до MySQL:', err.message);
  });

module.exports = {
  query: async (text, params) => {
    const [result] = await pool.query(text, params);
    
    if (Array.isArray(result)) {
      return { rows: result };
    }
  
    return { rows: [], insertId: result.insertId, affectedRows: result.affectedRows };
  },
};