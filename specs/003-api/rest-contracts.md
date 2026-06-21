# Contratos REST

Base path sugerido:

```txt
/api
```

## Auth

### POST /api/auth/login

Request:

```json
{
  "email": "admin@sweetfactory.local",
  "password": "admin123"
}
```

Response:

```json
{
  "data": {
    "accessToken": "jwt",
    "user": {
      "id": "string",
      "name": "Admin",
      "email": "admin@sweetfactory.local",
      "role": "admin"
    }
  }
}
```

Estado atual:

- Implementado.
- Valida `email` e `password`.
- Retorna JWT em `data.accessToken`.
- Retorna usuário serializado sem senha.
- Roles suportadas: `admin` e `operator`.
- Não há refresh token.

### POST /api/auth/recover-password/request

Request:

```json
{
  "email": "admin@sweetfactory.local"
}
```

Response:

```json
{
  "data": {
    "message": "Se o email existir, enviaremos instruções para recuperação."
  }
}
```

Response adicional em ambiente diferente de produção:

```json
{
  "data": {
    "message": "Se o email existir, enviaremos instruções para recuperação.",
    "recoveryToken": "token-para-teste-local"
  }
}
```

Estado atual:

- Implementado.
- Rota pública.
- Não revela se o email existe.
- Gera token apenas para usuário ativo.
- Token expira em 30 minutos.
- Invalida tokens anteriores em aberto do usuário.
- Provider de email real ainda não foi implementado.

### POST /api/auth/recover-password/verify

Request:

```json
{
  "token": "string"
}
```

Response:

```json
{
  "data": {
    "valid": true
  }
}
```

Estado atual:

- Implementado.
- Rota pública.
- Token inválido retorna erro padronizado.
- Token expirado retorna erro padronizado.
- Token usado retorna erro padronizado.

### POST /api/auth/recover-password/reset

Request:

```json
{
  "token": "string",
  "password": "novaSenha123",
  "confirmPassword": "novaSenha123"
}
```

Response:

```json
{
  "data": {
    "message": "Senha redefinida com sucesso."
  }
}
```

Estado atual:

- Implementado.
- Rota pública.
- Valida token/código de recuperação.
- Valida confirmação de senha.
- Salva nova senha com hash.
- Não retorna senha nem hash.
- Invalida tokens em aberto do usuário após reset.
- Gera audit log `auth.password_reset`.

## Ingredients

### GET /ingredients

Query:

- `search`
- `category`
- `isActive`

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para usuários autenticados.
- Lista apenas ativos por padrão.
- `isActive=false` permite consultar inativos.
- `page` e `limit` ainda não foram implementados para ingredientes.

Response atual:

```json
{
  "data": []
}
```

### POST /ingredients

```json
{
  "name": "Chocolate",
  "baseUnit": "g",
  "category": "Doces",
  "currentStockQuantity": 0,
  "averageCostCents": 0
}
```

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Retorna `201` com `{ "data": ingredient }`.
- Gera log `ingredient.created` com `userId`.

### PATCH /ingredients/:id

Atualiza dados básicos.

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Atualiza `name` e/ou `category`.
- Retorna `{ "data": ingredient }`.
- Gera log `ingredient.updated` com `userId`, `before` e `after`.

### DELETE /ingredients/:id

Exclusão lógica.

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Define `isActive: false` e `deletedAt`.
- Retorna `{ "data": ingredient }`.
- Gera log `ingredient.deactivated` com `userId`, `before` e `after`.

## Packaging materials

### GET /packaging-materials

Query atual:

- `search`
- `type`
- `isActive`

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para usuários autenticados.
- Lista apenas ativos por padrão.
- `isActive=false` permite consultar inativos.
- Paginação ainda não foi implementada.

Response atual:

```json
{
  "data": []
}
```

### POST /packaging-materials

```json
{
  "name": "Pote 250ml",
  "type": "packaging",
  "currentStockQuantity": 100,
  "unitCostCents": 80
}
```

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Retorna `201` com `{ "data": material }`.
- Gera log `packaging.created` com `userId`.

### PATCH /packaging-materials/:id

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Atualiza `name` e/ou `type`.
- Retorna `{ "data": material }`.
- Gera log `packaging.updated` com `userId`, `before` e `after`.

### DELETE /packaging-materials/:id

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Define `isActive: false` e `deletedAt`.
- Retorna `{ "data": material }`.
- Gera log `packaging.deactivated` com `userId`, `before` e `after`.

## Purchases

### GET /purchases

Query:

