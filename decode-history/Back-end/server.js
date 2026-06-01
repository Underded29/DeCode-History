require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/db'); 
const path = require('path');

const authRoutes = require('./src/routes/auth'); 

const app = express();

module.exports = app;

const userRoutes = require('./src/routes/user');
app.use(cors({
  origin: [
    'https://history.science.kh.ua',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Підключаємо роутер користувачів

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Сервер успішно запущено на http://${HOST}:${PORT}`);
});