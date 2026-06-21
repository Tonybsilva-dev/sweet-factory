# Ordem de implementação

## Fase 0 — Bootstrap Next.js

0. [x] Criar projeto com shadcn/ui preset.
1. [x] Confirmar App Router.
2. [x] Configurar `.env.example`.
3. [x] Configurar MongoDB.
4. [x] Configurar estrutura `src/modules`.
5. [x] Configurar estrutura `src/shared`.
6. [x] Configurar Vitest.


## Fase 1 — Fundação

1. [x] Setup do projeto.
2. [x] Configuração do MongoDB.
3. [x] Configuração de variáveis de ambiente.
4. [x] Configuração de testes.
5. [x] Helpers de dinheiro.
6. [x] Helpers de unidades.
7. [x] Camada de erros.
8. [x] Audit log service.
9. [x] Autenticação e autorização básica.

## Fase 2 — Cadastros base

10. [x] Ingredientes.
11. [x] Embalagens e adesivos.

## Fase 3 — Compras e custos

12. [x] Registro de compras.
13. [x] Atualização de estoque.
14. [x] Cálculo de custo médio.
15. [x] Custo unitário de materiais.
16. [ ] Testes de integração de compras.
17. [ ] Transações MongoDB, se ambiente suportar replica set.

## Fase 4 — Produtos

18. [x] Cadastro de produto.
19. [x] Cálculo de custo do produto.
20. [x] Preço sugerido.
21. [x] Recálculo manual de preço.

## Fase 5 — Operação diária

22. [ ] Cardápio diário.
23. [ ] Habilitar/desabilitar produtos.
24. [ ] Publicar/encerrar cardápio.
25. [x] Registro de vendas.

## Fase 6 — Análise

26. [ ] Dashboard mensal.
27. [ ] Top produtos.
28. [ ] Margem estimada.
29. [ ] Variação de gastos.

## Fase 7 — Refinamento

30. [ ] Tela de logs.
31. [ ] Melhorias de UX.
32. [ ] Exportação futura.
33. [ ] Estoque automático futuro.
34. [ ] Tela de login.
35. [ ] Refresh token, se necessário.
36. [ ] Gestão administrativa de usuários, se necessário.
37. [ ] UI de produtos.
38. [ ] Testes de integração com MongoDB.
39. [ ] Transações MongoDB, se necessário.
40. [ ] UI de vendas.
41. [ ] Cancelamento de venda, se aprovado em spec futura.
42. [ ] Baixa automática de estoque, se aprovada em spec futura.

## Regra de execução para agente

Implementar uma fase por vez.

Não iniciar dashboard antes de vendas e compras estarem funcionando.
