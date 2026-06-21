# Caso de uso — Embalagens e adesivos

## Objetivo

Permitir cadastrar materiais que entram no custo final dos produtos.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Nome.
- Tipo.
- Estoque atual opcional.
- Custo unitário opcional.

## Fluxo principal

1. Usuário cadastra material.
2. Sistema valida tipo.
3. Sistema salva material ativo.
4. Usuário registra compras de materiais.
5. Sistema atualiza custo unitário e estoque.

## Regras aplicadas

- Tipo obrigatório.
- Custo unitário salvo em centavos.
- Embalagens são controladas por unidade.
- Exclusão lógica.

## Saída esperada

- Material criado.
- Material atualizado.
- Material inativado.
- Custo disponível para produto.

## Critérios de aceite

- Deve cadastrar pote, tampa, adesivo e colher.
- Deve permitir usar material no cadastro de produto.
- Deve impedir material inativo em novo produto.

## Estado atual da implementação

Implementado em `/application`:

- Model Mongoose em `src/modules/packaging-materials/packaging-material.model.ts`.
- Schemas Zod em `src/modules/packaging-materials/packaging-material.schemas.ts`.
- Repository em `src/modules/packaging-materials/packaging-material.repository.ts`.
- Service/use-case em `src/modules/packaging-materials/packaging-material.service.ts`.
- Route handlers:
  - `app/api/packaging-materials/route.ts`
  - `app/api/packaging-materials/[id]/route.ts`

Comportamento implementado:

- `GET /api/packaging-materials` lista apenas materiais ativos por padrão.
- `GET /api/packaging-materials?isActive=false` permite listar inativos.
- `POST /api/packaging-materials` cria material ativo.
- `PATCH /api/packaging-materials/:id` atualiza dados básicos.
- `DELETE /api/packaging-materials/:id` faz exclusão lógica com `isActive: false` e `deletedAt`.
- Valores financeiros de material usam `unitCostCents` como inteiro.
- Rotas exigem autenticação; mutações exigem role `admin`.
- Route handlers apenas validam entrada, chamam service/use-case e retornam resposta padronizada.

## Logs de auditoria

- `packaging.created`
- `packaging.updated`
- `packaging.deactivated`

Estado atual:

- `packaging.created`, `packaging.updated` e `packaging.deactivated` foram implementados.
- Logs de rotas protegidas recebem `userId` do usuário autenticado.

## Observações para implementação

Usar uma entidade genérica `PackagingMaterial`, não criar coleção separada para adesivos.

## Pendências técnicas

- Criar testes de integração com banco para CRUD completo.
- A validação de uso em produto será implementada no módulo de produtos.
