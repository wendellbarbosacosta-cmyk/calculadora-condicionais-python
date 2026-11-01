# ============================================
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
num2 = float(input("Digite o segundo número (ou taxa % se escolheu porcentagem): "))

# 4. Estrutura condicional para calcular o resultado
if operacao == "1" or operacao == "+":
    resultado = num1 + num2
    print(f"\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "2" or operacao == "-":
    resultado = num1 - num2
    print(f"\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "3" or operacao == "*":
    resultado = num1 * num2
    print(f"\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "4" or operacao == "/":
    # Atenção: não é possível dividir nenhum número por zero!
    if num2 == 0:
        print("\nErro: Não é possível realizar divisão por zero!")
    else:
        resultado = num1 / num2
        print(f"\nResultado: {num1} / {num2} = {resultado}")

elif operacao == "5" or operacao == "%":
    resultado = (num1 * num2) / 100
    print(f"\nResultado: {num2}% de {num1} = {resultado}")

else:
    print("\nOperação inválida! Por favor, escolha uma opção entre 1 e 5.")