- `startDate`
- `endDate`
- `itemType`
- `page`
- `limit`

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para usuários autenticados.
- Retorna `{ "data": purchases }`.
- Filtros implementados: `startDate`, `endDate`, `itemType`, `page`, `limit`.

### POST /purchases

```json
{
  "purchaseDate": "2026-06-17T12:00:00.000Z",
  "supplierName": "Atacadão",
  "items": [
    {
      "itemType": "ingredient",
      "itemId": "string",
      "quantity": 2,
      "unit": "kg",
      "totalPriceCents": 6000
    }
  ],
  "notes": "Compra semanal"
}
```

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Retorna `201` com `{ "data": purchase }`.
- Atualiza estoque/custo médio de ingredientes.
- Atualiza estoque/custo unitário de materiais.
- Gera logs `purchase.created`, `ingredient.stock_updated`, `ingredient.average_cost_updated`, `packaging.stock_updated` e `packaging.unit_cost_updated` com `userId`.
- Custo médio e custo unitário são arredondados para centavos inteiros quando a divisão não é exata.
- Transações MongoDB ainda não foram implementadas.

## Products

### GET /products

Query:

- `search`
- `category`
- `isActive`

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para usuários autenticados (`admin` e `operator`).
- Lista apenas ativos por padrão.
- `isActive=false` permite consultar inativos.
- Retorna `{ "data": products }`.

Response atual:

```json
{
  "data": []
}
```

### GET /products/:id

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para usuários autenticados (`admin` e `operator`).
- Valida ObjectId.
- Retorna `{ "data": product }`.

### POST /products

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Retorna `201` com `{ "data": product }`.
- Gera log `product.created` com `userId`.

Request:

```json
{
  "name": "Mousse de Morango",
  "description": "Pote 250ml",
  "category": "Mousses",
  "imageUrl": null,
  "ingredients": [
    {
      "ingredientId": "507f1f77bcf86cd799439011",
      "quantity": 0.5,
      "unit": "kg"
    }
  ],
  "materials": [
    {
      "materialId": "507f1f77bcf86cd799439012",
      "quantity": 1
    }
  ],
  "recipeYield": 6,
  "lossPercentage": 5,
  "desiredMarginPercentage": 50,
  "salePriceCents": 900
}
```

Response:

```json
{
  "data": {
    "id": "string",
    "name": "Mousse de Morango",
    "description": "Pote 250ml",
    "category": "Mousses",
    "imageUrl": null,
    "ingredients": [
      {
        "ingredientId": "507f1f77bcf86cd799439011",
        "nameSnapshot": "Morango",
        "quantity": 0.5,
        "unit": "kg",
        "normalizedQuantity": 500,
        "normalizedUnit": "g",
        "costSnapshotCents": 3
      }
    ],
    "materials": [
      {
        "materialId": "507f1f77bcf86cd799439012",
        "nameSnapshot": "Pote 250ml",
        "quantity": 1,
        "unitCostSnapshotCents": 80
      }
    ],
    "recipeYield": 6,
    "lossPercentage": 5,
    "desiredMarginPercentage": 50,
    "calculatedCostCents": 277,
    "suggestedPriceCents": 554,
    "salePriceCents": 900,
    "isActive": true,
    "deletedAt": null,
    "deletedBy": null
  }
}
```

### PATCH /products/:id

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Valida ObjectId.
- Permite editar dados do produto.
- Recalcula custo e preço sugerido quando ingredientes, materiais, rendimento, perda ou margem mudam.
- Retorna `{ "data": product }`.
- Gera log `product.updated` com `userId`, `before` e `after`.

Request parcial:

```json
{
  "name": "Mousse de Morango Premium",
  "salePriceCents": 1200
}
```

### DELETE /products/:id

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Valida ObjectId.
- Faz soft delete com `isActive: false`, `deletedAt` e `deletedBy`.
- Retorna `{ "data": product }`.
- Gera log `product.deactivated` com `userId`, `before` e `after`.

### POST /products/:id/recalculate-price

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido apenas para `admin`.
- Valida ObjectId.
- Recalcula custo e preço sugerido com base nos custos atuais.
- Atualiza snapshots de ingredientes e materiais.
- Retorna `{ "data": product }`.
- Gera log `product.price_recalculated` com `userId`, `before` e `after`.

Request:

```json
{}
```

