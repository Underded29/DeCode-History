import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMythsData } from '../../MythContext/MythContext'; // Імпортуємо наш контекст (перевір шлях!)

const MythQuiz = ({ quizzes, currentId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  
  // Дістаємо всі міфи з контексту
  const { myths } = useMythsData();

  // Знаходимо порядковий номер (індекс) поточного міфу в масиві
  const currentIndex = myths.findIndex(myth => myth.id === currentId);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
  }, [currentId]);

  if (!quizzes || quizzes.length === 0) return null;

  const currentQuiz = quizzes[currentQuestionIndex];
  const { question, options, correctAnswer, explanation } = currentQuiz;
  
  const isLastQuestion = currentQuestionIndex === quizzes.length - 1;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null); 
  };

  const handleNextMyth = () => {
    // ЗАЦИКЛЕННЯ: Якщо це останній елемент, (currentIndex + 1) % length дасть 0 (перехід на початок)
    const nextIndex = (currentIndex + 1) % myths.length;
    navigate(`/myth/${myths[nextIndex].id}`);
  };

  const handlePrevMyth = () => {
    // ЗАЦИКЛЕННЯ: Якщо це 0-й елемент, додаємо довжину, щоб перейти на самий кінець
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
          
          if (selectedAnswer) {
              btnClass += "cursor-default "; 
          } else {
              btnClass += "cursor-pointer hover:shadow-md hover:border-brand-blue ";
          }
          
          if (showSuccess) btnClass += "border-emerald-500 bg-emerald-50";
          else if (showError) btnClass += "border-red-500 bg-red-50";
          else if (selectedAnswer) btnClass += "border-brand-blue/10 opacity-60"; 
          else btnClass += "border-brand-blue/20";

          return (
            <button 
              key={option.id} 
              onClick={() => !selectedAnswer && setSelectedAnswer(option.id)}
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
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 mt-2 border-t border-brand-blue/20">
        {/* Кнопка "Попередній" тепер ніколи не disabled, бо вона зациклена */}
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
            <div className="text-sm font-bold text-brand-dark/40 px-4">Оберіть варіант відповіді</div>
        )}
      </div>

    </div>
  );
};

export default MythQuiz;