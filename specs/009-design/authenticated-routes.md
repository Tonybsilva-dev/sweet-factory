# Authenticated routes

Todas as rotas autenticadas devem respeitar:

- JWT retornado por `POST /api/auth/login`.
- Roles `admin` e `operator`.
- Erros padronizados da API.
- Redirecionamento ou bloqueio visual em caso de acesso inválido.

## `/dashboard`

Visão mensal para admin.

## `/ingredients`

CRUD visual de ingredientes.

## `/packaging-materials`

CRUD visual de embalagens, adesivos e materiais.

## `/purchases`

Registro e listagem de compras.

## `/products`

Cadastro de produtos e precificação.

## `/daily-menu/manage` ou `/daily-menu/admin`

Gestão interna do cardápio diário.

## `/sales`

Registro e listagem de vendas.

## `/audit-logs`

Consulta de logs, quando API/tela estiverem disponíveis.

## `/reports`

Relatórios simples, quando API/tela estiverem disponíveis.
