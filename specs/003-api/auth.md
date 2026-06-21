# Autenticação e autorização

## MVP

Autenticação simples com email e senha.

## Estratégia

- Login com JWT.
- Senha com hash seguro.
- Helper reutilizável para proteger Route Handlers.
- Role simples: `admin` e `operator`.

## Permissões

| Ação | Admin | Operator |
|---|---:|---:|
| Cadastrar ingrediente | Sim | Não |
| Registrar compra | Sim | Não |
| Cadastrar produto | Sim | Não |
| Criar cardápio | Sim | Sim |
| Registrar venda | Sim | Sim |
| Ver dashboard | Sim | Não |
| Ver logs | Sim | Não |

## Rotas públicas

- `POST /api/auth/login`
- `POST /api/auth/recover-password/request`
- `POST /api/auth/recover-password/verify`
- `POST /api/auth/recover-password/reset`

### POST /api/auth/login

Request:

```json
{
  "email": "admin@sweetfactory.local",
  "password": "admin123"
}
```

Response:

```json
{
  "data": {
    "accessToken": "jwt",
    "user": {
      "id": "string",
      "name": "Admin",
      "email": "admin@sweetfactory.local",
      "role": "admin"
    }
  }
}
```

### POST /api/auth/recover-password/request

Solicita recuperação de acesso.

Request:

```json
{
  "email": "admin@sweetfactory.local"
}
```

Response:

```json
{
  "data": {
    "message": "Se o email existir, enviaremos instruções para recuperação."
  }
}
```

Comportamento:

- Não revela se o email existe.
- Gera token de recuperação apenas para usuário ativo encontrado.
- Token expira em 30 minutos.
- Tokens anteriores em aberto do usuário são invalidados.
- Em ambiente diferente de produção, a resposta pode incluir `recoveryToken` para permitir testes locais sem provider de email.
- Em produção, `recoveryToken` não deve ser retornado.
- Provider de email real ainda não foi implementado.

### POST /api/auth/recover-password/verify

Valida token de recuperação.

Request:

```json
{
  "token": "string"
}
```

Response:

```json
{
  "data": {
    "valid": true
  }
}
```

### POST /api/auth/recover-password/reset

Redefine senha usando token válido.

Request:

```json
{
  "token": "string",
  "password": "novaSenha123",
  "confirmPassword": "novaSenha123"
}
```

Response:

```json
{
  "data": {
    "message": "Senha redefinida com sucesso."
  }
}
```

Comportamento:

- Token inválido retorna erro padronizado.
- Token expirado retorna erro padronizado.
- Token usado não pode ser reutilizado.
- Senha e confirmação divergentes retornam `VALIDATION_ERROR`.
- Nova senha é persistida somente como hash.
- Senha e hash nunca são retornados.
- Após redefinir senha, tokens em aberto do usuário são invalidados.
- Gera log `auth.password_reset` quando aplicável.

## Rotas protegidas

As rotas de ingredientes, embalagens/materiais, compras, produtos, cardápio diário e vendas exigem autenticação.

Estado atual das permissões:

- `GET /api/ingredients`: usuário autenticado.
- `POST /api/ingredients`: `admin`.
- `PATCH /api/ingredients/:id`: `admin`.
- `DELETE /api/ingredients/:id`: `admin`.
- `GET /api/packaging-materials`: usuário autenticado.
- `POST /api/packaging-materials`: `admin`.
- `PATCH /api/packaging-materials/:id`: `admin`.
- `DELETE /api/packaging-materials/:id`: `admin`.
- `GET /api/purchases`: usuário autenticado.
- `POST /api/purchases`: `admin`.
- `GET /api/products`: usuário autenticado.
- `GET /api/products/:id`: usuário autenticado.
- `POST /api/products`: `admin`.
- `PATCH /api/products/:id`: `admin`.
- `DELETE /api/products/:id`: `admin`.
- `POST /api/products/:id/recalculate-price`: `admin`.
- `GET /api/sales`: `admin` e `operator`.
- `POST /api/sales`: `admin` e `operator`.

## Payload JWT

```json
{
  "sub": "userId",
  "email": "admin@sweetfactory.local",
  "role": "admin"
}
```

## Regras

- Token deve expirar.
- Senha nunca deve ser retornada.
- Logs devem registrar usuário responsável.
- `JWT_SECRET` deve existir no ambiente para assinar e validar tokens.

## Estado atual da implementação

Implementado em `/application`:

- Model de usuário em `src/modules/auth/user.model.ts`.
- Model de token de recuperação em `src/modules/auth/password-recovery-token.model.ts`.
- Schemas Zod em `src/modules/auth/auth.schemas.ts`.
- Service de login em `src/modules/auth/auth.service.ts`.
- Service de recuperação de acesso em `src/modules/auth/password-recovery.service.ts`.
- Hash e comparação de senha em `src/modules/auth/password.ts`.
- Geração/hash de token de recuperação em `src/modules/auth/password-recovery-token.ts`.
- Assinatura e validação de JWT em `src/modules/auth/jwt.ts`.
- Usuário atual e proteção de rotas em `src/modules/auth/current-user.ts`.
- Tipos em `src/modules/auth/auth.types.ts`.
- Route Handler em `app/api/auth/login/route.ts`.
- Route Handlers em `app/api/auth/recover-password/*/route.ts`.
- Seed local em `scripts/seed-admin.ts`.

Comportamento atual:

- Login valida `email` e `password` com Zod.
- Login busca apenas usuário ativo.
- Senha é comparada via hash bcrypt.
- Resposta de login retorna `accessToken` e usuário serializado sem `passwordHash`.
- Token JWT expira em `8h`.
- `requireAuth(request, allowedRoles?)` protege Route Handlers.
- Token ausente, inválido ou usuário inativo retorna `UNAUTHORIZED`.
- Role insuficiente retorna `FORBIDDEN`.
- Rotas protegidas passam `userId` para os serviços que geram audit log.
- Recuperação de acesso não revela existência de email.
- Token de recuperação expira em 30 minutos e é de uso único.
- Reset de senha salva somente `passwordHash`.

## Seed local

Para ambiente local/dev:

```bash
cd application
pnpm seed:admin
```

Usuário padrão criado pelo seed:

```json
{
  "name": "Admin",
  "email": "admin@sweetfactory.local",
  "password": "admin123",
  "role": "admin"
}
```

O seed não deve criar usuário em produção.

## Limitações atuais

- Refresh token ainda não foi implementado.
- Tela de login ainda não foi implementada.
- Tela de recuperação de senha ainda não foi implementada.
- Provider real de email para recuperação ainda não foi definido.
- Cadastro público de usuário ainda não foi implementado.
- Gestão administrativa de usuários ainda não foi implementada.
- Captura de `ip` e `userAgent` para audit logs ainda não foi conectada.
