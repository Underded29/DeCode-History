const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/upload-avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не завантажено' });
    }

    // Формуємо URL до файлу (залежить від того, як у тебе налаштований статик)
    const avatarUrl = `/uploads/${req.file.filename}`;

    // Оновлюємо базу даних
    await db.query('UPDATE users SET avatar_url = ? WHERE id = ?', [avatarUrl, req.user.id]);

    res.json({ avatarUrl: avatarUrl });
  } catch (err) {
    console.error('Помилка сервера при завантаженні:', err);
    res.status(500).json({ error: 'Не вдалося оновити аватар' });
  }
});

function calculateLevelData(totalXp) {
  let level = 1;
  let currentXP = totalXp;
  let nextLevelXP = 500;

  while (currentXP >= nextLevelXP) {
    level++;
    currentXP -= nextLevelXP;
    nextLevelXP = Math.floor(nextLevelXP * 1.3);
  }

  return { level, currentXP, nextLevelXP };
}

// ==========================================
// 1. Отримання даних профілю
// ==========================================
router.get('/profile', auth, async (req, res) => {
  try {
    const userResult = await db.query(
      "SELECT id, username, email, total_xp, current_streak, DATE_FORMAT(last_active_date, '%Y-%m-%d') as last_active_date, avatar_url FROM users WHERE id = ?",
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Користувача не знайдено' });
    }

    const user = userResult.rows[0];

    const savedResult = await db.query('SELECT myth_id FROM saved_myths WHERE user_id = ?', [user.id]);
    const savedMyths = savedResult.rows.map(row => row.myth_id);

    const activityResult = await db.query(
      'SELECT myth_id, earned_xp, created_at FROM completed_myths WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    );
    const recentActivity = activityResult.rows.map(row => ({
      mythId: row.myth_id,
      xp: row.earned_xp,
      date: row.created_at
    }));

    const completedCount = await db.query(
      'SELECT COUNT(*) as count FROM completed_myths WHERE user_id = ?',
      [user.id]
    );

    const { level, currentXP, nextLevelXP } = calculateLevelData(user.total_xp);

    let activeStreak = user.current_streak || 0;
    
    if (activeStreak > 0 && user.last_active_date) {
        const dateQuery = await db.query("SELECT DATE_FORMAT(CURDATE() - INTERVAL 1 DAY, '%Y-%m-%d') as yesterday, DATE_FORMAT(CURDATE(), '%Y-%m-%d') as today");
        const yesterday = dateQuery.rows[0].yesterday;
        const today = dateQuery.rows[0].today;

        if (user.last_active_date !== today && user.last_active_date !== yesterday) {
            activeStreak = 0;
            await db.query('UPDATE users SET current_streak = 0 WHERE id = ?', [user.id]);
        }
    }

    res.json({
      id: user.id,
      name: user.username,
      email: user.email,
      level: level,
      currentXP: currentXP,
      nextLevelXP: nextLevelXP,
      avatarUrl: user.avatar_url || null, 
      stats: {
        resolved: parseInt(completedCount.rows[0].count) || 0,
        inProgress: 0, 
        saved: savedMyths.length,
        streakDays: activeStreak
      },
      recentActivity: recentActivity, 
      savedMyths: savedMyths          
    });
  } catch (err) {
    console.error('Помилка отримання профілю:', err.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});

// ==========================================
// 2. Оновлення текстових даних профілю
// ==========================================
router.put('/profile', auth, async (req, res) => {
  const { name, email } = req.body;

  try {
    if (email) {
      const emailCheck = await db.query(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, req.user.id]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ error: 'Цей email вже використовується іншим акаунтом' });
      }
    }

    await db.query(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [name, email, req.user.id]
    );

    const updatedUser = await db.query('SELECT id, username, email, total_xp, current_streak FROM users WHERE id = ?', [req.user.id]);
    const user = updatedUser.rows[0];
    
    const completedCount = await db.query('SELECT COUNT(*) as count FROM completed_myths WHERE user_id = ?', [user.id]);
    const { level, currentXP, nextLevelXP } = calculateLevelData(user.total_xp);

    res.json({
      id: user.id,
      name: user.username,
      email: user.email,
      level: level,
      currentXP: currentXP,
      nextLevelXP: nextLevelXP,
      stats: {
        resolved: parseInt(completedCount.rows[0].count) || 0,
        inProgress: 0,
        saved: 0,
        streakDays: user.current_streak || 0
      },
      recentActivity: [],
      savedMyths: []
    });
  } catch (err) {
    console.error('Помилка оновлення профілю:', err.message);
    res.status(500).json({ error: 'Не вдалося оновити дані' });
  }
});

