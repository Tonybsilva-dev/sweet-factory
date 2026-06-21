# Caso de uso — Produtos

## Objetivo

Cadastrar produtos com ingredientes, embalagens, rendimento, perda, margem, custo calculado e preço sugerido.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Nome.
- Descrição.
- Categoria.
- Ingredientes.
- Quantidade de cada ingrediente.
- Materiais.
- Quantidade de cada material.
- Rendimento.
- Percentual de perda.
- Margem desejada.
- Preço manual opcional.

## Fluxo principal

1. Usuário informa dados do produto.
2. Sistema carrega custos atuais dos ingredientes.
3. Sistema carrega custos atuais dos materiais.
4. Sistema calcula custo total da receita.
5. Sistema divide pelo rendimento.
6. Sistema aplica perda.
7. Sistema calcula preço sugerido.
8. Sistema salva produto.
9. Sistema registra snapshots de custo.
10. Sistema registra log.

## Regras aplicadas

- Produto precisa ter nome.
- Produto precisa ter rendimento maior que zero.
- Produto precisa ter pelo menos um ingrediente.
- Margem deve ser maior que 0 e menor que 100.
- Preço manual pode sobrescrever preço sugerido.
- Ingredientes inativos não podem ser usados no produto.
- Materiais inativos não podem ser usados no produto.
- Listagem retorna apenas produtos ativos por padrão.
- Exclusão usa soft delete com `isActive: false`, `deletedAt` e `deletedBy`.

## Cálculo implementado

Ingrediente:

```txt
custoIngrediente = normalizedQuantity * averageCostCents
```

Material:

```txt
custoMaterial = quantity * unitCostCents
```

Custo unitário:

```txt
custoUnitario = (somaCustosIngredientes + somaCustosMateriais) / recipeYield
```

Perda:

```txt
custoFinalUnitario = custoUnitario / (1 - lossPercentage / 100)
```

Preço sugerido:

```txt
suggestedPriceCents = calculatedCostCents / (1 - desiredMarginPercentage / 100)
```

Divisões não exatas são arredondadas para centavos inteiros com `Math.round`.

## Snapshots

Ingrediente salvo no produto:

- `ingredientId`
- `nameSnapshot`
- `quantity`
- `unit`
- `normalizedQuantity`
- `normalizedUnit`
- `costSnapshotCents`

Material salvo no produto:

- `materialId`
- `nameSnapshot`
- `quantity`
- `unitCostSnapshotCents`

O recálculo de preço atualiza os snapshots usando os custos atuais de ingredientes e materiais.

## Saída esperada

- Produto criado.
- Custo calculado.
- Preço sugerido.
- Produto disponível para cardápio.

## Critérios de aceite

- Deve calcular custo unitário corretamente.
- Deve incluir embalagem no custo final.
- Deve incluir adesivo no custo final.
- Deve aplicar perda quando informada.
- Deve salvar preço sugerido e preço manual.

## Logs de auditoria

- `product.created`
- `product.updated`
- `product.price_recalculated`
- `product.deactivated`

## Estado atual da implementação

Implementado em `/application`:

- Model Mongoose em `src/modules/products/product.model.ts`.
- Schemas Zod em `src/modules/products/product.schemas.ts`.
- Repository em `src/modules/products/product.repository.ts`.
- Service/use-cases em `src/modules/products/product.service.ts`.
- Helper puro de cálculo em `src/modules/products/product-pricing.ts`.
- Testes unitários em `src/modules/products/product-pricing.test.ts`.
- Teste de service com mocks em `src/modules/products/product.service.test.ts`.
- Route handlers:
  - `app/api/products/route.ts`
  - `app/api/products/[id]/route.ts`
  - `app/api/products/[id]/recalculate-price/route.ts`

Rotas implementadas:

- `GET /api/products`
- `GET /api/products/[id]`
- `POST /api/products`
- `PATCH /api/products/[id]`
- `DELETE /api/products/[id]`
- `POST /api/products/[id]/recalculate-price`

Permissões:

- `GET` pode ser usado por `admin` e `operator`.
- `POST`, `PATCH`, `DELETE` e `recalculate-price` exigem `admin`.

Comportamento implementado:

- `POST /api/products` cria produto ativo.
- `PATCH /api/products/[id]` permite editar dados do produto.
- `PATCH` recalcula custo/preço quando ingredientes, materiais, rendimento, perda ou margem mudam.
- `DELETE /api/products/[id]` faz soft delete.
- `POST /api/products/[id]/recalculate-price` recalcula custo e preço sugerido usando custos atuais.
- `salePriceCents` pode ser definido manualmente.
- Se `salePriceCents` não for informado na criação, recebe `suggestedPriceCents`.
- Route handlers apenas autenticam, validam entrada, chamam service/use-case e retornam resposta padronizada.

## Limitações atuais

- Sem testes de integração com Mongo real.
- Sem transações MongoDB.
- Sem UI de produtos.
- Produto inativo ainda não é validado em cardápio porque cardápio ainda não foi implementado.

## Observações para implementação

Separar cálculo de custo em serviço puro para facilitar testes unitários.
