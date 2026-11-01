import React, { useState } from 'react';
import { CORE_CONCEPTS } from '../data/pythonSnippets';
import { Check, Copy, ChevronRight } from 'lucide-react';

export const ConceptsGrid: React.FC = () => {
  const [activeConceptId, setActiveConceptId] = useState<string>(CORE_CONCEPTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeConcept = CORE_CONCEPTS.find(c => c.id === activeConceptId) || CORE_CONCEPTS[0];

  const handleCopySnippet = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <section id="conceitos" className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider">
            <span>Passo 4</span>
            <span aria-hidden="true">·</span>
            <span>Fundamentos Essenciais</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Componentes e Conceitos Chave
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Tudo o que você precisa saber para começar a programar em Python com segurança e confiança.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Concept Navigation List */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          {CORE_CONCEPTS.map((concept) => {
            const isSelected = concept.id === activeConceptId;
            return (
              <button
                key={concept.id}
                onClick={() => setActiveConceptId(concept.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium mb-1">
                    <span>{concept.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {concept.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {concept.summary}
                  </p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 mt-1 transition-colors ${
                    isSelected ? 'text-emerald-400' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Detailed Concept Panel */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
            <div>
              <span className="text-xs font-mono text-emerald-400 block mb-1">
                {activeConcept.tag}
              </span>
              <h3 className="text-xl font-bold text-white">
                {activeConcept.title}
              </h3>
            </div>
            <button
              onClick={() => handleCopySnippet(activeConcept.codeSample, activeConcept.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              title="Copiar exemplo"
            >
              {copiedId === activeConcept.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Exemplo</span>
                </>
              )}
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed mb-6 space-y-3">
            <p>{activeConcept.detail}</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400 font-mono">
                Exemplo Prático em Python:
              </span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed whitespace-pre">
              {activeConcept.codeSample}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-xs text-emerald-200 flex items-center justify-between">
            <span>Dúvida frequente de quem inicia: preste sempre atenção na indentação (espaços)!</span>
            <span className="text-emerald-400 font-mono">PEP 8: 4 espaços</span>
          </div>
        </div>
      </div>
    </section>
  );
};