// ==========================================
// 3. Збереження прогресу міфу
// ==========================================
router.post('/complete-myth', auth, async (req, res) => {
  const { mythId, score, earnedXp } = req.body;

  try {
    const checkMyth = await db.query(
      'SELECT * FROM completed_myths WHERE user_id = ? AND myth_id = ?',
      [req.user.id, mythId]
    );

    if (checkMyth.rows.length > 0) {
      return res.status(400).json({ error: 'Ви вже розвінчали цей міф і отримали за нього досвід!' });
    }

    await db.query(
      'INSERT INTO completed_myths (user_id, myth_id, score, earned_xp) VALUES (?, ?, ?, ?)',
      [req.user.id, mythId, score, earnedXp]
    );

    const userStatus = await db.query(
      "SELECT current_streak, DATE_FORMAT(last_active_date, '%Y-%m-%d') as last_active_date FROM users WHERE id = ?", 
      [req.user.id]
    );
    
    let streak = userStatus.rows[0].current_streak || 0;
    const lastActive = userStatus.rows[0].last_active_date;

    const dateQuery = await db.query("SELECT DATE_FORMAT(CURDATE(), '%Y-%m-%d') as today, DATE_FORMAT(CURDATE() - INTERVAL 1 DAY, '%Y-%m-%d') as yesterday");
    const today = dateQuery.rows[0].today;
    const yesterday = dateQuery.rows[0].yesterday;

    if (lastActive === today) {
      streak = streak; 
    } else if (lastActive === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }

    await db.query(
      'UPDATE users SET total_xp = total_xp + ?, current_streak = ?, last_active_date = CURDATE() WHERE id = ?',
      [earnedXp, streak, req.user.id]
    );

    const updatedUser = await db.query('SELECT total_xp, current_streak FROM users WHERE id = ?', [req.user.id]);
    const totalXp = updatedUser.rows[0].total_xp;
    const currentStreak = updatedUser.rows[0].current_streak;
    const { level } = calculateLevelData(totalXp);

    res.json({
      message: 'Міф успішно розвінчано!',
      addedXp: earnedXp,
      totalXp: totalXp,
      newLevel: level,
      currentStreak: currentStreak
    });

  } catch (err) {
    console.error('Помилка збереження прогресу:', err.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера при збереженні прогресу' });
  }
});

// ==========================================
// 4. Підписка на розсилку
// ==========================================
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email обовʼязковий для підписки' });
  }

  try {
    const checkEmail = await db.query('SELECT id FROM subscribers WHERE email = ?', [email]);

    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: 'Цей email вже підписаний на розсилку!' });
    }

    await db.query('INSERT INTO subscribers (email) VALUES (?)', [email]);
    res.json({ message: 'Ви успішно підписалися на розсилку!' });

  } catch (err) {
    console.error('Помилка при підписці:', err.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера. Спробуйте пізніше.' });
  }
});

router.post('/toggle-save', auth, async (req, res) => {
  const { mythId } = req.body;

  try {
    const checkSave = await db.query(
      'SELECT * FROM saved_myths WHERE user_id = ? AND myth_id = ?',
      [req.user.id, mythId]
    );

    if (checkSave.rows.length > 0) {
      await db.query('DELETE FROM saved_myths WHERE user_id = ? AND myth_id = ?', [req.user.id, mythId]);
      res.json({ message: 'Міф видалено зі збережених', isSaved: false });
    } else {
      await db.query('INSERT INTO saved_myths (user_id, myth_id) VALUES (?, ?)', [req.user.id, mythId]);
      res.json({ message: 'Міф додано до збережених', isSaved: true });
    }
  } catch (err) {
    console.error('Помилка збереження міфу:', err.message);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

module.exports = router;