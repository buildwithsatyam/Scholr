import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizTool({ data, onRegenerate, isLoading }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!data || !data.questions || data.questions.length === 0) {
    return null;
  }

  const { questions = [], quizTitle } = data;

  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return; // Prevent changing answers after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Quiz Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle size={18} className="text-emerald-600" />
            <span>{quizTitle || 'Article Comprehension Quiz'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            5 questions • Test what you learned from this reading
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSubmitted && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
            >
              <RotateCcw size={13} />
              <span>Retry Quiz</span>
            </button>
          )}

          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition"
          >
            <Sparkles size={13} />
            <span>New Questions</span>
          </button>
        </div>
      </div>

      {/* Score Banner (when submitted) */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`p-5 rounded-2xl border text-center shadow-sm ${
              percentage >= 80 
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
                : percentage >= 50
                  ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-2xl font-extrabold mb-1 font-serif">
              <Award size={28} className={percentage >= 80 ? 'text-emerald-600' : 'text-amber-600'} />
              <span>Score: {score} / {totalQuestions} ({percentage}%)</span>
            </div>
            <p className="text-xs md:text-sm font-medium">
              {percentage === 100 && '🎉 Perfect score! You have completely mastered this article!'}
              {percentage >= 80 && percentage < 100 && '🌟 Excellent grasp of the core concepts!'}
              {percentage >= 50 && percentage < 80 && '👍 Good effort! Review the explanations below to solidify the details.'}
              {percentage < 50 && '💡 Keep learning! Check the explanations below and try again.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = isAnswered && selectedOption === q.correctIndex;

          return (
            <div 
              key={q.id || qIndex}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
            >
              {/* Question Title */}
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <h4 className="text-sm md:text-[15px] font-bold text-slate-900 leading-snug">
                  {q.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid gap-2.5 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isThisOptionCorrect = q.correctIndex === optIdx;

                  let optionStyles = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/70';

                  if (!isSubmitted) {
                    if (isSelected) {
                      optionStyles = 'bg-slate-900 text-white border-slate-900 shadow-sm';
                    }
                  } else {
                    // Submitted state styles
                    if (isThisOptionCorrect) {
                      optionStyles = 'bg-emerald-50 text-emerald-900 border-emerald-400 font-semibold ring-1 ring-emerald-400';
                    } else if (isSelected && !isThisOptionCorrect) {
                      optionStyles = 'bg-rose-50 text-rose-900 border-rose-400 ring-1 ring-rose-400';
                    } else {
                      optionStyles = 'bg-slate-50/50 text-slate-400 border-slate-100';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isSubmitted}
                      className={`flex items-center justify-between w-full p-3.5 rounded-xl border text-left text-sm transition-all ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border ${
                          isSelected && !isSubmitted
                            ? 'bg-white text-slate-900 border-white'
                            : 'bg-white/80 border-slate-300 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSubmitted && isThisOptionCorrect && (
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 ml-2" />
                      )}
                      {isSubmitted && isSelected && !isThisOptionCorrect && (
                        <XCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (revealed after submission) */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs md:text-sm text-slate-700 space-y-1"
                >
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-600" />
                    <span>Explanation:</span>
                  </div>
                  <p className="leading-relaxed">{q.explanation}</p>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Submit Bar */}
      {!isSubmitted && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-xs text-slate-600">
            {answeredCount === totalQuestions ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 size={14} /> All 5 questions answered. Ready to submit!
              </span>
            ) : (
              <span>Answered {answeredCount} of {totalQuestions} questions</span>
            )}
          </div>

          <button
            onClick={() => setIsSubmitted(true)}
            disabled={answeredCount === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-sm ${
              answeredCount > 0
                ? 'bg-slate-950 text-white hover:bg-slate-800'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </motion.div>
  );
}
