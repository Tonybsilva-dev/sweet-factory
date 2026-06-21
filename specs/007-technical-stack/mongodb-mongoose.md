# MongoDB e Mongoose

## Decisão

Usar MongoDB com Mongoose no MVP.

## Motivos

- Schemas claros.
- Validação estrutural.
- Middlewares úteis.
- Boa produtividade para MVP.
- Facilita padronização de timestamps e soft delete.

## Conexão

Criar helper único:

```txt
src/shared/database/mongodb.ts
```

Responsabilidades:

- Ler `MONGODB_URI`.
- Reutilizar conexão em ambiente serverless/dev.
- Evitar múltiplas conexões em hot reload.
- Lançar erro claro se variável não existir.

## Models

Models devem ficar dentro de cada módulo.

Exemplo:

```txt
src/modules/ingredients/ingredient.model.ts
src/modules/products/product.model.ts
```

## Regras

- Não importar model diretamente em componente React.
- Não acessar banco em Client Component.
- Não espalhar conexão MongoDB pelo projeto.
- Não salvar dinheiro como float.
- Usar timestamps.
- Usar soft delete em entidades principais.

## ObjectId

IDs devem ser tratados como string na borda da API e convertidos/validados na camada de serviço.

## Transações

No MVP, evitar depender de transações se o ambiente MongoDB não estiver em replica set.

Para operações críticas como compras:

1. Validar payload.
2. Criar compra.
3. Atualizar estoque/custo.
4. Criar logs.

Se transação estiver disponível, usar sessão para manter consistência.
