import React from 'react';
import { X, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface HowToRunModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToRunModal: React.FC<HowToRunModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(cmd);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Como Rodar a Calculadora no seu Computador
              </h3>
              <p className="text-xs text-slate-400">
                Guia passo a passo para quem está dando os primeiros passos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-sm text-slate-300">
          {/* Step 1 */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-white text-sm">
                Instale o Python (se ainda não tiver)
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Acesse o site oficial <strong className="text-emerald-400">python.org</strong> e baixe a versão mais recente.
            </p>
            <div className="p-2.5 bg-amber-950/30 border border-amber-900/50 rounded-lg text-xs text-amber-200">
              <strong>Atenção Usuários Windows:</strong> Durante a instalação, marque a caixinha <em>"Add Python to PATH"</em> na primeira tela. Isso é essencial para o comando funcionar no Prompt!
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-white text-sm">
                Salve o arquivo no seu computador
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clique no botão verde <strong>"Baixar .py"</strong> no topo desta página para salvar o arquivo com o nome <code className="font-mono text-amber-300">calculadora.py</code> na sua pasta de preferência (ex: Documentos ou Área de Trabalho).
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-white text-sm">
                Abra o Terminal ou Prompt de Comando e execute
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Navegue até a pasta onde salvou o arquivo e digite o comando abaixo:
            </p>

            <div className="space-y-2">
              <div>
                <span className="text-[11px] text-slate-400 block mb-1">No Windows (CMD ou PowerShell):</span>
                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-xs text-emerald-400">
                  <code>python calculadora.py</code>
                  <button
                    onClick={() => copyCommand('python calculadora.py')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedCmd === 'python calculadora.py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block mb-1">No macOS / Linux:</span>
                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-xs text-emerald-400">
                  <code>python3 calculadora.py</code>
                  <button
                    onClick={() => copyCommand('python3 calculadora.py')}
                    className="text-slate-400 hover:text-white"
                  >
                    {copiedCmd === 'python3 calculadora.py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
