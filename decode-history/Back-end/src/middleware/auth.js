const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Отримуємо токен із заголовка Authorization (формат: Bearer TOKEN)
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Доступ заборонено. Токен відсутній.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Записуємо id користувача у об'єкт запиту (req.user.id)
    next(); // Пропускаємо запит далі до роута
  } catch (err) {
    res.status(403).json({ error: 'Недійсний або прострочений токен.' });
  }
};