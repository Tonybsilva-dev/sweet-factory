# Coleções MongoDB

## users

Responsável pelos usuários do sistema.

Documento exemplo:

```json
{
  "_id": "ObjectId",
  "name": "Antonio",
  "email": "antonio@email.com",
  "passwordHash": "hash",
  "role": "admin",
  "isActive": true,
  "createdAt": "2026-06-17T12:00:00.000Z",
  "updatedAt": "2026-06-17T12:00:00.000Z"
}
```

## ingredients

Ingredientes cadastrados.

```json
{
  "_id": "ObjectId",
  "name": "Chocolate",
  "baseUnit": "g",
  "category": "Doces",
  "currentStockQuantity": 2500,
  "averageCostCents": 3,
  "isActive": true,
  "createdAt": "2026-06-17T12:00:00.000Z",
  "updatedAt": "2026-06-17T12:00:00.000Z",
  "deletedAt": null
}
```

## packaging_materials

Embalagens, adesivos e descartáveis.

```json
{
  "_id": "ObjectId",
  "name": "Pote 250ml",
  "type": "packaging",
  "currentStockQuantity": 100,
  "unitCostCents": 80,
  "isActive": true,
  "createdAt": "2026-06-17T12:00:00.000Z",
  "updatedAt": "2026-06-17T12:00:00.000Z",
  "deletedAt": null
}
```

## purchases

Compras de ingredientes e materiais.

```json
{
  "_id": "ObjectId",
  "purchaseDate": "2026-06-17T12:00:00.000Z",
  "supplierName": "Atacadão",
  "items": [
    {
      "itemType": "ingredient",
      "itemId": "ObjectId",
      "nameSnapshot": "Chocolate",
      "quantity": 2,
      "unit": "kg",
      "normalizedQuantity": 2000,
      "normalizedUnit": "g",
      "totalPriceCents": 6000,
      "unitPriceCents": 3
    }
  ],
  "totalAmountCents": 6000,
  "notes": null,
  "createdBy": "ObjectId",
  "createdAt": "2026-06-17T12:00:00.000Z"
}
```

## products

Produtos e receitas.

```json
{
  "_id": "ObjectId",
  "name": "Mousse de Morango",
  "description": "Mousse no pote 250ml",
  "category": "Mousses",
  "imageUrl": null,
  "ingredients": [
    {
      "ingredientId": "ObjectId",
      "nameSnapshot": "Leite condensado",
      "quantity": 0.5,
      "unit": "un",
      "normalizedQuantity": 0.5,
      "normalizedUnit": "un",
      "costSnapshotCents": 350
    }
  ],
  "materials": [
    {
      "materialId": "ObjectId",
      "nameSnapshot": "Pote 250ml",
      "quantity": 1,
      "unitCostSnapshotCents": 80
    }
  ],
  "recipeYield": 6,
  "lossPercentage": 5,
  "desiredMarginPercentage": 50,
  "calculatedCostCents": 420,
  "suggestedPriceCents": 840,
  "salePriceCents": 900,
  "isActive": true,
  "createdAt": "2026-06-17T12:00:00.000Z",
  "updatedAt": "2026-06-17T12:00:00.000Z",
  "deletedAt": null,
  "deletedBy": null
}
```

## daily_menus

Cardápios por data.

```json
{
  "_id": "ObjectId",
  "date": "2026-06-17",
  "status": "published",
  "products": [
    {
      "productId": "ObjectId",
      "nameSnapshot": "Mousse de Morango",
      "enabled": true,
      "salePriceCents": 900,
      "costSnapshotCents": 420
    }
  ],
  "notes": "Cardápio de quarta-feira",
  "createdBy": "ObjectId",
  "createdAt": "2026-06-17T12:00:00.000Z",
  "updatedAt": "2026-06-17T12:00:00.000Z"
}
```

## sales

Vendas registradas.

```json
{
  "_id": "ObjectId",
  "saleDate": "2026-06-17T12:00:00.000Z",
  "items": [
    {
      "productId": "ObjectId",
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
  "notes": null,
  "createdBy": "ObjectId",
  "createdAt": "2026-06-17T12:00:00.000Z",
  "updatedAt": "2026-06-17T12:00:00.000Z"
}
```

## audit_logs

Logs de auditoria.

```json
{
  "_id": "ObjectId",
  "action": "product.created",
  "entity": "product",
  "entityId": "ObjectId",
  "before": null,
  "after": {},
  "userId": "ObjectId",
  "ip": "127.0.0.1",
  "userAgent": "browser",
  "createdAt": "2026-06-17T12:00:00.000Z"
}
```
