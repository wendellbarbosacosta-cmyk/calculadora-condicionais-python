import React, { useState } from 'react';
import { Copy, Check, Download, Info, Play, Sparkles, BookOpen } from 'lucide-react';
import {
  BASIC_CALCULATOR_CODE,
  FUNCTIONS_CALCULATOR_CODE,
  LOOP_CALCULATOR_CODE,
  BASIC_LINE_EXPLANATIONS,
  CodeLineExplanation
} from '../data/pythonSnippets';

interface CodeViewerProps {
  onTestInSimulator?: (num1: number, num2: number, op: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onTestInSimulator }) => {
  const [selectedVersion, setSelectedVersion] = useState<'basic' | 'functions' | 'loop'>('basic');
  const [selectedLine, setSelectedLine] = useState<number>(21); // Default to the 'if' condition
  const [copied, setCopied] = useState(false);

  const currentCode =
    selectedVersion === 'basic'
      ? BASIC_CALCULATOR_CODE
      : selectedVersion === 'functions'
      ? FUNCTIONS_CALCULATOR_CODE
      : LOOP_CALCULATOR_CODE;

  const currentFileName =
    selectedVersion === 'basic'
      ? 'calculadora_simples.py'
      : selectedVersion === 'functions'
      ? 'calculadora_funcoes.py'
      : 'calculadora_loop.py';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Find explanation for selected line if in basic mode
  const currentExplanation =
    selectedVersion === 'basic'
      ? BASIC_LINE_EXPLANATIONS.find(item => item.line === selectedLine) || BASIC_LINE_EXPLANATIONS[4]
      : null;

  // Split code into lines for rendering
  const lines = currentCode.trim().split('\n');

  // Simple Python syntax token rendering
  const renderSyntaxHighlighted = (lineText: string) => {
    // If comment
    if (lineText.trim().startsWith('#')) {
      return <span className="text-slate-400 italic">{lineText}</span>;
    }

    // Replace keywords and patterns
    // We break line into segments safely
    const words = lineText.split(/(\b(?:if|elif|else|or|and|not|def|return|while|True|False|float|int|input|print|in|break|continue)\b|"[^"]*"|'[^']*'|[0-9]+(?:\.[0-9]+)?|[+\-*/=<>:(),])/g);

    return (
      <>
        {words.map((chunk, idx) => {
          if (!chunk) return null;

          if (['if', 'elif', 'else'].includes(chunk)) {
            return (
              <span key={idx} className="text-amber-400 font-semibold">
                {chunk}
              </span>
            );
          }
          if (['or', 'and', 'not', 'in'].includes(chunk)) {
            return (
              <span key={idx} className="text-sky-400 font-medium">
                {chunk}
              </span>
            );
          }
          if (['def', 'return', 'while', 'break', 'continue', 'True', 'False'].includes(chunk)) {
            return (
              <span key={idx} className="text-purple-400 font-medium">
                {chunk}
              </span>
            );
          }
          if (['print', 'input', 'float', 'int', 'strip', 'lower'].includes(chunk)) {
            return (
              <span key={idx} className="text-emerald-400 font-medium">
                {chunk}
              </span>
            );
          }
          if (chunk.startsWith('"') || chunk.startsWith("'")) {
            return (
              <span key={idx} className="text-emerald-300">
                {chunk}
              </span>
            );
          }
          if (/^[0-9]+(?:\.[0-9]+)?$/.test(chunk)) {
            return (
              <span key={idx} className="text-amber-300">
                {chunk}
              </span>
            );
          }
          if (['+', '-', '*', '/', '==', '='].includes(chunk)) {
            return (
              <span key={idx} className="text-pink-400 font-bold">
                {chunk}
              </span>
            );
          }
          return <span key={idx} className="text-slate-200">{chunk}</span>;
        })}
      </>
    );
  };

  return (
    <section id="codigo" className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider">
            <span>Passo 1</span>
            <span aria-hidden="true">·</span>
            <span>Estrutura do Código</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Código Python Limpo e Organizado
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Clique em qualquer linha com indicador para ver a explicação detalhada de como funciona a entrada de dados, o <code className="text-amber-300 font-mono">float()</code>, os blocos <code className="text-amber-300 font-mono">if / elif / else</code> e a proteção contra divisão por zero.
          </p>
        </div>

        {/* Level Switcher (Functional Segmented Tabs) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => {
              setSelectedVersion('basic');
              setSelectedLine(21);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedVersion === 'basic'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nível 1: Básico (if/elif/else)
          </button>
          <button
            onClick={() => setSelectedVersion('functions')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedVersion === 'functions'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nível 2: Funções (def)
          </button>
          <button
            onClick={() => setSelectedVersion('loop')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedVersion === 'loop'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Nível 3: Loop Contínuo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Code Editor Box */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Header of Code Block */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-slate-400 ml-2">{currentFileName}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500 font-mono">Python 3</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded transition-colors whitespace-nowrap text-xs"
                title="Copiar código para a área de transferência"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded transition-colors whitespace-nowrap text-xs"
                title="Baixar arquivo Python"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Salvar</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Lines */}
          <div className="p-3 sm:p-4 overflow-x-auto max-h-[580px] overflow-y-auto text-xs sm:text-sm font-mono leading-relaxed select-text">
            {lines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const hasExplanation = BASIC_LINE_EXPLANATIONS.some(item => item.line === lineNum);
              const isSelected = selectedVersion === 'basic' && selectedLine === lineNum;

              return (
                <div
                  key={lineNum}
                  onClick={() => {
                    if (selectedVersion === 'basic' && hasExplanation) {
                      setSelectedLine(lineNum);
                    }
                  }}
                  className={`flex items-start group rounded px-2 py-0.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/15 border-l-2 border-emerald-400'
                      : hasExplanation && selectedVersion === 'basic'
                      ? 'hover:bg-slate-800/70 cursor-pointer'
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  {/* Line Number */}
                  <span
                    className={`w-8 shrink-0 text-right pr-4 select-none tabular-nums ${
                      isSelected
                        ? 'text-emerald-400 font-bold'
                        : hasExplanation && selectedVersion === 'basic'
                        ? 'text-slate-400 group-hover:text-slate-200'
                        : 'text-slate-600'
                    }`}
                  >
                    {lineNum}
                  </span>

                  {/* Marker if has explanation */}
                  {selectedVersion === 'basic' && (
                    <span className="w-4 shrink-0 flex items-center justify-center mr-1">
                      {hasExplanation && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isSelected ? 'bg-emerald-400 ring-2 ring-emerald-400/30' : 'bg-slate-600 group-hover:bg-amber-400'
                          }`}
                          title="Clique para ver a explicação desta linha"
                        />
                      )}
                    </span>
                  )}

                  {/* Line Code */}
                  <span className="flex-1 whitespace-pre">
                    {renderSyntaxHighlighted(lineText)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Code Footer Note */}
          <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Dica: Linhas com bolinhas são explicadas no painel ao lado.</span>
            <span className="text-slate-500">{lines.length} linhas</span>
          </div>
        </div>

        {/* Right Column: Explanatory Breakdown Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {selectedVersion === 'basic' && currentExplanation ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wide">
                      Linha {currentExplanation.line}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {currentExplanation.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Exact Snippet */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-lg p-3 font-mono text-xs text-amber-300 mb-4 overflow-x-auto">
                <code>{currentExplanation.code.trim()}</code>
              </div>

              {/* Didactic Explanation */}
              <div className="text-sm text-slate-300 leading-relaxed mb-4">
                <p>{currentExplanation.explanation}</p>
              </div>

              {/* Beginner Tip */}
              {currentExplanation.beginnerTip && (
                <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-3 text-xs text-emerald-200">
                  <span className="font-semibold text-emerald-400 block mb-1">
                    Dica de Ouro para Iniciantes:
                  </span>
                  {currentExplanation.beginnerTip}
                </div>
              )}

              {/* Quick Jump Buttons to key components */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400 block mb-2 font-medium">
                  Explorar componentes principais:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'input() & float()', line: 17 },
                    { label: 'Condição if (soma)', line: 21 },
                    { label: 'elif (subtração)', line: 25 },
                    { label: 'Divisão por Zero', line: 35 },
                    { label: 'else (inválido)', line: 41 }
                  ].map(btn => (
                    <button
                      key={btn.line}
                      onClick={() => setSelectedLine(btn.line)}
                      className={`text-xs px-2.5 py-1 rounded transition-colors ${
                        selectedLine === btn.line
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg text-sm text-slate-300 leading-relaxed">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white text-base">
                  {selectedVersion === 'functions'
                    ? 'Por que usar Funções (def)?'
                    : 'Por que usar o Laço while True?'}
                </h3>
              </div>
              {selectedVersion === 'functions' ? (
                <>
                  <p className="mb-3">
                    Conforme seu código cresce, colocar todo o cálculo no meio de <code className="text-amber-300 font-mono">if</code> deixa o programa longo.
                  </p>
                  <p className="mb-3">
                    Com <code className="text-purple-300 font-mono">def</code> (definição de função), você cria blocos isolados com nomes claros: <code className="text-emerald-300 font-mono">somar(a, b)</code>, <code className="text-emerald-300 font-mono">subtrair(a, b)</code>, etc.
                  </p>
                  <p className="text-xs text-slate-400">
                    Isso torna o código reutilizável e fácil de testar, além de ser o padrão adotado na indústria!
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-3">
                    Na versão básica, a calculadora executa uma vez e o programa fecha. O laço <code className="text-purple-300 font-mono">while True:</code> faz o programa continuar em loop infinito até que o usuário digite a palavra de encerramento <code className="text-amber-300 font-mono">'sair'</code>.
                  </p>
                  <p className="mb-3">
                    O comando <code className="text-purple-300 font-mono">break</code> interrompe o loop, enquanto o <code className="text-purple-300 font-mono">continue</code> reinicia a rodada caso o usuário digite uma opção errada.
                  </p>
                  <p className="text-xs text-slate-400">
                    É a transição perfeita do nível iniciante para o nível intermediário!
                  </p>
                </>
              )}
            </div>
          )}

          {/* Quick Summary Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-400">
            <span className="font-bold text-slate-200 block mb-1">
              Como o Python lê as Condicionais?
            </span>
            O Python lê de cima para baixo. Ao encontrar a primeira condição verdadeira, ele executa o bloco indentado correspondente e <strong>ignora</strong> todos os outros <code className="text-amber-300 font-mono">elif</code> e o <code className="text-amber-300 font-mono">else</code>. Se nenhuma for verdadeira, ele cai no <code className="text-amber-300 font-mono">else</code>.
          </div>
        </div>
      </div>
    </section>
  );
};
