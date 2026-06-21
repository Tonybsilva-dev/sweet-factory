# Handoff to Codex

## Pré-condições

Nenhuma task de UI pode iniciar sem:

- Task criada no ClickUp em `Freelancers > Sweet Factory > List`.
- Task com descrição completa, checklist, critérios de aceite, specs, pendências, validações e commits esperados.
- Arquivo `.pen` disponível ou revisão explícita dispensando protótipo.
- Revisão do `.pen` registrada em `pencil-review.md`.

## Responsabilidades

## Pencil

- Apoiar criação visual.
- Explorar layout, composição, hierarquia e estados.
- Produzir `.pen` ou referência visual revisável.

## Codex

- Validar `.pen` contra specs e API.
- Implementar somente o que está documentado.
- Manter regra de negócio fora de componentes React.
- Usar shadcn/ui, Tailwind, React Hook Form, Zod e Zustand quando aplicável.
- Rodar validações obrigatórias antes de finalizar.

## Conflitos

Se houver conflito:

1. Specs de produto/API/regra de negócio vencem.
2. `/specs/004-ui` vence para funcionalidade.
3. `/specs/009-design` orienta experiência visual.
4. `.pen` é referência visual, não fonte normativa de regra de negócio.

## Validações finais

Executar dentro de `/application` quando houver implementação:

```bash
pnpm lint
pnpm test
pnpm build
```

Registrar resultados na task do ClickUp.