## Cálculo de produtos

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
calculatedCostCents = custoUnitario / (1 - lossPercentage / 100)
```

Preço sugerido:

```txt
suggestedPriceCents = calculatedCostCents / (1 - desiredMarginPercentage / 100)
```

Divisões não exatas são arredondadas para centavos inteiros com `Math.round`.

## Daily menu

### GET /daily-menus/by-date/:date

Data no formato:

```txt
YYYY-MM-DD
```

### GET /daily-menus/:id

Consulta cardápio por ObjectId.

### POST /daily-menus

```json
{
  "date": "2026-06-17",
  "products": [
    {
      "productId": "string",
      "enabled": true,
      "salePriceCents": 900
    }
  ],
  "notes": "Cardápio do dia"
}
```

### PATCH /daily-menus/:id/products/:productId

```json
{
  "enabled": false,
  "salePriceCents": 850
}
```

### POST /daily-menus/:id/publish

### POST /daily-menus/:id/close

## Sales

### GET /sales

Query:

- `startDate`
- `endDate`
- `paymentMethod`
- `salesChannel`
- `page`
- `limit`

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para `admin` e `operator`.
- Retorna `{ "data": sales }`.
- Filtros implementados: `startDate`, `endDate`, `paymentMethod`, `salesChannel`, `page`, `limit`.

Response atual:

```json
{
  "data": []
}
```

### POST /sales

Estado atual:

- Implementado.
- Exige `Authorization: Bearer <accessToken>`.
- Permitido para `admin` e `operator`.
- Retorna `201` com `{ "data": sale }`.
- Gera log `sale.created` com `userId`.
- Produto inativo não pode ser vendido.
- Venda antiga não é recalculada automaticamente quando produto muda.
- Baixa automática de estoque ainda não foi implementada.

Request:

```json
{
  "saleDate": "2026-06-21T12:00:00.000Z",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "unitPriceCents": 900
    }
  ],
  "discountCents": 0,
  "paymentMethod": "pix",
  "salesChannel": "whatsapp",
  "notes": "Venda teste"
}
```

Response:

```json
{
  "data": {
    "id": "string",
    "saleDate": "2026-06-21T12:00:00.000Z",
    "items": [
      {
        "productId": "507f1f77bcf86cd799439011",
        "nameSnapshot": "Mousse de Morango",
        "quantity": 2,
        "unitPriceCents": 900,
        "costSnapshotCents": 420,
        "totalPriceCents": 1800,
        "estimatedProfitCents": 960
      }
    ],
    "grossTotalCents": 1800,
    "discountCents": 0,
    "netTotalCents": 1800,
    "estimatedCostCents": 840,
    "estimatedGrossProfitCents": 960,
    "paymentMethod": "pix",
    "salesChannel": "whatsapp",
    "notes": "Venda teste",
    "createdBy": "userId"
  }
}
```

## Cálculo de vendas

```txt
grossTotalCents = soma(quantity * unitPriceCents)
netTotalCents = grossTotalCents - discountCents
estimatedCostCents = soma(quantity * costSnapshotCents)
estimatedGrossProfitCents = netTotalCents - estimatedCostCents
estimatedProfitCents = totalPriceCents - (quantity * costSnapshotCents)
```

## Dashboard

### GET /dashboard/monthly-summary

Query:

- `month`
- `year`

Response:

```json
{
  "period": {
    "month": 6,
    "year": 2026
  },
  "sales": {
    "currentMonthCents": 100000,
    "previousMonthCents": 80000,
    "variationPercentage": 25
  },
  "expenses": {
    "ingredientsCents": 30000,
    "packagingCents": 5000,
    "ingredientsVariationPercentage": 10,
    "packagingVariationPercentage": -5
  },
  "profit": {
    "estimatedGrossProfitCents": 65000
  },
  "ticket": {
    "averageTicketCents": 2500
  },
  "topProducts": []
}
```

## Audit logs

### GET /audit-logs

Query:

- `entity`
- `entityId`
- `action`
- `startDate`
- `endDate`
- `page`
- `limit`

Estado atual:

- Ainda não implementado.
- A base de persistência e o service `auditLogService.register` já existem.
- Logs gerados por rotas protegidas recebem `userId` do usuário autenticado.
- Captura de `ip` e `userAgent` ainda não foi conectada.


## Implementação Next.js

Esses contratos REST devem ser implementados com Route Handlers do Next.js App Router.

Exemplo:

```txt
application/app/api/ingredients/route.ts
application/app/api/ingredients/[id]/route.ts
```

Cada Route Handler deve:

1. Validar entrada com Zod.
2. Chamar service/use-case.
3. Retornar resposta padronizada.
4. Registrar log de auditoria quando aplicável.

## Resposta de sucesso padronizada

Estado atual da implementação:

```json
{
  "data": {}
}
```

Listagens retornam:

```json
{
  "data": []
}
```

Paginação ainda não tem formato padronizado implementado.
