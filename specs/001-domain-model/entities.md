# Entidades de domínio

## User

Representa o usuário do sistema.

Campos principais:

- id
- name
- email
- passwordHash
- role
- isActive
- createdAt
- updatedAt

Roles sugeridas:

- admin
- operator

## Ingredient

Representa ingrediente usado em produtos.

Campos principais:

- id
- name
- baseUnit
- category
- currentStockQuantity
- averageCostCents
- isActive
- createdAt
- updatedAt
- deletedAt
- deletedBy

## PackagingMaterial

Representa embalagem, adesivo ou material descartável.

Campos principais:

- id
- name
- type
- currentStockQuantity
- unitCostCents
- isActive
- createdAt
- updatedAt
- deletedAt

Tipos sugeridos:

- packaging
- sticker
- spoon
- bag
- lid
- box
- other

## Purchase

Representa uma compra.

Campos principais:

- id
- purchaseDate
- supplierName
- items
- totalAmountCents
- notes
- createdBy
- createdAt
- updatedAt

## PurchaseItem

Representa item dentro da compra.

Campos principais:

- itemType
- itemId
- nameSnapshot
- quantity
- unit
- normalizedQuantity
- normalizedUnit
- totalPriceCents
- unitPriceCents

## Product

Representa o produto vendido.

Campos principais:

- id
- name
- description
- category
- imageUrl
- ingredients
- materials
- recipeYield
- lossPercentage
- desiredMarginPercentage
- calculatedCostCents
- suggestedPriceCents
- salePriceCents
- isActive
- createdAt
- updatedAt
- deletedAt

## ProductIngredient

Ingrediente usado em um produto.

Campos principais:

- ingredientId
- nameSnapshot
- quantity
- unit
- normalizedQuantity
- normalizedUnit
- costSnapshotCents

## ProductMaterial

Material usado em um produto.

Campos principais:

- materialId
- nameSnapshot
- quantity
- unitCostSnapshotCents

## DailyMenu

Representa cardápio de uma data.

Campos principais:

- id
- date
- status
- products
- notes
- createdBy
- createdAt
- updatedAt

Status sugeridos:

- draft
- published
- closed

## DailyMenuProduct

Produto dentro do cardápio diário.

Campos principais:

- productId
- nameSnapshot
- enabled
- salePriceCents
- costSnapshotCents

## Sale

Representa venda registrada.

Campos principais:

- id
- saleDate
- items
- grossTotalCents
- discountCents
- netTotalCents
- estimatedCostCents
- estimatedGrossProfitCents
- paymentMethod
- salesChannel
- notes
- createdBy
- createdAt

## SaleItem

Item vendido.

Campos principais:

- productId
- nameSnapshot
- quantity
- unitPriceCents
- costSnapshotCents
- totalPriceCents
- estimatedProfitCents

## AuditLog

Registro de auditoria.

Campos principais:

- id
- action
- entity
- entityId
- before
- after
- userId
- ip
- userAgent
- createdAt
