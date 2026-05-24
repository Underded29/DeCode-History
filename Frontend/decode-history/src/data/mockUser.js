// src/data/user.js

export const mockUser = {
  id: "u1",
  name: "Ярослав",
  email: "oleksandr@example.com",
  avatarUrl: "https://placehold.co/150x150/e2e8f0/475569?text=O", // Тимчасова аватарка
  level: 5,
  currentXP: 2500,
  nextLevelXP: 4000,
  
  // Статистика (Твій прогрес)
  stats: {
    resolved: 18,
    inProgress: 4,
    saved: 7,
    streakDays: 6,
  },

  // Останні 3 дії (Синхронізовано з реальною базою)
  recentActivity: [
    {
      id: "a1",
      type: "resolved", 
      title: 'Розвінчав міф "Крим завжди був російським?"',
      time: "12:30",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50 border-emerald-200"
    },
    {
      id: "a2",
      type: "progress", 
      title: 'Продовжив міф "Голодомор — це просто загальний неврожай?"',
      time: "16:20",
      iconColor: "text-brand-orange",
      bgColor: "bg-orange-50 border-orange-200"
    },
    {
      id: "a3",
      type: "saved", 
      title: 'Зберіг міф "5G-вишки руйнують імунітет?"',
      time: "11:05",
      iconColor: "text-brand-blue",
      bgColor: "bg-brand-blue/10 border-brand-blue/20"
    }
  ],

  // Збережені міфи (Синхронізовано з реальними ID та назвами)
  savedMyths: [
    {
      id: "1",
      title: "Україну створив Ленін?",
      iconUrl: "https://placehold.co/60x40/e2e8f0/475569?text=Lenin"
    },
    {
      id: "6",
      title: "5G-вишки руйнують імунітет?",
      iconUrl: "https://placehold.co/60x40/e2e8f0/475569?text=5G"
    },
    {
      id: "7",
      title: "Земля насправді пласка?",
      iconUrl: "https://placehold.co/60x40/e2e8f0/475569?text=Earth"
    }
  ]
};