# Estrutura de pastas Next.js

## Estrutura recomendada

```txt
project-root/
├── AGENTS.md
├── README.md
├── components.json
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .env.example
│
├── specs/
│   ├── 000-product/
│   ├── 001-domain-model/
│   ├── 002-use-cases/
│   ├── 003-api/
│   ├── 004-ui/
│   ├── 005-tests/
│   ├── 006-agent-tasks/
│   ├── 007-technical-stack/
│   └── 008-project-structure/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── ingredients/
│   │   │   │   └── page.tsx
│   │   │   ├── purchases/
│   │   │   │   └── page.tsx
│   │   │   ├── packaging-materials/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── daily-menu/
│   │   │   │   └── page.tsx
│   │   │   ├── sales/
│   │   │   │   └── page.tsx
│   │   │   └── audit-logs/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── ingredients/
│   │   │   ├── purchases/
│   │   │   ├── packaging-materials/
│   │   │   ├── products/
│   │   │   ├── daily-menus/
│   │   │   ├── sales/
│   │   │   ├── dashboard/
│   │   │   └── audit-logs/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── domain/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── ingredients/
│   │   ├── purchases/
│   │   ├── packaging-materials/
│   │   ├── products/
│   │   ├── daily-menu/
│   │   ├── sales/
│   │   ├── dashboard/
│   │   └── audit-logs/
│   │
│   ├── shared/
│   │   ├── database/
│   │   ├── errors/
│   │   ├── http/
│   │   ├── logger/
│   │   ├── money/
│   │   ├── units/
│   │   ├── validation/
│   │   └── auth/
│   │
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── setup.ts
│
└── scripts/
    ├── seed.ts
    └── reset-db.ts
```

## Estrutura de módulo

Cada módulo deve seguir:

```txt
src/modules/ingredients/
├── ingredient.model.ts
├── ingredient.schemas.ts
├── ingredient.service.ts
├── ingredient.repository.ts
├── ingredient.types.ts
└── ingredient.audit.ts
```

## Route handlers

Rotas devem ficar em:

```txt
src/app/api/<resource>/route.ts
src/app/api/<resource>/[id]/route.ts
```

O route handler deve apenas:

1. Validar request.
2. Chamar service/use-case.
3. Retornar resposta padronizada.

## Services

Services concentram regras de negócio.

## Repositories

Repositories concentram acesso ao MongoDB.

## Components

Componentes de UI puros ficam em:

```txt
src/components/ui
```

Componentes de domínio podem ficar em:

```txt
src/components/domain
```

ou dentro do próprio módulo quando fizer sentido.
