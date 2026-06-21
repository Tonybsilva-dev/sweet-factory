# Caso de uso — Compras

## Objetivo

Registrar compras de ingredientes, embalagens, adesivos e materiais descartáveis, atualizando estoque e custo médio quando aplicável.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Data da compra.
- Fornecedor opcional.
- Itens da compra.
- Quantidade.
- Unidade.
- Valor total.
- Observação opcional.

## Fluxo principal

1. Usuário informa itens comprados.
2. Sistema valida itens.
3. Sistema converte quantidades para unidade base.
4. Sistema calcula valor unitário.
5. Sistema atualiza estoque.
6. Sistema recalcula custo médio para ingredientes.
7. Sistema atualiza custo unitário para materiais.
8. Sistema salva compra.
9. Sistema registra log.

## Regras aplicadas

- Compra precisa ter ao menos um item.
- Valor total precisa ser maior que zero.
- Quantidade precisa ser maior que zero.
- Ingredientes usam custo médio ponderado.
- Materiais usam custo unitário.
- Quando a divisão de custo médio ou custo unitário não for exata, o resultado persistido deve ser arredondado para centavos inteiros.

## Saída esperada

- Compra registrada.
- Estoque atualizado.
- Custo médio atualizado.
- Log criado.

## Critérios de aceite

- Deve registrar compra com múltiplos itens.
- Deve atualizar estoque do ingrediente.
- Deve recalcular custo médio corretamente.
- Deve atualizar custo unitário de embalagem.
- Deve impedir unidade incompatível.

## Estado atual da implementação

Implementado em `/application`:

- Model Mongoose em `src/modules/purchases/purchase.model.ts`.
- Schemas Zod em `src/modules/purchases/purchase.schemas.ts`.
- Repository em `src/modules/purchases/purchase.repository.ts`.
- Service/use-case em `src/modules/purchases/purchase.service.ts`.
- Helper puro de cálculo em `src/modules/purchases/purchase-cost.ts`.
- Testes unitários em `src/modules/purchases/purchase-cost.test.ts`.
- Route handler:
  - `app/api/purchases/route.ts`

Comportamento implementado:

- `GET /api/purchases` lista compras com filtros por período, tipo de item e paginação.
- `POST /api/purchases` registra compra com múltiplos itens.
- Compras de ingrediente convertem quantidade para a unidade base do ingrediente.
- Compras de ingrediente atualizam `currentStockQuantity`.
- Compras de ingrediente recalculam `averageCostCents` usando custo médio ponderado.
- Compras de materiais convertem quantidade para `un`.
- Compras de materiais atualizam `currentStockQuantity` e `unitCostCents`.
- `totalAmountCents` da compra é calculado pela soma dos itens.
- Valores financeiros persistidos são inteiros em centavos.
- Rotas exigem autenticação; registro de compra exige role `admin`.
- Route handlers apenas validam entrada, chamam service/use-case e retornam resposta padronizada.

## Logs de auditoria

- `purchase.created`
- `ingredient.stock_updated`
- `ingredient.average_cost_updated`
- `packaging.stock_updated`
- `packaging.unit_cost_updated`

Estado atual:

- Todos os logs acima foram implementados.
- Logs de atualização de estoque/custo registram `before` e `after` dos campos alterados.
- `purchase.created` registra `before: null` e `after` com a compra criada.
- Logs de rotas protegidas recebem `userId` do usuário autenticado.

## Observações para implementação

Executar atualização de estoque e criação da compra de forma consistente. Se usar transação MongoDB, preferir replica set. Se não usar, tratar falhas com cuidado.

## Pendências técnicas

- Transações MongoDB ainda não foram implementadas.
- Sem transação, existe risco de inconsistência se alguma etapa falhar entre atualização de estoque/custo, criação da compra e logs.
- Criar testes de integração com banco para o fluxo completo de compras.
