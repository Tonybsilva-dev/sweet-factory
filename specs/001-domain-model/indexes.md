# Índices MongoDB

## users

```js
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ isActive: 1 })
```

## ingredients

```js
db.ingredients.createIndex({ name: 1 })
db.ingredients.createIndex({ category: 1 })
db.ingredients.createIndex({ isActive: 1 })
db.ingredients.createIndex({ deletedAt: 1 })
```

## packaging_materials

```js
db.packaging_materials.createIndex({ name: 1 })
db.packaging_materials.createIndex({ type: 1 })
db.packaging_materials.createIndex({ isActive: 1 })
db.packaging_materials.createIndex({ deletedAt: 1 })
```

## purchases

```js
db.purchases.createIndex({ purchaseDate: -1 })
db.purchases.createIndex({ createdBy: 1 })
db.purchases.createIndex({ "items.itemType": 1 })
db.purchases.createIndex({ "items.itemId": 1 })
```

## products

```js
db.products.createIndex({ name: 1 })
db.products.createIndex({ category: 1 })
db.products.createIndex({ isActive: 1 })
db.products.createIndex({ deletedAt: 1 })
```

## daily_menus

```js
db.daily_menus.createIndex({ date: 1 }, { unique: true })
db.daily_menus.createIndex({ status: 1 })
db.daily_menus.createIndex({ "products.productId": 1 })
```

## sales

```js
db.sales.createIndex({ saleDate: -1 })
db.sales.createIndex({ paymentMethod: 1 })
db.sales.createIndex({ salesChannel: 1 })
db.sales.createIndex({ "items.productId": 1 })
```

## audit_logs

```js
db.audit_logs.createIndex({ createdAt: -1 })
db.audit_logs.createIndex({ entity: 1, entityId: 1 })
db.audit_logs.createIndex({ action: 1 })
db.audit_logs.createIndex({ userId: 1 })
```

## Observações

- Dashboard mensal depende fortemente dos índices em `saleDate` e `purchaseDate`.
- Cardápio diário deve ter índice único por `date` para evitar dois cardápios no mesmo dia.
- Logs podem crescer muito. Avaliar retenção futura ou arquivamento.
