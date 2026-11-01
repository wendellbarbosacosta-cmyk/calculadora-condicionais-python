export interface CodeLineExplanation {
  line: number;
  code: string;
  category: 'input' | 'condition' | 'operation' | 'output' | 'comment' | 'header';
  title: string;
  explanation: string;
  beginnerTip?: string;
}

export interface PythonCodeVersion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullCode: string;
  lines: CodeLineExplanation[];
}

export const BASIC_CALCULATOR_CODE = `# ============================================
# CALCULADORA BÁSICA EM PYTHON
# Operações: Soma, Subtração, Multiplicação, Divisão e Porcentagem
# ============================================

# 1. Apresentação do menu ao usuário
print("--- CALCULADORA SIMPLES ---")
print("1 - Soma (+)")
print("2 - Subtração (-)")
print("3 - Multiplicação (*)")
print("4 - Divisão (/)")
print("5 - Porcentagem (%)")

# 2. Leitura da operação escolhida
operacao = input("Escolha a operação (1, 2, 3, 4 ou 5): ")

# 3. Leitura dos dois números
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número (ou taxa %): "))

# 4. Estrutura condicional para calcular o resultado
if operacao == "1" or operacao == "+":
    resultado = num1 + num2
    print(f"\\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "2" or operacao == "-":
    resultado = num1 - num2
    print(f"\\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "3" or operacao == "*":
    resultado = num1 * num2
    print(f"\\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "4" or operacao == "/":
    # Atenção: não é possível dividir nenhum número por zero!
    if num2 == 0:
        print("\\nErro: Não é possível realizar divisão por zero!")
    else:
        resultado = num1 / num2
        print(f"\\nResultado: {num1} / {num2} = {resultado}")

elif operacao == "5" or operacao == "%":
    resultado = (num1 * num2) / 100
    print(f"\\nResultado: {num2}% de {num1} = {resultado}")

else:
    print("\\nOperação inválida! Por favor, escolha uma opção entre 1 e 5.")
`;

export const FUNCTIONS_CALCULATOR_CODE = `# ============================================
# CALCULADORA ORGANIZADA EM FUNÇÕES (def)
# Próximo passo após dominar as condicionais!
# ============================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero não é permitida!"
    return a / b

def calcular_porcentagem(valor, taxa):
    return (valor * taxa) / 100

# Entrada de dados
print("Escolha: 1-Soma, 2-Subtração, 3-Multiplicação, 4-Divisão, 5-Porcentagem")
opcao = input("Opção desejada: ")
n1 = float(input("Primeiro valor: "))
n2 = float(input("Segundo valor (ou taxa %): "))

# Condicionais chamando as funções
if opcao == "1":
    print(f"Resultado: {somar(n1, n2)}")
elif opcao == "2":
    print(f"Resultado: {subtrair(n1, n2)}")
elif opcao == "3":
    print(f"Resultado: {multiplicar(n1, n2)}")
elif opcao == "4":
    print(f"Resultado: {dividir(n1, n2)}")
elif opcao == "5":
    print(f"Resultado: {calcular_porcentagem(n1, n2)}")
else:
    print("Opção inválida.")
`;

export const LOOP_CALCULATOR_CODE = `# ============================================
# CALCULADORA CONTÍNUA COM LAÇO WHILE
# O programa continua executando até o usuário digitar 'sair'
# ============================================

while True:
    print("\\n--- CALCULADORA EM LOOP ---")
    print("Opções: [+] [-] [*] [/] [%] ou [sair]")
    op = input("Operação: ").strip().lower()

    if op == "sair":
        print("Encerrando a calculadora. Até logo!")
        break

    if op not in ["+", "-", "*", "/", "%", "1", "2", "3", "4", "5"]:
        print("Opção inválida! Tente novamente.")
        continue

    n1 = float(input("Primeiro número: "))
    n2 = float(input("Segundo número: "))

    if op in ["+", "1"]:
        print(f"Resultado: {n1 + n2}")
    elif op in ["-", "2"]:
        print(f"Resultado: {n1 - n2}")
    elif op in ["*", "3"]:
        print(f"Resultado: {n1 * n2}")
    elif op in ["/", "4"]:
        if n2 == 0:
            print("Erro: Impossível dividir por zero!")
        else:
            print(f"Resultado: {n1 / n2}")
    elif op in ["%", "5"]:
        print(f"Resultado: {n2}% de {n1} = {(n1 * n2) / 100}")
`;

