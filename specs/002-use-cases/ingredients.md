# Caso de uso — Ingredientes

## Objetivo

Permitir cadastrar, listar, editar, buscar, inativar e consultar ingredientes usados na produção.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Nome.
- Unidade base.
- Categoria.
- Estoque inicial opcional.
- Custo médio inicial opcional.

## Fluxo principal

1. Usuário acessa ingredientes.
2. Usuário cria novo ingrediente.
3. Sistema valida nome e unidade.
4. Sistema salva ingrediente ativo.
5. Sistema registra log de auditoria.

## Regras aplicadas

- Unidade base obrigatória.
- Nome obrigatório.
- Não permitir unidade incompatível.
- Dinheiro em centavos.
- Exclusão deve ser lógica.

## Saída esperada

- Ingrediente criado.
- Ingrediente listado.
- Ingrediente atualizado.
- Ingrediente inativado.

## Critérios de aceite

- Deve criar ingrediente válido.
- Deve bloquear nome vazio.
- Deve bloquear unidade inválida.
- Deve listar apenas ativos por padrão.
- Deve permitir visualizar inativos via filtro.

## Estado atual da implementação

Implementado em `/application`:

- Model Mongoose em `src/modules/ingredients/ingredient.model.ts`.
- Schemas Zod em `src/modules/ingredients/ingredient.schemas.ts`.
- Repository em `src/modules/ingredients/ingredient.repository.ts`.
- Service/use-case em `src/modules/ingredients/ingredient.service.ts`.
- Route handlers:
  - `app/api/ingredients/route.ts`
  - `app/api/ingredients/[id]/route.ts`

Comportamento implementado:

- `GET /api/ingredients` lista apenas ingredientes ativos por padrão.
- `GET /api/ingredients?isActive=false` permite listar inativos.
- `POST /api/ingredients` cria ingrediente ativo.
- `PATCH /api/ingredients/:id` atualiza dados básicos.
- `DELETE /api/ingredients/:id` faz exclusão lógica com `isActive: false` e `deletedAt`.
- Valores financeiros de ingrediente usam `averageCostCents` como inteiro.
- Rotas exigem autenticação; mutações exigem role `admin`.
- Route handlers apenas validam entrada, chamam service/use-case e retornam resposta padronizada.

## Logs de auditoria

- `ingredient.created`
- `ingredient.updated`
- `ingredient.deactivated`
- `ingredient.reactivated`

Estado atual:

- `ingredient.created`, `ingredient.updated` e `ingredient.deactivated` foram implementados.
- `ingredient.reactivated` ainda não foi implementado porque não há endpoint de reativação.
- Logs de rotas protegidas recebem `userId` do usuário autenticado.

## Observações para implementação

Criar serviço separado para cálculo de estoque e custo médio. Não colocar regra de cálculo direto no controller.

## Pendências técnicas

- Criar testes de integração com banco para CRUD completo.
- Criar fluxo de reativação somente quando houver spec/endpoint definido.
