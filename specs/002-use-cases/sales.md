# Caso de uso — Vendas

## Objetivo

Registrar vendas para alimentar dashboard, margem e histórico financeiro.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Data/hora.
- Produtos vendidos.
- Quantidade.
- Preço unitário.
- Desconto opcional.
- Canal de venda.
- Forma de pagamento.
- Observação opcional.

## Fluxo principal

1. Usuário seleciona produtos vendidos.
2. Sistema busca preço e custo atual ou snapshot do cardápio.
3. Usuário informa quantidade e desconto.
4. Sistema calcula totais.
5. Sistema calcula custo estimado.
6. Sistema calcula lucro bruto estimado.
7. Sistema salva venda.
8. Sistema registra log.

## Regras aplicadas

- Venda precisa ter pelo menos um item.
- Quantidade deve ser maior que zero.
- Desconto deve ser maior ou igual a zero.
- Desconto não pode ser maior que total bruto.
- Venda deve salvar snapshot de custo e preço.
- Venda antiga não pode ser recalculada automaticamente.
- Produto inativo não pode ser vendido.
- `unitPriceCents` informado no payload prevalece sobre o preço atual do produto.
- Se `unitPriceCents` não for informado, usar `salePriceCents` atual do produto.
- `calculatedCostCents` atual do produto deve ser salvo como custo snapshot.
- Baixa automática de estoque ainda não foi implementada.

## Snapshots

Cada item da venda salva:

- `productId`
- `nameSnapshot`
- `quantity`
- `unitPriceCents`
- `costSnapshotCents`
- `totalPriceCents`
- `estimatedProfitCents`

## Cálculos

Total bruto:

```txt
grossTotalCents = soma(quantity * unitPriceCents)
```

Total líquido:

```txt
netTotalCents = grossTotalCents - discountCents
```

Custo estimado:

```txt
estimatedCostCents = soma(quantity * costSnapshotCents)
```

Lucro bruto estimado:

```txt
estimatedGrossProfitCents = netTotalCents - estimatedCostCents
```

Lucro estimado por item:

```txt
estimatedProfitCents = totalPriceCents - (quantity * costSnapshotCents)
```

## Saída esperada

- Venda registrada.
- Receita salva.
- Custo estimado salvo.
- Lucro estimado salvo.

## Critérios de aceite

- Deve registrar venda com múltiplos produtos.
- Deve calcular total bruto.
- Deve aplicar desconto.
- Deve calcular lucro estimado.
- Deve salvar snapshots.

## Logs de auditoria

- `sale.created`
- `sale.cancelled` futuro
- `sale.updated` se edição for permitida

## Estado atual da implementação

Implementado em `/application`:

- Model Mongoose em `src/modules/sales/sale.model.ts`.
- Schemas Zod em `src/modules/sales/sale.schemas.ts`.
- Repository em `src/modules/sales/sale.repository.ts`.
- Service/use-cases em `src/modules/sales/sale.service.ts`.
- Helper puro de cálculo em `src/modules/sales/sale-calculation.ts`.
- Testes unitários em `src/modules/sales/sale-calculation.test.ts`.
- Teste de service com mocks em `src/modules/sales/sale.service.test.ts`.
- Route handler em `app/api/sales/route.ts`.

Rotas implementadas:

- `GET /api/sales`
- `POST /api/sales`

Permissões:

- `admin` pode listar e registrar vendas.
- `operator` pode listar e registrar vendas.

Filtros implementados em `GET /api/sales`:

- `startDate`
- `endDate`
- `paymentMethod`
- `salesChannel`
- `page`
- `limit`

Limitações atuais:

- Sem UI de vendas.
- Sem cancelamento de venda.
- Sem baixa automática de estoque.
- Sem testes de integração com Mongo real.
- Dashboard ainda pendente.

## Observações para implementação

No MVP, evitar edição de venda. Se precisar corrigir, preferir cancelamento + nova venda.
