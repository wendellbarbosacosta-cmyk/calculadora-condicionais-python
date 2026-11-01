import React, { useState } from 'react';
import { GitBranch, Check, HelpCircle, AlertOctagon, ArrowDown, ArrowRight } from 'lucide-react';

export const ConditionalFlowDiagram: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<'1' | '2' | '3' | '4-safe' | '4-zero' | '5' | 'else'>('1');

  return (
    <section id="fluxo" className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider">
            <span>Passo 3</span>
            <span aria-hidden="true">·</span>
            <span>Lógica Computacional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Como o Python Toma Decisões (Fluxograma)
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Clique nos botões de teste para acender o caminho exato que o interpretador Python percorre com <code className="text-amber-300 font-mono">if</code>, <code className="text-amber-300 font-mono">elif</code> e <code className="text-amber-300 font-mono">else</code>.
          </p>
        </div>

        {/* Test Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveBranch('1')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeBranch === '1'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Soma (+)
          </button>
          <button
            onClick={() => setActiveBranch('2')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeBranch === '2'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Subtração (-)
          </button>
          <button
            onClick={() => setActiveBranch('3')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeBranch === '3'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Multiplicação (*)
          </button>
          <button
            onClick={() => setActiveBranch('4-safe')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeBranch === '4-safe'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Divisão Segura (/)
          </button>
          <button
            onClick={() => setActiveBranch('4-zero')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeBranch === '4-zero'
                ? 'bg-rose-950/40 text-rose-300 border border-rose-800'
                : 'text-rose-400 hover:text-rose-300'
            }`}
          >
            Divisão por 0
          </button>
          <button
            onClick={() => setActiveBranch('else')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeBranch === 'else'
                ? 'bg-amber-950/40 text-amber-300 border border-amber-800'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            Opção Inválida
          </button>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl overflow-x-auto">
        {/* Visual Branching Tree */}
        <div className="min-w-[700px] flex flex-col gap-4">
          {/* Start Node */}
          <div className="flex items-center gap-4">
            <div className="w-48 bg-slate-950 border border-slate-700 rounded-lg p-3 text-center shrink-0">
              <span className="text-[10px] font-mono text-slate-500 block uppercase">Início do Script</span>
              <span className="text-xs font-bold text-slate-200">input() de operacao, num1, num2</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="text-xs text-slate-400 italic">
              O fluxo começa aqui e testa as condições de cima para baixo.
            </div>
          </div>

          {/* Node 1: if operacao == "1" or "+" */}
          <div className="flex items-start gap-4">
            <div
              className={`w-48 rounded-lg p-3 text-center border transition-all shrink-0 ${
                activeBranch === '1'
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase">1. if (Se)</span>
              <span className="text-xs font-mono text-slate-200">op == "1" or "+"</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <ArrowRight className={`w-4 h-4 shrink-0 ${activeBranch === '1' ? 'text-emerald-400' : 'text-slate-700'}`} />
              <div
                className={`p-2.5 rounded-lg text-xs font-mono transition-all flex-1 ${
                  activeBranch === '1'
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-bold'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                }`}
              >
                {activeBranch === '1' ? '✓ VERDADEIRO: resultado = num1 + num2 (Executa e ENCERRA)' : 'resultado = num1 + num2'}
              </div>
            </div>
          </div>

          {/* Node 2: elif operacao == "2" or "-" */}
          <div className="flex items-start gap-4">
            <div
              className={`w-48 rounded-lg p-3 text-center border transition-all shrink-0 ${
                activeBranch === '2'
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase">2. elif (Senão Se)</span>
              <span className="text-xs font-mono text-slate-200">op == "2" or "-"</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <ArrowRight className={`w-4 h-4 shrink-0 ${activeBranch === '2' ? 'text-emerald-400' : 'text-slate-700'}`} />
              <div
                className={`p-2.5 rounded-lg text-xs font-mono transition-all flex-1 ${
                  activeBranch === '2'
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-bold'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                }`}
              >
                {activeBranch === '2' ? '✓ VERDADEIRO: resultado = num1 - num2 (Executa e ENCERRA)' : 'resultado = num1 - num2'}
              </div>
            </div>
          </div>

          {/* Node 3: elif operacao == "3" or "*" */}
          <div className="flex items-start gap-4">
            <div
              className={`w-48 rounded-lg p-3 text-center border transition-all shrink-0 ${
                activeBranch === '3'
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase">3. elif (Senão Se)</span>
              <span className="text-xs font-mono text-slate-200">op == "3" or "*"</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <ArrowRight className={`w-4 h-4 shrink-0 ${activeBranch === '3' ? 'text-emerald-400' : 'text-slate-700'}`} />
              <div
                className={`p-2.5 rounded-lg text-xs font-mono transition-all flex-1 ${
                  activeBranch === '3'
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-bold'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                }`}
              >
                {activeBranch === '3' ? '✓ VERDADEIRO: resultado = num1 * num2 (Executa e ENCERRA)' : 'resultado = num1 * num2'}
              </div>
            </div>
          </div>

          {/* Node 4: elif operacao == "4" or "/" */}
          <div className="flex items-start gap-4">
            <div
              className={`w-48 rounded-lg p-3 text-center border transition-all shrink-0 ${
                activeBranch === '4-safe' || activeBranch === '4-zero'
                  ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase">4. elif (Divisão)</span>
              <span className="text-xs font-mono text-slate-200">op == "4" or "/"</span>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <ArrowRight className={`w-4 h-4 shrink-0 ${activeBranch === '4-zero' ? 'text-rose-400' : 'text-slate-700'}`} />
                <div
                  className={`p-2 rounded-lg text-xs font-mono transition-all flex-1 ${
                    activeBranch === '4-zero'
                      ? 'bg-rose-950/60 text-rose-200 border border-rose-500 font-bold'
                      : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                  }`}
                >
                  if num2 == 0: ⚠️ Erro: Não é possível dividir por zero!
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ArrowRight className={`w-4 h-4 shrink-0 ${activeBranch === '4-safe' ? 'text-emerald-400' : 'text-slate-700'}`} />
                <div
                  className={`p-2 rounded-lg text-xs font-mono transition-all flex-1 ${
                    activeBranch === '4-safe'
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 font-bold'
                      : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                  }`}
                >
                  else: ✓ resultado = num1 / num2
                </div>
              </div>
            </div>
          </div>

          {/* Node 5: else final */}
          <div className="flex items-start gap-4">
            <div
              className={`w-48 rounded-lg p-3 text-center border transition-all shrink-0 ${
                activeBranch === 'else'
                  ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase">5. else (Senão)</span>
              <span className="text-xs font-mono text-slate-200">Qualquer outra coisa</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <ArrowRight className={`w-4 h-4 shrink-0 ${activeBranch === 'else' ? 'text-amber-400' : 'text-slate-700'}`} />
              <div
                className={`p-2.5 rounded-lg text-xs font-mono transition-all flex-1 ${
                  activeBranch === 'else'
                    ? 'bg-amber-950/60 text-amber-200 border border-amber-500 font-bold'
                    : 'bg-slate-950/40 text-slate-600 border border-slate-900'
                }`}
              >
                print("Operação inválida! Por favor, escolha entre 1 e 4.")
              </div>
            </div>
          </div>
        </div>

        {/* Informative Footer Box */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">Regra de Ouro:</span>
            <span>Uma vez que o Python entra em um bloco verdadeiro, ele não verifica mais nenhum abaixo!</span>
          </div>
          <span className="text-slate-500 font-mono">Curto-circuito lógico mútuo</span>
        </div>
      </div>
    </section>
  );
};
