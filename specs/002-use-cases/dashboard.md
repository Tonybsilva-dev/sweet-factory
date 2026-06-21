# Caso de uso — Dashboard

## Objetivo

Exibir indicadores mensais de vendas, gastos, lucro estimado e variações.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Mês selecionado.
- Ano selecionado.
- Filtros opcionais de canal e pagamento.

## Fluxo principal

1. Usuário acessa dashboard.
2. Sistema identifica mês atual ou selecionado.
3. Sistema busca vendas do período.
4. Sistema busca compras do período.
5. Sistema compara com mês anterior.
6. Sistema calcula variações percentuais.
7. Sistema retorna indicadores.

## Regras aplicadas

- Comparar mês selecionado com mês anterior.
- Receita deve considerar valor líquido.
- Gastos devem considerar compras registradas.
- Lucro bruto estimado deve usar snapshots das vendas.

## Saída esperada

- Total de vendas.
- Variação de vendas.
- Gastos com ingredientes.
- Gastos com embalagens e adesivos.
- Variação de gastos.
- Produtos mais vendidos.
- Ticket médio.
- Lucro bruto estimado.

## Critérios de aceite

- Deve exibir receita do mês.
- Deve exibir comparação com mês anterior.
- Deve exibir gastos separados por ingrediente e embalagem/material.
- Deve exibir top produtos vendidos.
- Deve lidar com mês anterior zerado.

## Logs de auditoria

Dashboard normalmente não precisa gerar log, salvo se houver exportação futura.

## Observações para implementação

Usar aggregation pipeline no MongoDB. Criar índices por data.
