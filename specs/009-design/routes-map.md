# Routes map

## Públicas

- `/`
- `/auth/login`
- `/auth/recover-password`
- `/auth/recover-password/verify`
- `/auth/recover-password/reset`
- `/terms-and-conditions`
- `/daily-menu`
- `/daily-menu/[date]`, se confirmado

## Autenticadas

- `/dashboard`
- `/ingredients`
- `/packaging-materials`
- `/purchases`
- `/products`
- `/daily-menu/manage` ou `/daily-menu/admin`
- `/sales`
- `/audit-logs`, quando a API/tela estiverem disponíveis
- `/reports`, quando a API/tela estiverem disponíveis

## Especiais

- `/unauthorized`
- `not-found.tsx`
- `loading.tsx`

## Fonte da verdade

- Rotas de API: `/specs/003-api/rest-contracts.md`.
- Permissões: `/specs/003-api/auth.md`.
- Funcionalidades: `/specs/004-ui/pages.md` e `/specs/004-ui/flows.md`.
