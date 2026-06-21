# Stack técnica

## Decisão

O MVP será construído com:

- Next.js.
- App Router.
- TypeScript.
- shadcn/ui.
- Tailwind CSS.
- pnpm.
- MongoDB.
- Mongoose.
- Zod.
- React Hook Form.
- Vitest ou Jest para testes unitários.
- Playwright opcional para e2e futuro.

## Justificativa

Next.js é suficiente para o MVP porque permite construir frontend e backend no mesmo projeto.

O App Router permite organizar páginas, layouts e endpoints internos usando a pasta `app`.

shadcn/ui acelera a criação da interface sem prender o projeto a uma biblioteca fechada de componentes.

MongoDB atende bem ao domínio porque produtos, receitas, compras e vendas possuem documentos com estruturas compostas.

Mongoose foi escolhido para facilitar schemas, validações e middlewares.

Zod será usado para validar payloads de entrada antes de executar regras de negócio.

## Comando inicial

```bash
pnpm dlx shadcn@latest init --preset b1G2BfOOe --template next
```

## Dependências sugeridas

```bash
pnpm add mongoose zod react-hook-form @hookform/resolvers bcryptjs jsonwebtoken date-fns
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Observações

O projeto deve evitar complexidade desnecessária no MVP.

Não usar:

- Monorepo no início.
- Microserviços.
- GraphQL.
- Redux.
- Fila.
- Event sourcing.
- CQRS pesado.

Essas tecnologias só devem entrar se houver necessidade real.