export const BASIC_LINE_EXPLANATIONS: CodeLineExplanation[] = [
  {
    line: 1,
    code: "# ============================================",
    category: "comment",
    title: "Comentários em Python",
    explanation: "Em Python, qualquer linha que começa com o símbolo de cerquilha (#) é um comentário. O Python ignora essa linha na execução. Serve para documentar o código para humanos.",
    beginnerTip: "Use comentários para explicar o 'porquê' das coisas, nunca tenha medo de documentar enquanto aprende!"
  },
  {
    line: 7,
    code: 'print("--- CALCULADORA SIMPLES ---")',
    category: "output",
    title: "A função print()",
    explanation: "A função print() exibe mensagens ou dados na tela/terminal. Textos literais devem ficar entre aspas simples ('...') ou aspas duplas (\"...\").",
    beginnerTip: "Sem o print(), o computador calcula tudo em silêncio e o usuário não vê nada acontecer."
  },
  {
    line: 15,
    code: 'operacao = input("Escolha a operação (1, 2, 3, 4 ou 5): ")',
    category: "input",
    title: "A função input() e Variáveis",
    explanation: "A função input() pausa o programa e espera o usuário digitar algo e pressionar Enter. O texto digitado é guardado na variável 'operacao'.",
    beginnerTip: "Importante: o input() SEMPRE devolve um texto (tipo str / string), mesmo que o usuário digite apenas números!"
  },
  {
    line: 18,
    code: 'num1 = float(input("Digite o primeiro número: "))',
    category: "input",
    title: "Conversão de tipo com float()",
    explanation: "Como input() lê texto, '10' + '5' resultaria no texto '105' (concatenação). A função float() converte o texto digitado em um número decimal de ponto flutuante, permitindo contas com decimais (como 3.5 ou 10.0).",
    beginnerTip: "Se você usasse int(), o usuário só poderia digitar números inteiros. Com float(), aceita inteiros e decimais!"
  },
  {
    line: 22,
    code: 'if operacao == "1" or operacao == "+":',
    category: "condition",
    title: "Estrutura Condicional: if (Se)",
    explanation: "O 'if' avalia uma condição lógica. Usamos '==' (dois sinais de igual) para comparar igualdade. O operador 'or' permite que o usuário digite tanto o número '1' quanto o símbolo '+' para somar. Os dois pontos (:) no final são obrigatórios!",
    beginnerTip: "Atenção: um único sinal '=' serve para ATRIBUIR valor a uma variável. Dois sinais '==' servem para COMPARAR se duas coisas são iguais!"
  },
  {
    line: 23,
    code: "    resultado = num1 + num2",
    category: "operation",
    title: "Indentação e Operação de Soma (+)",
    explanation: "Repare no espaço antes de 'resultado'. No Python, a indentação (geralmente 4 espaços) define que essa linha só será executada SE a condição do 'if' acima for verdadeira.",
    beginnerTip: "Em outras linguagens usam chaves { }, mas o Python usa espaços! Se esquecer de identar, dará 'IndentationError'."
  },
  {
    line: 24,
    code: '    print(f"\\nResultado: {num1} + {num2} = {resultado}")',
    category: "output",
    title: "F-Strings (Formatação de Texto)",
    explanation: "A letra 'f' antes das aspas indica uma 'f-string' (formatted string literal). Ela permite colocar variáveis diretamente dentro do texto usando chaves {variavel}, tornando o código muito limpo e legível.",
    beginnerTip: "O '\\n' dentro do texto cria uma quebra de linha (pula uma linha), deixando a visualização no terminal mais agradável."
  },
  {
    line: 26,
    code: 'elif operacao == "2" or operacao == "-":',
    category: "condition",
    title: "O que é o elif (Senão Se)?",
    explanation: "O 'elif' é a junção de 'else + if'. Ele só é testado se o 'if' anterior for FALSO. Se a primeira condição não bateu, o Python checa essa segunda. Usamos o operador de subtração '-'.",
    beginnerTip: "Você pode ter quantos 'elif' precisar para encadear várias opções!"
  },
  {
    line: 30,
    code: 'elif operacao == "3" or operacao == "*":',
    category: "condition",
    title: "Multiplicação com asterisco (*)",
    explanation: "Na programação, o símbolo de multiplicação é o asterisco (*). Novamente usamos o 'elif' para testar se a escolha foi a terceira operação.",
    beginnerTip: "Não use a letra 'x' para multiplicar no código, sempre use '*'!"
  },
  {
    line: 34,
    code: 'elif operacao == "4" or operacao == "/":',
    category: "condition",
    title: "Divisão com barra (/)",
    explanation: "Na programação, a divisão real é feita com uma barra diagonal para a frente (/). Aqui começamos a verificação da quarta opção.",
    beginnerTip: "Em Python 3, a divisão comum (/) sempre devolve um número float, por exemplo 10 / 2 resulta em 5.0."
  },
  {
    line: 36,
    code: "    if num2 == 0:",
    category: "condition",
    title: "Condicional Aninhada: Prevenção de Divisão por Zero",
    explanation: "Na matemática, dividir qualquer número por zero é impossível. No computador, isso causa um erro fatal (ZeroDivisionError) que travaria o programa. Por isso, colocamos um 'if' interno para verificar se num2 é 0 antes de calcular!",
    beginnerTip: "Sempre valide os dados que o usuário digita para evitar que seu programa quebre de surpresa."
  },
  {
    line: 37,
    code: '        print("\\nErro: Não é possível realizar divisão por zero!")',
    category: "output",
    title: "Mensagem de Erro Amigável",
    explanation: "Se o segundo número for zero, informamos o usuário com clareza em vez de deixar o programa explodir com mensagem em inglês do sistema.",
    beginnerTip: "Bons programadores pensam sempre na experiência de quem está usando o software."
  },
  {
    line: 38,
    code: "    else:",
    category: "condition",
    title: "O else da Divisão (Caso o divisor seja válido)",
    explanation: "Se num2 NÃO for zero (ou seja, a condição if num2 == 0 foi falsa), caímos com segurança neste 'else' e fazemos o cálculo num1 / num2.",
    beginnerTip: "Note a indentação dupla (8 espaços) para mostrar que este else pertence ao if interno de divisão por zero."
  },
  {
    line: 42,
    code: 'elif operacao == "5" or operacao == "%":',
    category: "condition",
    title: "Cálculo de Porcentagem (%)",
    explanation: "Verifica se a opção escolhida foi porcentagem (digitando '5' ou '%'). Calculamos quanto é a taxa (num2)% em relação ao valor base (num1) através da fórmula (num1 * num2) / 100.",
    beginnerTip: "Para calcular 15% de 200, multiplicamos o valor pela taxa e dividimos por 100: (200 * 15) / 100 = 30.0."
  },
  {
    line: 46,
    code: "else:",
    category: "condition",
    title: "O else final (Caso Geral / Padrão)",
    explanation: "O 'else' principal é acionado caso NENHUMA das opções anteriores (1, 2, 3, 4 ou 5) tenha sido escolhida. É a rede de segurança para entradas incorretas (ex: se o usuário digitar 'banana' ou '9').",
    beginnerTip: "O else nunca recebe uma condição ao lado dele; ele simplesmente engloba 'tudo o que sobrou'."
  }
];

