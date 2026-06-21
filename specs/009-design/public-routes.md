# Public routes

## `/`

Landing pública simples com:

- Apresentação do produto.
- CTA para login.
- Resumo das funcionalidades.
- Link para termos.
- Link para cardápio público, se confirmado.

## `/auth/login`

Tela de login com:

- Email.
- Senha.
- Erro amigável.
- Loading.
- Redirecionamento para dashboard.

## Recuperação de acesso

Rotas:

- `/auth/recover-password`
- `/auth/recover-password/verify`
- `/auth/recover-password/reset`

API relacionada:

- `POST /api/auth/recover-password/request`
- `POST /api/auth/recover-password/verify`
- `POST /api/auth/recover-password/reset`

## `/terms-and-conditions`

Página pública estática. Conteúdo final depende de revisão humana.

## Cardápio público

Rotas previstas:

- `/daily-menu`
- `/daily-menu/[date]`, se confirmado

Pendência:

- Confirmar regra de acesso público para cardápio diário.
