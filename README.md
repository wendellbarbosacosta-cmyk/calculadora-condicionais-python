# 🧮 Calculadora Simples em Python para Iniciantes

![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-concluído-brightgreen.svg)
![Nível](https://img.shields.io/badge/nível-iniciante-orange.svg)

Uma calculadora didática desenvolvida em **Python 3** que realiza as 5 operações matemáticas fundamentais (soma, subtração, multiplicação, divisão e porcentagem), utilizando **estruturas de controle condicionais** (`if`, `elif` e `else`) para guiar a tomada de decisões com base na escolha do usuário.

O projeto inclui tanto o script Python pronto para execução no terminal quanto uma **interface interativa com simulador passo a passo e fluxograma visual**.

---

## 🎯 Objetivos do Projeto

- Compreender a captura e conversão de entradas com `input()` e `float()`.
- Aplicar estruturas condicionais (`if`, `elif`, `else`) para controlar o fluxo de execução.
- Validar operações matemáticas críticas, como a prevenção de **divisão por zero** (`ZeroDivisionError`).
- Realizar cálculos comerciais básicos, como **porcentagens** (`%`).
- Formatar saídas de forma legível e moderna através de **f-strings**.
- Escrever código limpo, legível e em conformidade com as diretrizes do **PEP 8**.

---

## ⚙️ Funcionalidades (5 Operações Matemáticas)

- [x] **Adição (+)**: Soma dois números (inteiros ou decimais).
- [x] **Subtração (-)**: Subtrai o segundo valor do primeiro.
- [x] **Multiplicação (*)**: Efetua o produto entre os dois valores.
- [x] **Divisão (/)**: Realiza a divisão real com tratamento de erro caso o divisor seja igual a zero.
- [x] **Porcentagem (%)**: Calcula a porcentagem de um valor base (ex: 15% de 200 = 30.0) através da fórmula `(num1 * num2) / 100`.
- [x] **Validação de Opção**: Mensagem amigável via bloco `else` caso uma opção fora de 1 a 5 seja selecionada.

---

## 🖥️ Laboratório Interativo (Web App Integrado)

Além do script Python puro, o repositório traz uma aplicação web educativa construída em **React + TypeScript + Vite**:

1. **Simulador de Execução Passo a Passo**: Permite acompanhar a memória do computador e o teste lógico de cada condicional em tempo real.
2. **Terminal Interativo Embutido**: Simula a execução do terminal Python diretamente no navegador.
3. **Fluxograma Visual Interativo**: Acende o caminho exato que o interpretador Python percorre de acordo com a operação escolhida.
4. **Quiz para Iniciantes**: Perguntas interativas sobre conceitos fundamentais de Python (variáveis, tipos, indentação e operadores).

Para abrir a interface interativa no seu navegador:
```bash
npm install --legacy-peer-deps
npm run dev
```

---

## 🧠 Conceitos e Componentes Explicados

### 1. Entrada de Dados e Conversão de Tipos
Por padrão, a função `input()` lê qualquer dado digitado como texto (`string`). Para realizar operações matemáticas, convertemos com `float()`:
```python
num1 = float(input("Digite o primeiro número: "))
```

### 2. Estrutura de Decisão Condicional (`if / elif / else`)
O Python avalia a opção do usuário sequencialmente de cima para baixo. Assim que encontra uma condição verdadeira, executa o bloco e ignora os demais:
```python
if operacao == "1" or operacao == "+":
    # Executa se a opção for soma
elif operacao == "2" or operacao == "-":
    # Executa apenas se o if anterior foi falso
elif operacao == "5" or operacao == "%":
    # Executa o cálculo da porcentagem
else:
    # Rede de segurança caso nenhuma condição anterior seja atendida
```

### 3. Prevenção de Divisão por Zero
Dividir por zero resulta em erro fatal (`ZeroDivisionError`). O código trata isso previamente com uma condicional aninhada:
```python
elif operacao == "4" or operacao == "/":
    if num2 == 0:
        print("\nErro: Não é possível realizar divisão por zero!")
    else:
        resultado = num1 / num2
        print(f"\nResultado: {resultado}")
```

### 4. Cálculo de Porcentagem
Para calcular quanto é uma porcentagem $Y\%$ sobre um valor base $X$, multiplicamos o valor base pela taxa e dividimos por 100:
```python
elif operacao == "5" or operacao == "%":
    resultado = (num1 * num2) / 100
    print(f"\nResultado: {num2}% de {num1} = {resultado}")
```

---

## 🚀 Como Executar o Script Python no Terminal

### Pré-requisitos
Ter o **Python 3** instalado em seu computador ([python.org](https://www.python.org/downloads/)).

### Passo a Passo

1. **Acesse a pasta do projeto:**
```bash
cd calculadora-condicionais-python
```

2. **Execute o script:**
- No **Windows**:
  ```bash
  python calculadora.py
  ```
- No **Linux** ou **macOS**:
  ```bash
  python3 calculadora.py
  ```

---

## 🧪 Exemplo de Uso no Terminal

```text
--- CALCULADORA SIMPLES ---
1 - Soma (+)
2 - Subtração (-)
3 - Multiplicação (*)
4 - Divisão (/)
5 - Porcentagem (%)
Escolha a operação (1, 2, 3, 4 ou 5): 5
Digite o primeiro número (ou valor base): 200
Digite o segundo número (ou taxa %): 15

Resultado: 15.0% de 200.0 = 30.0
```

---

## 📈 Próximos Passos para Evolução

- [x] Encapsular as operações em funções (`def somar(a, b):`). *(Demonstrado no projeto)*
- [x] Implementar cálculo de porcentagem.
- [ ] Implementar um laço de repetição (`while True`) para a calculadora não encerrar após um único cálculo.
- [ ] Adicionar suporte a histórico de cálculos.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) - sinta-se livre para utilizar, modificar e compartilhar para fins de estudo.

---
Desenvolvido por **Wendell Barbosa Costa** como parte da minha jornada de aprendizado em programação e Imersão em Engenharia de Software com I.A - Alura.
