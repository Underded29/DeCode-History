require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/db'); 
const path = require('path');

// Імпортуємо наш новий роутер авторизації
const authRoutes = require('./src/routes/auth'); 

const app = express();

const userRoutes = require('./src/routes/user');
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Базовий тестовий маршрут
app.get('/', (req, res) => {
  res.json({ message: 'Сервер DeCode працює та готовий до роботи!' });
});

// Тестовий маршрут для перевірки бази даних
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ 
      success: true, 
      message: 'База даних відповідає!', 
      time: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// ПІДКЛЮЧАЄМО РОУТИ АВТОРИЗАЦІЇ
// Всі запити, які починаються з /api/auth, будуть йти у файл auth.js
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Підключаємо роутер користувачів

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`🚀 Сервер успішно запущено на порту ${PORT}`);
  
  try {
    await db.query('SELECT 1');
    console.log('✅ Базу даних успішно знайдено та підключено!');
  } catch (err) {
    console.error('❌ Помилка підключення до БД:', err.message);
  }
});