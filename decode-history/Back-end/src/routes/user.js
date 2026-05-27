const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Створюємо папку uploads, якщо її немає
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Налаштування Multer: де і як зберігати файли
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    // Назва файлу: idКористувача-дата.розширення (напр. 2-1689000.jpg)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
// ==========================================
// ХЕЛПЕР: Динамічний розрахунок рівня
// ==========================================
function calculateLevelData(totalXp) {
  let level = 1;
  let currentXP = totalXp;
  let nextLevelXP = 500; // Базова кількість XP для отримання 2-го рівня

  // Віднімаємо XP рівень за рівнем, поки не залишиться "хвіст" поточного рівня
  while (currentXP >= nextLevelXP) {
    level++;
    currentXP -= nextLevelXP;
    // Збільшуємо вимогу для наступного рівня на 30% (коефіцієнт 1.3)
    nextLevelXP = Math.floor(nextLevelXP * 1.3);
  }

  return { level, currentXP, nextLevelXP };
}

// ==========================================
// 1. Отримання даних профілю (GET /api/users/profile)
// ==========================================
router.get('/profile', auth, async (req, res) => {
  try {
    // ДОДАЛИ last_active_date У ЗАПИТ
    const userResult = await db.query(
      'SELECT id, username, email, total_xp, current_streak, last_active_date::text, avatar_url FROM users WHERE id = $1',
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Користувача не знайдено' });
    }

    const user = userResult.rows[0];

    const savedResult = await db.query('SELECT myth_id FROM saved_myths WHERE user_id = $1', [user.id]);
    const savedMyths = savedResult.rows.map(row => row.myth_id);

    const activityResult = await db.query(
      'SELECT myth_id, earned_xp, created_at FROM completed_myths WHERE user_id = $1 ORDER BY created_at DESC',
      [user.id]
    );
    const recentActivity = activityResult.rows.map(row => ({
      mythId: row.myth_id,
      xp: row.earned_xp,
      date: row.created_at
    }));

    const completedCount = await db.query(
      'SELECT COUNT(*) FROM completed_myths WHERE user_id = $1',
      [user.id]
    );

    const { level, currentXP, nextLevelXP } = calculateLevelData(user.total_xp);

    // ==========================================
    // ЛОГІКА ПЕРЕВІРКИ СЕРІЇ ПРИ ЗАВАНТАЖЕННІ ПРОФІЛЮ
    // ==========================================
    let activeStreak = user.current_streak || 0;
    
    if (activeStreak > 0 && user.last_active_date) {
        // Отримуємо вчорашню дату з бази для точного порівняння
        const dateQuery = await db.query("SELECT (CURRENT_DATE - INTERVAL '1 day')::date::text as yesterday, CURRENT_DATE::text as today");
        const yesterday = dateQuery.rows[0].yesterday;
        const today = dateQuery.rows[0].today;

        // Якщо користувач не заходив ні сьогодні, ні вчора — серія згоріла
        if (user.last_active_date !== today && user.last_active_date !== yesterday) {
            activeStreak = 0;
            // Відразу скидаємо її в базі, щоб не показувати неправду
            await db.query('UPDATE users SET current_streak = 0 WHERE id = $1', [user.id]);
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
        streakDays: activeStreak // ТЕПЕР ТУТ БУДЕ АКТУАЛЬНА СЕРІЯ
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
// 2. Оновлення текстових даних профілю (PUT /api/users/profile)
// ==========================================
router.put('/profile', auth, async (req, res) => {
  const { name, email } = req.body;

  try {
    if (email) {
      const emailCheck = await db.query(
        'SELECT id FROM users WHERE email = $1 AND id != $2',
        [email, req.user.id]
      );
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ error: 'Цей email вже використовується іншим акаунтом' });
      }
    }

    const updatedUser = await db.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email, total_xp, current_streak',
      [name, email, req.user.id]
    );

    const user = updatedUser.rows[0];
    
    const completedCount = await db.query('SELECT COUNT(*) FROM completed_myths WHERE user_id = $1', [user.id]);
    
    // Використовуємо наш новий хелпер
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
// 3. Збереження прогресу міфу (POST /api/users/complete-myth)
// ==========================================
router.post('/complete-myth', auth, async (req, res) => {
  const { mythId, score, earnedXp } = req.body;

  try {
    // 1. Перевіряємо, чи міф вже розвінчано
    const checkMyth = await db.query(
      'SELECT * FROM completed_myths WHERE user_id = $1 AND myth_id = $2',
      [req.user.id, mythId]
    );

    if (checkMyth.rows.length > 0) {
      return res.status(400).json({ error: 'Ви вже розвінчали цей міф і отримали за нього досвід!' });
    }

    // 2. Зберігаємо міф у таблицю пройдених
    await db.query(
      'INSERT INTO completed_myths (user_id, myth_id, score, earned_xp) VALUES ($1, $2, $3, $4)',
      [req.user.id, mythId, score, earnedXp]
    );

    // ==========================================
    // ЛОГІКА СЕРІЇ (STREAK)
    // ==========================================
    // Дістаємо поточну серію та дату останньої активності
    const userStatus = await db.query(
      'SELECT current_streak, last_active_date::text FROM users WHERE id = $1', 
      [req.user.id]
    );
    
    let streak = userStatus.rows[0].current_streak || 0;
    const lastActive = userStatus.rows[0].last_active_date;

    // Дістаємо сьогоднішню та вчорашню дати безпосередньо з бази (щоб уникнути конфліктів часових поясів)
    const dateQuery = await db.query("SELECT CURRENT_DATE::text as today, (CURRENT_DATE - INTERVAL '1 day')::date::text as yesterday");
    const today = dateQuery.rows[0].today;
    const yesterday = dateQuery.rows[0].yesterday;

    if (lastActive === today) {
      // Якщо сьогодні вже отримував досвід — серія залишається такою ж
      streak = streak; 
    } else if (lastActive === yesterday) {
      // Якщо остання активність була вчора — збільшуємо серію
      streak += 1;
    } else {
      // Якщо пропустив день або це перший раз — скидаємо серію до 1
      streak = 1;
    }

    // 3. Оновлюємо користувача: додаємо XP, оновлюємо серію і ставимо сьогоднішню дату
    const updatedUser = await db.query(
      'UPDATE users SET total_xp = total_xp + $1, current_streak = $2, last_active_date = CURRENT_DATE WHERE id = $3 RETURNING total_xp, current_streak',
      [earnedXp, streak, req.user.id]
    );

    // 4. Рахуємо рівень
    const totalXp = updatedUser.rows[0].total_xp;
    const currentStreak = updatedUser.rows[0].current_streak;
    const { level } = calculateLevelData(totalXp);

    res.json({
      message: 'Міф успішно розвінчано!',
      addedXp: earnedXp,
      totalXp: totalXp,
      newLevel: level,
      currentStreak: currentStreak // Можемо віддавати на фронт, якщо потрібно для анімацій
    });

  } catch (err) {
    console.error('Помилка збереження прогресу:', err.message);
    res.status(500).json({ error: 'Внутрішня помилка сервера при збереженні прогресу' });
  }
});

// ==========================================
// 4. Підписка на розсилку (POST /api/users/subscribe) - ПУБЛІЧНИЙ РОУТ
// ==========================================
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email обовʼязковий для підписки' });
  }

  try {
    // 1. Перевіряємо, чи цей email вже підписаний, щоб не було дублікатів
    const checkEmail = await db.query(
      'SELECT id FROM subscribers WHERE email = $1',
      [email]
    );

    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: 'Цей email вже підписаний на розсилку!' });
    }

    // 2. Записуємо новий email в таблицю
    await db.query(
      'INSERT INTO subscribers (email) VALUES ($1)',
      [email]
    );

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
      'SELECT * FROM saved_myths WHERE user_id = $1 AND myth_id = $2',
      [req.user.id, mythId]
    );

    if (checkSave.rows.length > 0) {
      // Якщо вже збережено — видаляємо
      await db.query('DELETE FROM saved_myths WHERE user_id = $1 AND myth_id = $2', [req.user.id, mythId]);
      res.json({ message: 'Міф видалено зі збережених', isSaved: false });
    } else {
      // Якщо не збережено — додаємо
      await db.query('INSERT INTO saved_myths (user_id, myth_id) VALUES ($1, $2)', [req.user.id, mythId]);
      res.json({ message: 'Міф додано до збережених', isSaved: true });
    }
  } catch (err) {
    console.error('Помилка збереження міфу:', err.message);
    res.status(500).json({ error: 'Помилка сервера' });
  }
});

module.exports = router;