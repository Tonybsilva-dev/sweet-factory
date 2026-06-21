# Backlog para o agente

## Épico 1 — Setup

- [x] Criar projeto base.
- [x] Configurar TypeScript.
- [x] Configurar lint.
- [x] Configurar testes.
- [x] Configurar variáveis de ambiente.
- [x] Configurar conexão com MongoDB.

## Épico 2 — Domínio compartilhado

- [x] Criar helpers de dinheiro.
- [x] Criar helpers de unidade.
- [x] Criar camada de erros.
- [x] Criar serviço de auditoria.
- [x] Criar helper/middleware de autenticação.

## Épico 3 — Ingredientes

- [x] Criar schema/model.
- [x] Criar validações.
- [x] Criar endpoints CRUD.
- [ ] Criar testes unitários específicos do módulo.
- [ ] Criar testes de integração.
- [x] Criar logs.

## Épico 4 — Embalagens e adesivos

- [x] Criar schema/model.
- [x] Criar CRUD.
- [x] Criar registro de custo unitário via compras.
- [ ] Criar testes.
- [x] Criar logs.

## Épico 5 — Compras

- [x] Criar schema/model.
- [x] Criar endpoint de registro.
- [x] Atualizar estoque.
- [x] Recalcular custo médio.
- [x] Criar testes unitários para cálculo de custo.
- [ ] Criar testes de integração.
- [x] Criar logs.
- [ ] Implementar transações MongoDB quando ambiente com replica set estiver definido.

## Épico 6 — Produtos

- [x] Criar schema/model.
- [x] Criar cadastro de receita.
- [x] Calcular custo.
- [x] Calcular preço sugerido.
- [x] Criar recálculo de preço.
- [x] Criar testes unitários de cálculo.
- [x] Criar teste de service com mocks.
- [x] Criar logs.
- [ ] Criar testes de integração com MongoDB.

## Épico 7 — Cardápio diário

- [ ] Criar schema/model.
- [ ] Criar cardápio por data.
- [ ] Adicionar produtos.
- [ ] Habilitar/desabilitar.
- [ ] Publicar/encerrar.
- [ ] Criar testes.
- [ ] Criar logs.

## Épico 8 — Vendas

- [x] Criar schema/model.
- [x] Registrar venda.
- [x] Salvar snapshots.
- [x] Calcular lucro estimado.
- [x] Criar testes unitários de cálculo.
- [x] Criar teste de service com mocks.
- [x] Criar logs.
- [ ] Criar testes de integração com MongoDB.
- [ ] Criar cancelamento de venda, se aprovado em spec futura.
- [ ] Criar baixa automática de estoque, se aprovada em spec futura.

## Épico 9 — Dashboard

- [ ] Criar aggregation mensal.
- [ ] Calcular vendas.
- [ ] Calcular gastos.
- [ ] Calcular variações.
- [ ] Calcular top produtos.
- [ ] Criar testes.

## Épico 10 — UI

- [ ] Criar telas.
- [ ] Conectar endpoints.
- [ ] Criar componentes.
- [ ] Validar fluxos principais.

## Pendências técnicas transversais

- [x] Implementar autenticação e autorização básica.
- [x] Preencher `userId` nos logs de auditoria das rotas protegidas já implementadas.
- [ ] Capturar `ip` e `userAgent` nos logs de auditoria.
- [ ] Padronizar paginação para todas as listagens.
- [ ] Implementar endpoint de consulta de logs.
- [ ] Criar testes de integração com MongoDB para ingredientes, embalagens e compras.
- [ ] Criar testes de integração com MongoDB para produtos.
- [ ] Avaliar/implementar transações MongoDB para compras quando houver replica set.
- [ ] Avaliar/implementar transações MongoDB para produtos quando houver necessidade.
- [ ] Criar tela de login.
- [ ] Criar UI de produtos.
- [ ] Criar UI de vendas.
- [ ] Criar testes de integração com MongoDB para vendas.
- [ ] Implementar cancelamento de venda, se aprovado em spec futura.
- [ ] Implementar baixa automática de estoque, se aprovada em spec futura.
- [ ] Implementar refresh token, se necessário.
- [ ] Criar gestão administrativa de usuários, se necessário.
