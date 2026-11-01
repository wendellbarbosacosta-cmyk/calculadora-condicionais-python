import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, ArrowRight, CornerDownLeft, Eye, Terminal } from 'lucide-react';

interface SimulationTraceStep {
  stepNumber: number;
  line: string;
  explanation: string;
  status: 'info' | 'eval-true' | 'eval-false' | 'error' | 'success';
}

export const PythonSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visual' | 'terminal'>('visual');

  // Visual simulation state
  const [num1Input, setNum1Input] = useState<string>('12');
  const [num2Input, setNum2Input] = useState<string>('4');
  const [opInput, setOpInput] = useState<string>('1'); // 1 = Soma, 2 = Subtração, 3 = Multiplicação, 4 = Divisão, 9 = Inválido
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [traceSteps, setTraceSteps] = useState<SimulationTraceStep[]>([]);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  // Terminal interactive state
  const [terminalStage, setTerminalStage] = useState<'idle' | 'op' | 'num1' | 'num2' | 'finished'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [terminalInputVal, setTerminalInputVal] = useState<string>('');
  const [termOp, setTermOp] = useState<string>('');
  const [termN1, setTermN1] = useState<number>(0);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Calculate trace steps when user clicks "Executar Passo a Passo"
  const runVisualSimulation = (customN1?: string, customN2?: string, customOp?: string) => {
    const n1Str = customN1 !== undefined ? customN1 : num1Input;
    const n2Str = customN2 !== undefined ? customN2 : num2Input;
    const op = customOp !== undefined ? customOp : opInput;

    const n1 = parseFloat(n1Str);
    const n2 = parseFloat(n2Str);
    const steps: SimulationTraceStep[] = [];

    // Step 1: Input reading
    steps.push({
      stepNumber: 1,
      line: `operacao = "${op}"`,
      explanation: `O usuário escolheu a opção "${op}". O valor é guardado como texto (string).`,
      status: 'info'
    });

    // Step 2: Conversion
    if (isNaN(n1) || isNaN(n2)) {
      steps.push({
        stepNumber: 2,
        line: `num1 = float("${n1Str}"), num2 = float("${n2Str}")`,
        explanation: 'ERRO: Um dos valores digitados não é um número válido! A conversão float() falharia com ValueError.',
        status: 'error'
      });
      setTraceSteps(steps);
      setCurrentStepIndex(steps.length - 1);
      setFinalResult('ValueError: Valor não numérico');
      return;
    }

    steps.push({
      stepNumber: 2,
      line: `num1 = ${n1}, num2 = ${n2}`,
      explanation: `A função float() converteu os textos em números decimais: num1 = ${n1} e num2 = ${n2}.`,
      status: 'info'
    });

    // Step 3: if condition (Soma)
    const isSum = op === '1' || op === '+';
    steps.push({
      stepNumber: 3,
      line: `if operacao == "1" or operacao == "+":`,
      explanation: `O Python testa: "${op}" == "1" ou "${op}" == "+"? Resultado: ${isSum ? 'VERDADEIRO (True)' : 'FALSO (False)'}`,
      status: isSum ? 'eval-true' : 'eval-false'
    });

    if (isSum) {
      const res = n1 + n2;
      steps.push({
        stepNumber: 4,
        line: `resultado = ${n1} + ${n2}  # (${res})`,
        explanation: `Como a condição foi verdadeira, entra no bloco da soma e calcula ${n1} + ${n2} = ${res}.`,
        status: 'success'
      });
      steps.push({
        stepNumber: 5,
        line: `print(f"\\nResultado: {resultado}")`,
        explanation: `Exibe no terminal: "Resultado: ${n1} + ${n2} = ${res}". As outras condições (elif e else) são totalmente ignoradas!`,
        status: 'success'
      });
      setTraceSteps(steps);
      setCurrentStepIndex(steps.length - 1);
      setFinalResult(`${n1} + ${n2} = ${res}`);
      return;
    }

    // Step 4: elif Subtração
    const isSub = op === '2' || op === '-';
    steps.push({
      stepNumber: 4,
      line: `elif operacao == "2" or operacao == "-":`,
      explanation: `O Python testa: "${op}" == "2" ou "${op}" == "-"? Resultado: ${isSub ? 'VERDADEIRO (True)' : 'FALSO (False)'}`,
      status: isSub ? 'eval-true' : 'eval-false'
    });

    if (isSub) {
      const res = n1 - n2;
      steps.push({
        stepNumber: 5,
        line: `resultado = ${n1} - ${n2}  # (${res})`,
        explanation: `Calcula a subtração: ${n1} - ${n2} = ${res}.`,
        status: 'success'
      });
      steps.push({
        stepNumber: 6,
        line: `print(f"\\nResultado: {resultado}")`,
        explanation: `Exibe: "Resultado: ${n1} - ${n2} = ${res}". Fim da execução.`,
        status: 'success'
      });
      setTraceSteps(steps);
      setCurrentStepIndex(steps.length - 1);
      setFinalResult(`${n1} - ${n2} = ${res}`);
      return;
    }

    // Step 5: elif Multiplicação
    const isMult = op === '3' || op === '*';
    steps.push({
      stepNumber: 5,
      line: `elif operacao == "3" or operacao == "*":`,
      explanation: `O Python testa: "${op}" == "3" ou "${op}" == "*"? Resultado: ${isMult ? 'VERDADEIRO (True)' : 'FALSO (False)'}`,
      status: isMult ? 'eval-true' : 'eval-false'
    });

    if (isMult) {
      const res = n1 * n2;
      steps.push({
        stepNumber: 6,
        line: `resultado = ${n1} * ${n2}  # (${res})`,
        explanation: `Calcula a multiplicação com asterisco (*): ${n1} * ${n2} = ${res}.`,
        status: 'success'
      });
      steps.push({
        stepNumber: 7,
        line: `print(f"\\nResultado: {resultado}")`,
        explanation: `Exibe: "Resultado: ${n1} * ${n2} = ${res}".`,
        status: 'success'
      });
      setTraceSteps(steps);
      setCurrentStepIndex(steps.length - 1);
      setFinalResult(`${n1} * ${n2} = ${res}`);
      return;
    }

    // Step 6: elif Divisão
    const isDiv = op === '4' || op === '/';
    steps.push({
      stepNumber: 6,
      line: `elif operacao == "4" or operacao == "/":`,
      explanation: `O Python testa: "${op}" == "4" ou "${op}" == "/"? Resultado: ${isDiv ? 'VERDADEIRO (True)' : 'FALSO (False)'}`,
      status: isDiv ? 'eval-true' : 'eval-false'
    });

    if (isDiv) {
      // Nested if: check division by zero
      if (n2 === 0) {
        steps.push({
          stepNumber: 7,
          line: `if num2 == 0:  # (0 == 0 -> True)`,
          explanation: `ATENÇÃO: O segundo número é 0! A condição é VERDADEIRA. O Python entra na proteção contra divisão por zero.`,
          status: 'error'
        });
        steps.push({
          stepNumber: 8,
          line: `print("Erro: Não é possível realizar divisão por zero!")`,
          explanation: `A mensagem amigável é impressa e o programa não quebra com ZeroDivisionError.`,
          status: 'error'
        });
        setTraceSteps(steps);
        setCurrentStepIndex(steps.length - 1);
        setFinalResult('Erro: Divisão por Zero');
        return;
      } else {
        const res = n1 / n2;
        steps.push({
          stepNumber: 7,
          line: `if num2 == 0:  # (${n2} == 0 -> False)`,
          explanation: `O segundo número é ${n2} (diferente de 0), então a condição é FALSA. O Python pula para o 'else'.`,
          status: 'eval-false'
        });
        steps.push({
          stepNumber: 8,
          line: `resultado = ${n1} / ${n2}  # (${res})`,
          explanation: `Divisão segura executada com sucesso! ${n1} / ${n2} = ${res}.`,
          status: 'success'
        });
        steps.push({
          stepNumber: 9,
          line: `print(f"\\nResultado: {resultado}")`,
          explanation: `Exibe: "Resultado: ${n1} / ${n2} = ${res}".`,
          status: 'success'
        });
        setTraceSteps(steps);
        setCurrentStepIndex(steps.length - 1);
        setFinalResult(`${n1} / ${n2} = ${res}`);
        return;
      }
    }

    // Step 7: else fallback
    steps.push({
      stepNumber: 7,
      line: `else:`,
      explanation: `Como nenhuma das condições anteriores (1, 2, 3 ou 4) foi atendida, o Python executa o bloco padrão 'else'.`,
      status: 'error'
    });
    steps.push({
      stepNumber: 8,
      line: `print("Operação inválida! Escolha entre 1 e 5.")`,
      explanation: `O usuário recebe um aviso informando que a opção "${op}" não existe.`,
      status: 'error'
    });
    setTraceSteps(steps);
    setCurrentStepIndex(steps.length - 1);
    setFinalResult('Operação Inválida');
  };

  // Initial visual run on load
  useEffect(() => {
    runVisualSimulation('12', '4', '1');
  }, []);

  // Presets
  const applyPreset = (n1: string, n2: string, op: string) => {
    setNum1Input(n1);
    setNum2Input(n2);
    setOpInput(op);
    runVisualSimulation(n1, n2, op);
  };

  // Terminal logic
  const startTerminal = () => {
    setTerminalLogs([
      'Python 3.12.0 (main, Nov 2026)',
      'Executando: python calculadora.py',
      '--------------------------------',
      '--- CALCULADORA SIMPLES ---',
      '1 - Soma (+)',
      '2 - Subtração (-)',
      '3 - Multiplicação (*)',
      '4 - Divisão (/)',
      'Escolha a operação (1, 2, 3 ou 4): '
    ]);
    setTerminalStage('op');
    setTerminalInputVal('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInputVal.trim()) return;

    const val = terminalInputVal.trim();
    setTerminalInputVal('');

    if (terminalStage === 'op') {
      setTermOp(val);
      setTerminalLogs(prev => [
        ...prev.slice(0, prev.length - 1),
        `Escolha a operação (1, 2, 3, 4 ou 5): ${val}`,
        'Digite o primeiro número: '
      ]);
      setTerminalStage('num1');
    } else if (terminalStage === 'num1') {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        setTerminalLogs(prev => [
          ...prev.slice(0, prev.length - 1),
          `Digite o primeiro número: ${val}`,
          'ValueError: could not convert string to float: ' + val,
          'Programa encerrado com erro.'
        ]);
        setTerminalStage('finished');
        return;
      }
      setTermN1(parsed);
      setTerminalLogs(prev => [
        ...prev.slice(0, prev.length - 1),
        `Digite o primeiro número: ${val}`,
        'Digite o segundo número: '
      ]);
      setTerminalStage('num2');
    } else if (terminalStage === 'num2') {
      const parsed2 = parseFloat(val);
      if (isNaN(parsed2)) {
        setTerminalLogs(prev => [
          ...prev.slice(0, prev.length - 1),
          `Digite o segundo número: ${val}`,
          'ValueError: could not convert string to float: ' + val,
          'Programa encerrado com erro.'
        ]);
        setTerminalStage('finished');
        return;
      }

      // Execute calculation
      const logsToAdd: string[] = [`Digite o segundo número: ${val}`];
      if (termOp === '1' || termOp === '+') {
        logsToAdd.push(`\nResultado: ${termN1} + ${parsed2} = ${termN1 + parsed2}`);
      } else if (termOp === '2' || termOp === '-') {
        logsToAdd.push(`\nResultado: ${termN1} - ${parsed2} = ${termN1 - parsed2}`);
      } else if (termOp === '3' || termOp === '*') {
        logsToAdd.push(`\nResultado: ${termN1} * ${parsed2} = ${termN1 * parsed2}`);
      } else if (termOp === '4' || termOp === '/') {
        if (parsed2 === 0) {
          logsToAdd.push('\nErro: Não é possível realizar divisão por zero!');
        } else {
          logsToAdd.push(`\nResultado: ${termN1} / ${parsed2} = ${termN1 / parsed2}`);
        }
      } else {
        logsToAdd.push('\nOperação inválida! Por favor, escolha uma opção entre 1 e 4.');
      }
      logsToAdd.push('\n>>> Process finished with exit code 0');

      setTerminalLogs(prev => [...prev.slice(0, prev.length - 1), ...logsToAdd]);
      setTerminalStage('finished');
    }
  };

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  return (
    <section id="simulador" className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5 uppercase tracking-wider">
            <span>Passo 2</span>
            <span aria-hidden="true">·</span>
            <span>Laboratório Prático</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Simulador Interativo da Execução
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Experimente como o interpretador Python avalia as condicionais na memória do computador. Teste os atalhos didáticos para ver como o código se comporta.
          </p>
        </div>

        {/* Tab Switcher: Visual Trace vs Real Terminal */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'visual'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Passo a Passo Visual</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('terminal');
              if (terminalStage === 'idle') startTerminal();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'terminal'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Interativo</span>
          </button>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls & Inputs */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Entrada de Dados</span>
              <span className="text-[11px] font-normal text-emerald-400 font-mono">input()</span>
            </h3>

            {/* Quick Presets */}
            <div className="mb-4">
              <label className="text-xs text-slate-400 block mb-2 font-medium">
                Cenários Didáticos Pré-configurados:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => applyPreset('200', '15', '5')}
                  className="p-2 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-900/50 rounded-lg text-left text-emerald-300 transition-colors col-span-2"
                >
                  <span className="font-semibold block text-emerald-400">Porcentagem (%)</span>
                  <span className="text-[11px] text-emerald-300/70">15% de 200 = 30.0</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('15', '7', '1')}
                  className="p-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-left text-slate-300 transition-colors"
                >
                  <span className="font-semibold block text-emerald-400">Soma Básica</span>
                  <span className="text-[11px] text-slate-400">15 + 7</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('20', '0', '4')}
                  className="p-2 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-900/50 rounded-lg text-left text-rose-300 transition-colors"
                >
                  <span className="font-semibold block text-rose-400">Divisão por Zero</span>
                  <span className="text-[11px] text-rose-300/70">20 ÷ 0 (Evita Erro)</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('4.5', '2.0', '3')}
                  className="p-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-left text-slate-300 transition-colors"
                >
                  <span className="font-semibold block text-sky-400">Multiplicação Float</span>
                  <span className="text-[11px] text-slate-400">4.5 * 2.0 (Decimais)</span>
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('50', '5', '9')}
                  className="p-2 bg-amber-950/30 hover:bg-amber-950/50 border border-amber-900/50 rounded-lg text-left text-amber-300 transition-colors"
                >
                  <span className="font-semibold block text-amber-400">Opção Inválida</span>
                  <span className="text-[11px] text-amber-300/70">Operação "9" (else)</span>
                </button>
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div>
                <label className="text-xs text-slate-300 block mb-1 font-mono">
                  num1 (Primeiro Número):
                </label>
                <input
                  type="number"
                  step="any"
                  value={num1Input}
                  onChange={(e) => setNum1Input(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
                  placeholder="Ex: 10"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-mono">
                  operacao (Escolha a Operação):
                </label>
                <select
                  value={opInput}
                  onChange={(e) => setOpInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
                >
                  <option value="1">1 ou "+" (Soma)</option>
                  <option value="2">2 ou "-" (Subtração)</option>
                  <option value="3">3 ou "*" (Multiplicação)</option>
                  <option value="4">4 ou "/" (Divisão)</option>
                  <option value="9">9 (Opção Inexistente para testar o else)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1 font-mono">
                  num2 (Segundo Número):
                </label>
                <input
                  type="number"
                  step="any"
                  value={num2Input}
                  onChange={(e) => setNum2Input(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
                  placeholder="Ex: 2"
                />
              </div>

              <button
                type="button"
                onClick={() => runVisualSimulation()}
                className="w-full mt-2 py-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Rastrear Execução</span>
              </button>
            </div>

            {/* Variable Memory State Inspector */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Memória do Computador (Variáveis)
              </span>
              <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs space-y-1.5 border border-slate-800/80">
                <div className="flex justify-between">
                  <span className="text-slate-400">num1 (float):</span>
                  <span className="text-amber-300 font-bold">{num1Input}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">operacao (str):</span>
                  <span className="text-emerald-300 font-bold">"{opInput}"</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">num2 (float):</span>
                  <span className="text-amber-300 font-bold">{num2Input}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800">
                  <span className="text-slate-400">resultado:</span>
                  <span className="text-emerald-400 font-bold">{finalResult || 'Calculando...'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Trace Timeline */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Trilha de Execução do Interpretador
                </h3>
                <p className="text-xs text-slate-400">
                  Veja exatamente por onde o Python passou e quais ramos foram descartados.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {traceSteps.length} etapas avaliadas
              </span>
            </div>

            <div className="space-y-3">
              {traceSteps.map((step, idx) => {
                let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';
                let icon = <ArrowRight className="w-3.5 h-3.5" />;

                if (step.status === 'eval-true') {
                  badgeStyle = 'bg-emerald-950/60 text-emerald-300 border-emerald-700/70';
                  icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
                } else if (step.status === 'eval-false') {
                  badgeStyle = 'bg-slate-800/60 text-slate-400 border-slate-800';
                  icon = <span className="text-xs text-slate-500 font-mono">False</span>;
                } else if (step.status === 'error') {
                  badgeStyle = 'bg-rose-950/60 text-rose-300 border-rose-800/80';
                  icon = <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />;
                } else if (step.status === 'success') {
                  badgeStyle = 'bg-emerald-950/40 text-emerald-200 border-emerald-800/60';
                  icon = <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />;
                }

                return (
                  <div
                    key={idx}
                    className={`border rounded-lg p-3 transition-all ${badgeStyle}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold font-mono">
                          {idx + 1}
                        </span>
                        <code className="font-mono text-xs font-bold text-white">
                          {step.line}
                        </code>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {icon}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 ml-7 leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Final Outcome Banner */}
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Saída Final no Terminal:</span>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {finalResult ? `Resultado: ${finalResult}` : '...'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => applyPreset('10', '2', '4')}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
              >
                Testar Divisão Normal (10 / 2)
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Terminal Mode */
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-slate-300">Terminal Bash: python calculadora.py</span>
            </div>
            <button
              onClick={startTerminal}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Terminal</span>
            </button>
          </div>

          <div
            ref={terminalBottomRef}
            className="p-5 font-mono text-xs sm:text-sm text-slate-200 min-h-[340px] max-h-[460px] overflow-y-auto space-y-1.5 leading-relaxed bg-[#0b0f19]"
          >
            {terminalLogs.map((log, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {log.startsWith('Error') || log.startsWith('Erro') || log.includes('ValueError') ? (
                  <span className="text-rose-400 font-semibold">{log}</span>
                ) : log.startsWith('Resultado') ? (
                  <span className="text-emerald-400 font-bold">{log}</span>
                ) : (
                  <span>{log}</span>
                )}
              </div>
            ))}

            {terminalStage !== 'idle' && terminalStage !== 'finished' && (
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-1">
                <span className="text-emerald-400 font-bold">&gt;&gt;&gt;</span>
                <input
                  type="text"
                  autoFocus
                  value={terminalInputVal}
                  onChange={(e) => setTerminalInputVal(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono text-sm placeholder:text-slate-600"
                  placeholder={
                    terminalStage === 'op'
                      ? 'Digite 1, 2, 3, 4 ou +, -, *, / e tecle Enter'
                      : 'Digite um número e tecle Enter'
                  }
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded flex items-center gap-1"
                >
                  <CornerDownLeft className="w-3 h-3" />
                  <span>Enter</span>
                </button>
              </form>
            )}

            {terminalStage === 'finished' && (
              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center gap-3">
                <span className="text-xs text-slate-400">Execução finalizada.</span>
                <button
                  onClick={startTerminal}
                  className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded hover:bg-emerald-500/30 transition-colors"
                >
                  Executar Novamente
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
