# Caso de uso — Logs de auditoria

## Objetivo

Registrar ações críticas realizadas no sistema para rastreabilidade.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Ação.
- Entidade.
- ID da entidade.
- Dados anteriores.
- Dados novos.
- Usuário.
- IP.
- User agent.

## Fluxo principal

1. Uma ação crítica é executada.
2. Sistema monta payload do log.
3. Sistema salva log em `audit_logs`.
4. Log fica disponível para consulta.

## Regras aplicadas

- Logs não devem ser editados.
- Logs não devem ser removidos pelo fluxo comum.
- Logs devem ser criados para ações críticas.
- Dados sensíveis devem ser mascarados.

## Saída esperada

- Log persistido.
- Histórico consultável.

## Critérios de aceite

- Deve registrar criação de produto.
- Deve registrar alteração de preço.
- Deve registrar compra.
- Deve registrar venda.
- Deve registrar habilitação/desabilitação no cardápio.

## Estado atual da implementação

Implementado em `/application`:

- Model Mongoose em `src/modules/audit-logs/audit-log.model.ts`.
- Repository em `src/modules/audit-logs/audit-log.repository.ts`.
- Service central em `src/modules/audit-logs/audit-log.service.ts`.
- Tipos em `src/modules/audit-logs/audit-log.types.ts`.

Comportamento implementado:

- `auditLogService.register` centraliza a criação de logs.
- Dados sensíveis são mascarados recursivamente para chaves como `password`, `passwordHash`, `accessToken`, `token` e `jwt`.
- Logs são criados para ingredientes, embalagens/materiais e compras.
- Logs registram `before` e `after` quando aplicável.
- Route Handlers protegidos obtêm o usuário autenticado e passam `userId` para os services.
- Logs de ingredientes, embalagens/materiais e compras recebem `userId` quando a ação passa por rota autenticada.

Limitações atuais:

- Captura de `ip` e `userAgent` ainda não foi conectada aos route handlers.
- Endpoint `GET /api/audit-logs` ainda não foi implementado.
- Logs de produtos, vendas e cardápio serão implementados junto dos respectivos módulos.

## Logs de auditoria

O próprio caso de uso gera registros em `audit_logs`.

## Observações para implementação

Criar helper único `auditLogService.register`. Evitar duplicação em cada controller.

## Pendências técnicas

- Capturar `ip` e `userAgent` a partir das requisições.
- Implementar endpoint de consulta de logs.
- Criar testes de integração para persistência de logs.
