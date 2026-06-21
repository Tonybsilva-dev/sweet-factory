# Dinheiro e unidades

## Dinheiro

Todos os valores devem ser salvos em centavos.

Exemplos:

| Valor exibido | Valor salvo |
|---|---:|
| R$ 1,00 | 100 |
| R$ 10,50 | 1050 |
| R$ 0,03 | 3 |

## Campos financeiros

Usar sufixo `Cents`.

Exemplos:

- `averageCostCents`
- `unitCostCents`
- `totalAmountCents`
- `salePriceCents`
- `suggestedPriceCents`
- `estimatedProfitCents`

## Unidades aceitas

MVP:

- `g`
- `kg`
- `ml`
- `l`
- `un`

## Conversões

| Entrada | Unidade base | Multiplicador |
|---|---|---:|
| kg | g | 1000 |
| g | g | 1 |
| l | ml | 1000 |
| ml | ml | 1 |
| un | un | 1 |

## Regras

1. Todo ingrediente deve ter uma unidade base.
2. Toda compra deve ser convertida para unidade base antes de atualizar estoque e custo médio.
3. Todo produto deve converter quantidade usada para unidade base antes de calcular custo.
4. Embalagens e adesivos devem ser tratados como unidade.
5. Não misturar unidade incompatível.

## Exemplo de cálculo

Ingrediente:

- Chocolate.
- Unidade base: g.
- Custo médio: 3 centavos por g.

Produto usa:

- 150g de chocolate.

Custo:

```txt
150 * 3 = 450 centavos
```

Resultado:

R$ 4,50.

## Cálculo de produto

Ingrediente no produto:

```txt
custoIngrediente = normalizedQuantity * averageCostCents
```

Material no produto:

```txt
custoMaterial = quantity * unitCostCents
```

Custo unitário base:

```txt
custoUnitario = (somaCustosIngredientes + somaCustosMateriais) / recipeYield
```

Custo com perda:

```txt
custoFinalUnitario = custoUnitario / (1 - lossPercentage / 100)
```

Preço sugerido:

```txt
suggestedPriceCents = calculatedCostCents / (1 - desiredMarginPercentage / 100)
```

Divisões não exatas usam arredondamento para centavos inteiros.
