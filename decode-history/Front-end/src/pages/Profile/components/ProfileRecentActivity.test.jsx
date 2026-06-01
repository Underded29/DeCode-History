import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { MemoryRouter } from 'react-router-dom'; 
import ProfileRecentActivity from './ProfileRecentActivity';

// Створюємо фейкові дані для тестів
const mockActivities = [
  { mythId: 'myth1', title: 'Хрещення Русі', xp: 50, date: '2026-05-10T10:00:00Z' },
  { mythId: 'myth2', title: 'Заснування Києва', xp: 30, date: '2026-05-11T12:00:00Z' },
  { mythId: 'myth3', title: 'Битва під Оршею', xp: 70, date: '2026-05-12T15:00:00Z' },
  { mythId: 'myth4', title: 'Четвертий Універсал', xp: 100, date: '2026-05-13T09:00:00Z' }, 
];

// Допоміжна функція для рендерингу компонента всередині Роутера
const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('Компонент ProfileRecentActivity', () => {
  
  // ТЕСТ 1: Перевірка коректного відображення списку
  test('Рендерить заголовок та превʼю останніх трьох дій', () => {
    renderWithRouter(<ProfileRecentActivity activities={mockActivities} />);

    // Перевіряємо заголовок
    expect(screen.getByText('Останні дії')).toBeInTheDocument();

    // Перевіряємо, що перші 3 назви міфів є на екрані
    expect(screen.getByText('Хрещення Русі')).toBeInTheDocument();
    expect(screen.getByText('Заснування Києва')).toBeInTheDocument();
    expect(screen.getByText('Битва під Оршею')).toBeInTheDocument();

    // Перевіряємо, що 4-й міф НЕ відображається в превʼю
    expect(screen.queryByText('Четвертий Універсал')).not.toBeInTheDocument();

    // Перевіряємо відображення нарахування XP
    const xpBadges = screen.getAllByText(/\+.*XP/); 
    expect(xpBadges.length).toBe(3); 
  });

  // ТЕСТ 2: Перевірка порожнього стану
  test('Відображає повідомлення, якщо активностей немає', () => {
    renderWithRouter(<ProfileRecentActivity activities={[]} />);

    expect(screen.getByText('У вас ще немає недавньої активності.')).toBeInTheDocument();
    
    // Кнопки "Переглянути все" не повинно бути
    expect(screen.queryByRole('button', { name: /Переглянути всю активність/ })).not.toBeInTheDocument();
  });

  // ТЕСТ 3: Перевірка взаємодії з користувачем (відкриття модалки)
  test('Відкриває модальне вікно при кліку на кнопку та показує повний список', () => {
    renderWithRouter(<ProfileRecentActivity activities={mockActivities} />);

    const openModalButton = screen.getByRole('button', { name: /Переглянути всю активність/ });
    expect(openModalButton).toBeInTheDocument();

    // Імітуємо клік користувача
    fireEvent.click(openModalButton);

    expect(screen.getByText('Четвертий Універсал')).toBeInTheDocument();
    
    // Перевіряємо, що модалка має backdrop (елемент з затемненням)
    const modalBackdrop = document.querySelector('.bg-brand-dark\\/70');
    expect(modalBackdrop).toBeInTheDocument();
  });
});