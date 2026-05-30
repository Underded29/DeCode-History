const request = require('supertest');
const app = require('../server'); // або '../index', як у тебе
const db = require('../src/db');
const bcrypt = require('bcrypt');

jest.mock('../src/db');
jest.mock('bcrypt');

describe('Авторизація API (POST /api/auth/login)', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Повинен повертати 200 та JWT-токен при правильних даних', async () => {
    // ВИПРАВЛЕНО: тепер повертаємо об'єкт з властивістю rows
    db.query.mockResolvedValue({
      rows: [{ 
        id: 1, 
        username: 'TestUser',
        email: 'test@history.ua', 
        password_hash: 'hashedpassword',
        total_xp: 100,
        current_streak: 5
      }]
    });
    
    bcrypt.compare.mockResolvedValue(true);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@history.ua', password: 'correctpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('id', 1);
    expect(response.body.user).toHaveProperty('username', 'TestUser');
  });

  it('Повинен повертати 401 при невірному паролі', async () => {
    // ВИПРАВЛЕНО: тепер повертаємо об'єкт з властивістю rows
    db.query.mockResolvedValue({
      rows: [{ 
        id: 1, 
        email: 'test@history.ua', 
        password_hash: 'hashedpassword' 
      }]
    });
    
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@history.ua', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    // Зверни увагу: у тебе в коді res.json({ error: '...' }), тому перевіряємо error, а не message
    expect(response.body.error).toBe('Невірний email або пароль'); 
  });
});