/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { PythonSimulator } from './components/PythonSimulator';
import { ConditionalFlowDiagram } from './components/ConditionalFlowDiagram';
import { ConceptsGrid } from './components/ConceptsGrid';
import { BeginnerQuiz } from './components/BeginnerQuiz';
import { HowToRunModal } from './components/HowToRunModal';
import { Terminal, Download, Play, BookOpen, ShieldCheck, Cpu } from 'lucide-react';
import { BASIC_CALCULATOR_CODE } from './data/pythonSnippets';

export default function App() {
  const [isHowToRunOpen, setIsHowToRunOpen] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([BASIC_CALCULATOR_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora_simples.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 3-Zone Top Navigation Bar */}
      <Header onOpenHowToRun={() => setIsHowToRunOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <section className="relative pt-2 pb-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
              <span className="text-emerald-400">Tutorial Python 3</span>
              <span aria-hidden="true">·</span>
              <span>Lógica de Programação</span>
              <span aria-hidden="true">·</span>
              <span>Iniciante</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance mb-4">
              Calculadora Simples em Python com Condicionais
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl text-balance mb-8">
              Guia didático feito especialmente para quem está começando a programar. Aprenda as 5 operações fundamentais (<code className="text-emerald-400 font-mono">+</code>, <code className="text-emerald-400 font-mono">-</code>, <code className="text-emerald-400 font-mono">*</code>, <code className="text-emerald-400 font-mono">/</code>, <code className="text-emerald-400 font-mono">%</code>), como ler dados do usuário com <code className="text-amber-300 font-mono">input()</code> e como tomar decisões com <code className="text-amber-300 font-mono">if / elif / else</code>.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#codigo"
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Código & Explicações</span>
              </a>

              <a
                href="#simulador"
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 fill-current text-emerald-400" />
                <span>Testar no Simulador</span>
              </a>

              <button
                type="button"
                onClick={() => setIsHowToRunOpen(true)}
                className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Terminal className="w-4 h-4" />
                <span>Como Rodar no seu Computador</span>
              </button>
            </div>
          </div>

          {/* Quick Pillar Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Cpu className="w-4 h-4" />
                <span>5 Operações Matemáticas</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Soma (<code className="font-mono text-amber-300">+</code>), Subtração (<code className="font-mono text-amber-300">-</code>), Multiplicação (<code className="font-mono text-amber-300">*</code>), Divisão (<code className="font-mono text-amber-300">/</code>) e Porcentagem (<code className="font-mono text-amber-300">%</code>) com suporte a decimais via <code className="font-mono text-amber-300">float()</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Divisão por Zero Segura</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tratamento com <code className="font-mono text-amber-300">if num2 == 0</code> para evitar a interrupção do programa com <code className="font-mono text-rose-300">ZeroDivisionError</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Fluxo if / elif / else</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Estrutura de decisão organizada onde cada ramificação é avaliada de forma lógica, limpa e indentada no padrão oficial PEP 8.
              </p>
            </div>
          </div>
        </section>

        {/* Section 1: Code and Interactive Line Explanations */}
        <CodeViewer />

        {/* Section 2: Visual Simulation & Live Terminal */}
        <PythonSimulator />

        {/* Section 3: Visual Flowchart of Conditionals */}
        <ConditionalFlowDiagram />

        {/* Section 4: Deep Dive on Core Concepts */}
        <ConceptsGrid />

        {/* Section 5: Beginner Quiz */}
        <BeginnerQuiz />

        {/* Quick Local Setup Card */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Pronto para praticar no seu computador?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Baixe o código Python completo pronto para rodar. Você pode abri-lo no VS Code, PyCharm, IDLE ou diretamente no Prompt de Comando / Terminal.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsHowToRunOpen(true)}
              className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Ver Passo a Passo
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Baixar calculadora.py</span>
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span>Calculadora Básica em Python · Guia Educativo para Iniciantes em Programação</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#codigo" className="hover:text-slate-200 transition-colors">
              Código
            </a>
            <span aria-hidden="true">·</span>
            <a href="#simulador" className="hover:text-slate-200 transition-colors">
              Simulador
            </a>
            <span aria-hidden="true">·</span>
            <a href="#fluxo" className="hover:text-slate-200 transition-colors">
              Fluxograma
            </a>
            <span aria-hidden="true">·</span>
            <a href="#conceitos" className="hover:text-slate-200 transition-colors">
              Conceitos
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HowToRunModal isOpen={isHowToRunOpen} onClose={() => setIsHowToRunOpen(false)} />
    </div>
  );
}
