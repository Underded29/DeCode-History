import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMythsData } from '../../MythContext/MythContext'; 
import { completeMythService } from '../../../services/userService'; // Імпортуємо наш новий сервіс

const MythQuiz = ({ quizzes, currentId, mythXp, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Нові стейти для ігрової механіки
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [serverMessage, setServerMessage] = useState(null); // Повідомлення від бекенду
  
  const navigate = useNavigate();
  const { myths } = useMythsData();
  const currentIndex = myths.findIndex(myth => myth.id === currentId);

  // Скидаємо прогрес при переході на новий міф
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswersCount(0);
    setServerMessage(null);
  }, [currentId]);

  if (!quizzes || quizzes.length === 0) return null;

  const currentQuiz = quizzes[currentQuestionIndex];
  const { question, options, correctAnswer, explanation } = currentQuiz;
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;

  // ОНОВЛЕНА функція вибору відповіді
  const handleAnswerSelect = async (optionId) => {
    if (selectedAnswer) return; // Захист від подвійного кліку
    
    setSelectedAnswer(optionId);
    const isCorrect = optionId === correctAnswer;
    
    // Рахуємо правильні відповіді
    const newCorrectCount = correctAnswersCount + (isCorrect ? 1 : 0);
    if (isCorrect) setCorrectAnswersCount(newCorrectCount);

    // ЯКЩО ЦЕ ОСТАННЄ ПИТАННЯ - ВІДПРАВЛЯЄМО РЕЗУЛЬТАТ НА СЕРВЕР
    if (isLastQuestion) {
      // Рахуємо відсоток успіху (від 0 до 100)
      const scorePercent = Math.round((newCorrectCount / quizzes.length) * 100);
      
      // Рахуємо отримані XP (мінімум 10 за старання, максимум - mythXp)
      const earnedXp = scorePercent === 100 ? mythXp : Math.max(10, Math.round((scorePercent / 100) * mythXp));

      try {
        const res = await completeMythService(currentId, scorePercent, earnedXp);
        setServerMessage(`🎉 ${res.message} Отримано: +${res.addedXp} XP!`);
        // Оновлюємо профіль, щоб оновився сайдбар та хедер
        if (onQuizComplete) onQuizComplete();
      } catch (err) {
        // Якщо це гість або міф уже був пройдений
        if (err.message.includes('Гість')) {
          setServerMessage('💡 Авторизуйтесь, щоб зберігати отриманий досвід (XP).');
        } else {
          setServerMessage(`ℹ️ ${err.message}`); // "Ви вже розвінчали цей міф..."
        }
      }
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null); 
  };

  const handleNextMyth = () => {
    const nextIndex = (currentIndex + 1) % myths.length;
    navigate(`/myth/${myths[nextIndex].id}`);
  };

  const handlePrevMyth = () => {
    const prevIndex = (currentIndex - 1 + myths.length) % myths.length;
    navigate(`/myth/${myths[prevIndex].id}`);
  };

  return (
    <div className="w-full bg-brand-blue/5 border border-brand-blue/20 rounded-3xl p-6 md:p-8 mt-4 flex flex-col gap-6">
      
      <div className="flex justify-between items-center text-sm font-bold text-brand-dark/60 uppercase tracking-wider">
        <span>Питання {currentQuestionIndex + 1} з {quizzes.length}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-brand-dark text-center px-4">
        {question}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === correctAnswer;
          const showSuccess = selectedAnswer && isCorrect; 
          const showError = isSelected && !isCorrect;

          let btnClass = "relative flex items-center p-4 bg-white border-2 rounded-2xl transition-all font-medium text-brand-dark ";
          
          if (selectedAnswer) btnClass += "cursor-default "; 
          else btnClass += "cursor-pointer hover:shadow-md hover:border-brand-blue ";
          
          if (showSuccess) btnClass += "border-emerald-500 bg-emerald-50";
          else if (showError) btnClass += "border-red-500 bg-red-50";
          else if (selectedAnswer) btnClass += "border-brand-blue/10 opacity-60"; 
          else btnClass += "border-brand-blue/20";

          return (
            <button 
              key={option.id} 
              onClick={() => handleAnswerSelect(option.id)}
              disabled={selectedAnswer !== null} 
              className={btnClass}
            >
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 ${showSuccess ? 'border-emerald-500 text-emerald-600' : showError ? 'border-red-500 text-red-600' : 'border-brand-blue/30 text-brand-dark'}`}>
                {option.id}
              </div>
              <span className="text-left pr-6">{option.text}</span>
              
              {showSuccess && (
                <div className="absolute right-4 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className={`mt-4 border-2 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start animate-fade-in-up ${selectedAnswer === correctAnswer ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex-1 space-y-3">
            <div className={`flex items-center gap-2 font-bold text-lg ${selectedAnswer === correctAnswer ? 'text-emerald-600' : 'text-red-600'}`}>
              {selectedAnswer === correctAnswer ? (
                <><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Правильно!</>
              ) : (
                <><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> Не зовсім так</>
              )}
            </div>
            <p className="text-brand-dark font-medium text-sm md:text-base leading-relaxed">
              {explanation}
            </p>
            
            {/* ВИВОДИМО ПОВІДОМЛЕННЯ ВІД СЕРВЕРА ЯКЩО ЦЕ ОСТАННЄ ПИТАННЯ */}
            {isLastQuestion && serverMessage && (
              <div className="mt-4 p-3 bg-white/60 border border-brand-dark/10 rounded-xl text-brand-dark font-bold text-sm inline-block">
                {serverMessage}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 mt-2 border-t border-brand-blue/20">
        <button 
            onClick={handlePrevMyth}
            className="font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-brand-blue hover:bg-brand-blue/10"
        >
          ← Попередній міф
        </button>

        {selectedAnswer ? (
            isLastQuestion ? (
                <button 
                    onClick={handleNextMyth}
                    className="font-bold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-md bg-brand-blue hover:bg-brand-blue/90 text-white"
                >
                    Наступний міф →
                </button>
            ) : (
                <button 
                    onClick={handleNextQuestion}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-md animate-pulse"
                >
                    Наступне питання →
                </button>
            )
        ) : (
            <div className="text-sm font-bold text-brand-dark/40 px-4 hidden sm:block">Оберіть варіант відповіді</div>
        )}
      </div>

    </div>
  );
};

export default MythQuiz;