# Decisões Next.js

## App Router

Usar App Router como padrão.

Pasta principal:

```txt
src/app
```

## Route Handlers

APIs internas devem ser criadas com Route Handlers.

Exemplo:

```txt
src/app/api/ingredients/route.ts
src/app/api/ingredients/[id]/route.ts
```

## Server Components

Usar Server Components para páginas que apenas carregam dados.

Exemplos:

- Dashboard.
- Listagem inicial de ingredientes.
- Listagem inicial de produtos.

## Client Components

Usar Client Components apenas quando necessário.

Exemplos:

- Formulários.
- Modais.
- Tabelas com interação.
- Filtros client-side.
- Toggles do cardápio.

## Server Actions

Server Actions podem ser usadas em formulários simples, mas o MVP deve priorizar Route Handlers para manter contratos REST claros.

Motivo:

- Facilita testes de integração.
- Facilita documentação.
- Facilita consumo futuro por mobile/app externo.
- Facilita atuação do Codex com contratos claros.

## API interna

Todas as rotas de API devem seguir `/api`.

Exemplos:

- `/api/ingredients`
- `/api/purchases`
- `/api/products`
- `/api/daily-menus`
- `/api/sales`
- `/api/dashboard/monthly-summary`

## Layouts

Usar layouts separados:

```txt
src/app/(auth)
src/app/(dashboard)
```

## Regras

- Não acessar banco em Client Component.
- Não colocar regra de negócio em page/component.
- Route Handler chama use-case/service.
- Use-case chama repository/model.
- Componentes recebem dados já preparados.
