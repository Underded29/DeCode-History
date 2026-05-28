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
    const userExists = await db.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Користувач з таким email або ім\'ям вже існує' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Зберігаємо користувача
    const insertResult = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Дістаємо створеного користувача за його новим ID
    const newUserResult = await db.query(
      'SELECT id, username, email, total_xp, current_streak FROM users WHERE id = ?',
      [insertResult.insertId]
    );

    const newUser = newUserResult.rows[0];

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Реєстрація успішна',
      token,
      user: newUser
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
    const userResult = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Невірний email або пароль' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

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