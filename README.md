# 🧮 Calculadora Simples em Python para Iniciantes

![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-concluído-brightgreen.svg)
![Nível](https://img.shields.io/badge/nível-iniciante-orange.svg)

Uma calculadora simples desenvolvida em **Python 3** que realiza as operações matemáticas fundamentais (soma, subtração, multiplicação, divisão e porcentagem), utilizando **estruturas de controle condicionais** (`if`, `elif` e `else`) para guiar a tomada de decisões com base na escolha do usuário.

Projeto criado como parte dos meus primeiros passos nos estudos de lógica de programação e sintaxe de Python.

---

## 🎯 Objetivos do Projeto

- Compreender a captura e conversão de entradas com `input()` e `float()`.
- Aplicar estruturas condicionais (`if`, `elif`, `else`) para controlar o fluxo de execução.
- Validar operações matemáticas críticas, como a prevenção de **divisão por zero** (`ZeroDivisionError`).
- Formatar saídas de forma legível e moderna através de **f-strings**.
- Escrever código limpo, legível e em conformidade com as diretrizes do **PEP 8**.

---

## ⚙️ Funcionalidades

- [x] **Adição (+)**: Soma dois números (inteiros ou decimais).
- [x] **Subtração (-)**: Subtrai o segundo valor do primeiro.
- [x] **Multiplicação (*)**: Efetua o produto entre os dois valores.
- [x] **Divisão (/)**: Realiza a divisão real com tratamento de erro caso o divisor seja igual a zero.
- [x] **Validação de Opção**: Mensagem amigável via bloco `else` caso uma opção inexistente seja selecionada.

---

## 🧠 Conceitos e Componentes Explicados

### 1. Entrada de Dados e Conversão de Tipos
Por padrão, a função `input()` lê qualquer dado digitado como texto (`string`). Para realizar operações matemáticas, envolvemos a entrada com `float()`:
```python
num1 = float(input("Digite o primeiro número: "))
```

### 2. Estrutura de Decisão Condicional
O Python avalia a opção do usuário sequencialmente de cima para baixo:
```python
if operacao == "1" or operacao == "+":
    # Executa se a opção for soma
elif operacao == "2" or operacao == "-":
    # Executa apenas se o if anterior foi falso
else:
    # Rede de segurança caso nenhuma condição anterior seja atendida
```

### 3. Prevenção de Divisão por Zero
Dividir por zero resulta em erro fatal (`ZeroDivisionError`). O código trata isso previamente:
```python
elif operacao == "4" or operacao == "/":
    if num2 == 0:
        print("\nErro: Não é possível realizar divisão por zero!")
    else:
        resultado = num1 / num2
        print(f"\nResultado: {resultado}")
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Ter o **Python 3** instalado em seu computador ([python.org](https://www.python.org/downloads/)).

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone https://github.com/SEU-USUARIO/calculadora-python-iniciantes.git
```

2. **Acesse a pasta do projeto:**
```bash
cd calculadora-python-iniciantes
```

3. **Execute o script:**
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
Escolha a operação (1, 2, 3 ou 4): 1
Digite o primeiro número: 15.5
Digite o segundo número: 4.5

Resultado: 15.5 + 4.5 = 20.0
```

---

## 📈 Próximos Passos para Evolução

- [ ] Encapsular as operações em funções (`def somar(a, b):`).
- [ ] Implementar um laço de repetição (`while True`) para a calculadora não encerrar após um único cálculo.
- [ ] Adicionar suporte a histórico de cálculos.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE) - sinta-se livre para utilizar, modificar e compartilhar para fins de estudo.

---
Desenvolvido por **Wendell Barbosa Costa** como parte da minha jornada de aprendizado em programação e Imersão em Engenharia de Software com I.A - Alura.
