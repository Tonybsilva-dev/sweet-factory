# Estratégia de testes

## Ferramentas

- Vitest para testes unitários.
- Testing Library para componentes.
- Testes de integração para Route Handlers e services.
- Playwright pode entrar futuramente para e2e.

## Prioridade no MVP

1. Testes unitários de dinheiro.
2. Testes unitários de unidades.
3. Testes unitários de custo médio.
4. Testes unitários de cálculo de produto.
5. Testes unitários de venda.
6. Testes de integração de compras.
7. Testes de integração de produtos.
8. Testes de integração de vendas.
9. Testes de dashboard.

## Regra para Codex

Nenhuma feature de regra de negócio deve ser entregue sem teste.

## Casos obrigatórios

- Não usar float para dinheiro.
- Converter kg para g.
- Converter l para ml.
- Calcular custo médio ponderado.
- Calcular custo de produto com embalagem.
- Calcular preço sugerido.
- Registrar venda com snapshot.
- Calcular dashboard mensal.
