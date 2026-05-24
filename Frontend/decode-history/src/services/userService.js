import { mockUser } from '../data/mockUser';

// Створюємо змінну в пам'яті, яка виступає в ролі нашої тимчасової бази даних
let localDatabaseUser = { ...mockUser };

// Отримання профілю з нашої "бази даних"
export const fetchUserProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...localDatabaseUser });
    }, 500);
  });
};

// Оновлення текстових даних у "базі даних"
export const updateUserProfile = async (updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localDatabaseUser = { ...localDatabaseUser, ...updatedData };
      resolve({ ...localDatabaseUser });
    }, 600);
  });
};

// Симуляція завантаження файлу в assets та запису шляху в БД
export const uploadAvatarService = async (fileObject) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Створюємо локальне посилання на файл всередині браузера.
      // Воно працює точно так само, як шлях до файлу в папці assets.
      const simulatedAssetPath = URL.createObjectURL(fileObject);
      
      // КРИТИЧНИЙ КРОК: Вносимо посилання у нашу локальну базу даних
      localDatabaseUser.avatarUrl = simulatedAssetPath;
      
      // Повертаємо новий шлях для оновлення UI
      resolve(simulatedAssetPath);
    }, 1000);
  });
};