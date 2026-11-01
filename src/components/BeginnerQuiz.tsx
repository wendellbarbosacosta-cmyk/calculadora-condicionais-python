import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/pythonSnippets';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const BeginnerQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return; // Locked once verified
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleCheck = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Calculate score
  const totalQuestions = QUIZ_QUESTIONS.length;
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach(q => {
    const selectedIdx = selectedAnswers[q.id];
    if (selectedIdx !== undefined && q.options[selectedIdx]?.isCorrect) {
      correctCount++;
    }
  });

  const allAnswered = Object.keys(selectedAnswers).length === totalQuestions;

  return (
    <section id="quiz" className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider">
            <span>Passo 5</span>
            <span aria-hidden="true">·</span>
            <span>Fixação do Conhecimento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Desafio Rápido: Teste seu Aprendizado
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Responda às 4 perguntas abaixo para conferir se você já domina como o Python lida com condicionais e dados de entrada.
          </p>
        </div>

        {showResults && (
          <div className="flex items-center gap-3 p-2 bg-slate-900 border border-slate-800 rounded-lg">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-white">
              Pontuação: {correctCount} de {totalQuestions} acertos ({Math.round((correctCount / totalQuestions) * 100)}%)
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 bg-slate-800 rounded"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Refazer</span>
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, qIndex) => {
          const selectedIdx = selectedAnswers[q.id];
          const hasSelected = selectedIdx !== undefined;

          return (
            <div
              key={q.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {q.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 ml-0 sm:ml-9">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedIdx === optIdx;
                  let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60';

                  if (showResults) {
                    if (option.isCorrect) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold';
                    } else if (isThisSelected && !option.isCorrect) {
                      btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                    }
                  } else if (isThisSelected) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`text-left text-xs p-3 rounded-lg border transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {showResults && option.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {showResults && isThisSelected && !option.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after checking */}
              {showResults && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 ml-0 sm:ml-9 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg">
                  <span className="font-semibold text-emerald-400 block mb-0.5">
                    Explicação Educativa:
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
        <span className="text-xs text-slate-400">
          {showResults
            ? 'Pronto! Revise as explicações acima para sanar qualquer dúvida.'
            : allAnswered
            ? 'Todas as perguntas foram respondidas. Clique para conferir suas respostas!'
            : `Responda a todas as perguntas (${Object.keys(selectedAnswers).length}/${totalQuestions}) para verificar.`}
        </span>

        {!showResults ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleCheck}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-md ${
              allAnswered
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Verificar Respostas
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tentar Novamente</span>
          </button>
        )}
      </div>
    </section>
  );
};
