# Comandos iniciais

## Criar projeto com shadcn/ui preset

```bash
pnpm dlx shadcn@latest init --preset b1G2BfOOe --template next
```

## Instalar dependências de domínio

```bash
pnpm add mongoose zod react-hook-form @hookform/resolvers bcryptjs jsonwebtoken date-fns
```

## Instalar dependências de teste

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Adicionar componentes shadcn/ui iniciais

```bash
pnpm dlx shadcn@latest add button input label textarea select dialog dropdown-menu table badge card separator form sonner calendar popover command
```

## Rodar projeto

```bash
pnpm dev
```

## Validar projeto

```bash
pnpm lint
pnpm test
pnpm build
```
