import React, { createContext, useState, useEffect, useContext } from 'react';

const MythContext = createContext();

export const useMythsData = () => useContext(MythContext);

export const MythProvider = ({ children }) => {
  const [myths, setMyths] = useState([]);
  const [categories, setCategories] = useState(['Всі']);
  const [loading, setLoading] = useState(true);

  const parseOptions = (optionsText) => {
    if (!optionsText) return [];
    return optionsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '')
      .map((line, index) => ({
        id: ['A', 'B', 'C', 'D'][index] || '?',
        text: line
      }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const catResponse = await fetch('https://history.science.kh.ua/wp-json/wp/v2/categories?per_page=100&hide_empty=false');
        const catData = await catResponse.json();
        const fetchedCategories = catData
          .filter(cat => cat.name.toLowerCase() !== 'зайва')
          .map(cat => cat.name);

        setCategories(['Всі', ...fetchedCategories]);

        const mythResponse = await fetch('https://history.science.kh.ua/wp-json/wp/v2/myth?per_page=100&_embed');
        const mythData = await mythResponse.json();

        const formattedMyths = mythData.map(item => {
          const acf = item.acf || {};
          
          // ВСТАНОВЛЮЄМО ПЛЕЙСХОЛДЕР ЗА ЗАМОВЧУВАННЯМ
          let imageUrl = "https://placehold.co/600x400/e2e8f0/475569?text=DeCode";
          
          // Якщо в WP є картинка, замінюємо плейсхолдер на неї
          if (item._embedded?.['wp:featuredmedia']?.[0]) {
            imageUrl = item._embedded['wp:featuredmedia'][0].source_url;
          }

          const categoryName = item._embedded?.['wp:term']?.[0]?.find(term => term.taxonomy === 'category')?.name || 'Сучасність';

          const quizzes = [];
          for (let i = 1; i <= 3; i++) {
            if (acf[`quiz_${i}_question`]) {
              quizzes.push({
                question: acf[`quiz_${i}_question`],
                options: parseOptions(acf[`quiz_${i}_options`]),
                correctAnswer: acf[`quiz_${i}_correct`],
                explanation: acf[`quiz_${i}_explanation`]
              });
            }
          }

          return {
            id: item.id.toString(),
            title: item.title?.rendered || '',
            category: categoryName,
            fakeNarrative: acf.fake_narrative || '',
            truthFact: acf.truth_fact || '',
            xp: parseInt(acf.xp_reward) || 50,
            image: imageUrl, // Тепер тут ЗАВЖДИ є посилання (реальне або плейсхолдер)
            quizzes: quizzes,
            readTime: acf.read_time || '10 хв',
            slug: item.slug,
            views: Math.floor(Math.random() * 1200) + 400,
            difficulty: parseInt(acf.xp_reward) > 200 ? "Важко" : "Середня",
            status: acf.status || 'Міф',
          };
        });

        setMyths(formattedMyths);
      } catch (error) {
        console.error('Помилка завантаження даних:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MythContext.Provider value={{ myths, categories, loading }}>
      {children}
    </MythContext.Provider>
  );
};