export const CORE_CONCEPTS = [
  {
    id: "variables",
    title: "1. Variáveis e Tipos",
    tag: "Conceito Base",
    summary: "Como o computador armazena informações temporárias na memória.",
    detail: "Uma variável é como uma caixa etiquetada. Quando escrevemos `num1 = 10`, estamos guardando o valor 10 dentro da caixa chamada `num1`. Em Python não precisamos declarar o tipo previamente (tipagem dinâmica).",
    codeSample: 'nome = "Ana"       # tipo str (texto)\nidade = 25        # tipo int (inteiro)\npreco = 19.90     # tipo float (decimal)\nativo = True      # tipo bool (booleano)'
  },
  {
    id: "input_float",
    title: "2. Entrada com input() e float()",
    tag: "Entrada de Dados",
    summary: "Por que não podemos apenas fazer `num1 = input()`?",
    detail: "A função `input()` SEMPRE lê o que o usuário digita como texto (string). Se o usuário digitar '5' e '3' e fizermos `n1 + n2`, o Python juntará os textos resultando em '53'! Usamos `float(input(...))` para transformar o texto em número com casas decimais.",
    codeSample: '# Incorreto:\nx = input("Valor: ")  # usuário digita 5 -> x é "5"\n\n# Correto para contas:\nx = float(input("Valor: "))  # converte "5" para 5.0'
  },
  {
    id: "conditionals",
    title: "3. Estruturas Condicionais (if / elif / else)",
    tag: "Lógica de Decisão",
    summary: "Ensinando o programa a tomar caminhos diferentes de acordo com a escolha.",
    detail: "O computador segue caminhos alternativos. O 'if' testa a primeira hipótese. Se for falsa, passa para o 'elif'. Se todas forem falsas, executa o 'else'. Os 4 espaços de indentação dizem ao Python o que pertence a cada bloco.",
    codeSample: 'if opcao == "1":\n    print("Somando")\nelif opcao == "2":\n    print("Subtraindo")\nelse:\n    print("Opção não reconhecida")'
  },
  {
    id: "division_zero",
    title: "4. Tratamento de Divisão por Zero",
    tag: "Boas Práticas",
    summary: "A regra de ouro da matemática transposta para a programação.",
    detail: "Tentar dividir qualquer número por 0 resulta em `ZeroDivisionError: division by zero`. Um programa robusto SEMPRE verifica se o divisor é igual a 0 (`if num2 == 0:`) antes de executar a divisão.",
    codeSample: 'if num2 == 0:\n    print("Erro: não pode dividir por zero!")\nelse:\n    resultado = num1 / num2'
  },
  {
    id: "fstrings",
    title: "5. Formatação com F-Strings",
    tag: "Exibição Limpa",
    summary: "Como exibir textos e variáveis misturados de forma elegante.",
    detail: "Introduzidas no Python 3.6, as f-strings são a forma padrão moderna de interpolar texto. Basta colocar a letra 'f' antes da primeira aspa e colocar qualquer variável entre chaves `{variavel}`.",
    codeSample: 'a = 10\nb = 2\nprint(f"O cálculo de {a} dividido por {b} é {a / b}")\n# Imprime: O cálculo de 10 dividido por 2 é 5.0'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "O que acontece se somarmos duas variáveis lidas diretamente com input() sem usar float() ou int()?",
    options: [
      { text: "O Python calcula a soma matemática normalmente.", isCorrect: false },
      { text: "O Python concatena os dois textos (ex: '2' + '3' vira '23').", isCorrect: true },
      { text: "O Python gera um erro de sintaxe imediatamente.", isCorrect: false },
      { text: "O programa apaga a memória das variáveis.", isCorrect: false }
    ],
    explanation: "Como a função input() sempre retorna uma string (texto), o operador '+' entre textos realiza uma concatenação (junta os textos lado a lado) em vez de somar matematicamente."
  },
  {
    id: 2,
    question: "Qual é a diferença entre '=' e '==' em Python?",
    options: [
      { text: "'=' compara se dois valores são iguais; '==' atribui um valor.", isCorrect: false },
      { text: "Não há diferença, ambos fazem a mesma coisa.", isCorrect: false },
      { text: "'=' atribui valor a uma variável; '==' compara se dois valores são iguais.", isCorrect: true },
      { text: "'==' só pode ser usado para números inteiros.", isCorrect: false }
    ],
    explanation: "'=' é o operador de atribuição (ex: x = 10). Já '==' é o operador de comparação relacional que retorna True ou False (ex: if x == 10:)."
  },
  {
    id: 3,
    question: "Por que usamos 'elif' em vez de múltiplos 'if' independentes?",
    options: [
      { text: "Porque o 'elif' só é testado se as condições anteriores forem falsas, economizando processamento e evitando conflitos.", isCorrect: true },
      { text: "Porque o Python proíbe escrever mais de um 'if' no mesmo arquivo.", isCorrect: false },
      { text: "O 'elif' serve exclusivamente para fazer contas de divisão.", isCorrect: false },
      { text: "Não há vantagem prática, é apenas questão de preferência visual.", isCorrect: false }
    ],
    explanation: "Em uma cadeia if/elif/else, assim que uma condição é atendida, o Python executa aquele bloco e pula todo o restante da estrutura, tornando o fluxo mútuo e eficiente."
  },
  {
    id: 4,
    question: "O que acontece se tentarmos executar 15 / 0 em Python sem nenhuma verificação?",
    options: [
      { text: "O resultado é exibido como infinito (Infinity).", isCorrect: false },
      { text: "O Python interrompe o programa com o erro ZeroDivisionError.", isCorrect: true },
      { text: "O resultado é automaticamente transformado em 0.", isCorrect: false },
      { text: "O Python arredonda o resultado para 1.", isCorrect: false }
    ],
    explanation: "Dividir por zero é matematicamente indefinido e o interpretador Python lança uma exceção chamada ZeroDivisionError, parando a execução do script se não houver tratamento prévio."
  }
];
