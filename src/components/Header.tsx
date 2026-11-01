import React from 'react';
import { Terminal, Download, Copy, Check } from 'lucide-react';
import { BASIC_CALCULATOR_CODE } from '../data/pythonSnippets';

interface HeaderProps {
  onOpenHowToRun: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHowToRun }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BASIC_CALCULATOR_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    const blob = new Blob([BASIC_CALCULATOR_CODE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-slate-100 font-bold text-lg tracking-tight whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-4 h-4" />
          </div>
          <span>Python Para Iniciantes</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#codigo" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Código & Explicações
          </a>
          <a href="#simulador" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Simulador Interativo
          </a>
          <a href="#fluxo" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Fluxo Condicional
          </a>
          <a href="#conceitos" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Conceitos Chave
          </a>
          <a href="#quiz" className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
            Quiz do Aluno
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenHowToRun}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Como Rodar no PC
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
            title="Baixar arquivo calculadora.py"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
