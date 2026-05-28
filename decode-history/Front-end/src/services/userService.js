const API_URL = import.meta.env.PROD 
  ? 'https://api.history.science.kh.ua/api' 
  : 'http://localhost:5001/api';
// Функція для отримання профілю з токеном
export const fetchUserProfile = async () => {
  const tokenRaw = localStorage.getItem('token');
  if (!tokenRaw) throw new Error('Немає токена');

  const token = tokenRaw.trim(); // Очищаємо від прихованих символів

  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Не вдалося завантажити дані профілю');
  }

  return await response.json();
};

// Функція для зміни базових налаштувань
export const updateUserProfile = async (updatedData) => {
  const tokenRaw = localStorage.getItem('token');
  if (!tokenRaw) throw new Error('Немає токена');

  const token = tokenRaw.trim(); // Очищаємо від прихованих символів

  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Не вдалося оновити дані профілю');
  }

  return await response.json();
};

// Функція-заглушка для аватара (тимчасово створює локальний URL для прев'ю)
export const uploadAvatarService = async (fileObject) => {
  const tokenRaw = localStorage.getItem('token');
  if (!tokenRaw) throw new Error('Немає токена');

  const token = tokenRaw.trim();

  // Використовуємо FormData для відправки файлу (multipart/form-data)
  const formData = new FormData();
  formData.append('avatar', fileObject);

  const response = await fetch(`${API_URL}/users/upload-avatar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // ВАЖЛИВО: НЕ додаємо 'Content-Type': 'application/json' сюди!
      // Браузер сам встановить потрібний Content-Type для FormData.
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Не вдалося завантажити аватар');
  }

  const data = await response.json();
  return data.avatarUrl; // Повертаємо нове посилання
};

// Функція для відправки пройденого міфу на сервер
export const completeMythService = async (mythId, score, earnedXp) => {
  const tokenRaw = localStorage.getItem('token');
  
  // Якщо токена немає, користувач гість — просто перериваємо виконання (або можна зберігати локально)
  if (!tokenRaw) {
    throw new Error('Гість: прогрес не збережено у базу даних.');
  }

  const token = tokenRaw.trim(); // Очищаємо від прихованих символів

  const response = await fetch(`${API_URL}/complete-myth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      mythId: mythId,
      score: score,
      earnedXp: earnedXp
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Не вдалося зберегти прогрес');
  }

  return await response.json();
};

export const toggleSaveMythService = async (mythId) => {
  const tokenRaw = localStorage.getItem('token');
  if (!tokenRaw) throw new Error('Немає токена');

  const token = tokenRaw.trim();

  const response = await fetch(`${API_URL}/toggle-save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ mythId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Не вдалося оновити статус збереження');
  }

  return await response.json();
};