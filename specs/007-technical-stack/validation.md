# Validação

## Biblioteca

Usar Zod para validar entrada da API e formulários.

## Local dos schemas

```txt
src/modules/<module>/<module>.schemas.ts
```

Exemplo:

```txt
src/modules/ingredients/ingredient.schemas.ts
```

## Regras

- Toda rota POST deve validar body.
- Toda rota PATCH deve validar body.
- Todo parâmetro de ID deve ser validado.
- Datas devem ser validadas.
- Dinheiro deve chegar como inteiro em centavos.
- Quantidades devem ser maiores que zero.
- Margem deve ser maior que 0 e menor que 100.
- Rendimento deve ser maior que zero.

## Exemplo

```ts
import { z } from "zod"

export const createIngredientSchema = z.object({
  name: z.string().min(1),
  baseUnit: z.enum(["g", "kg", "ml", "l", "un"]),
  category: z.string().min(1),
  currentStockQuantity: z.number().nonnegative().default(0),
  averageCostCents: z.number().int().nonnegative().default(0),
})
```

## Erros

Erros do Zod devem ser convertidos para o padrão definido em:

```txt
/specs/003-api/error-patterns.md
```
