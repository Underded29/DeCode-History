const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ==========================================
// 1. РЕЄСТРАЦІЯ КОРИСТУВАЧА (/api/auth/register)
// ==========================================
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Перевіряємо, чи не зайнятий email або username
    const userExists = await db.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Користувач з таким email або ім\'ям вже існує' });
    }

    // Шифруємо пароль перед збереженням у базу
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Створюємо користувача в БД
    const newUser = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, total_xp, current_streak',
      [username, email, hashedPassword]
    );

    // Створюємо токен доступу (діє 7 днів)
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Повертаємо успішну відповідь на фронтенд
    res.status(201).json({
      message: 'Реєстрація успішна',
      token,
      user: newUser.rows[0]
    });
  } catch (err) {
    console.error('Помилка реєстрації:', err);
    res.status(500).json({ error: 'Помилка сервера під час реєстрації' });
  }
});


// ==========================================
// 2. ВХІД КОРИСТУВАЧА (/api/auth/login)
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Шукаємо користувача за email
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    const user = userResult.rows[0];

    // Перевіряємо, чи збігається пароль
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    // Створюємо токен доступу
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Повертаємо дані (ніколи не відправляємо password_hash на клієнт!)
    res.json({
      message: 'Вхід успішний',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        total_xp: user.total_xp,
        current_streak: user.current_streak
      }
    });
  } catch (err) {
    console.error('Помилка логіну:', err);
    res.status(500).json({ error: 'Помилка сервера під час входу' });
  }
});

module.exports = router;