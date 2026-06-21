# Template de tarefa para o Codex

## Nome da task

Usar um nome claro e acionável.

Exemplo:

```txt
Implementar módulo de vendas
```

## Local no ClickUp

- Space: Freelancers
- Folder: Sweet Factory
- List: List

## Status

Informar o status atual:

- `To Do`
- `In Progress`
- `Review`
- `Done` ou `Closed`

## Prioridade

Informar uma prioridade:

- `Urgent`
- `High`
- `Normal`
- `Low`

## Tags

Listar tags úteis para busca e agrupamento.

Exemplo:

- `sales`
- `api`
- `audit`

## Descrição completa

Descrever a alteração a ser feita, o contexto do problema, o comportamento esperado e o limite de escopo.

A descrição não deve ser apenas uma frase curta. Ela deve permitir que o agente entenda a entrega sem inferir regra de negócio não documentada.

## Contexto

Arquivos de spec que devem ser lidos antes:

- `/AGENTS.md`
- `/application/AGENTS.md`, se existir
- `/specs/000-product/prd.md`
- `/specs/000-product/business-rules.md`
- `/specs/001-domain-model/entities.md`
- `/specs/001-domain-model/mongodb-collections.md`
- `/specs/003-api/rest-contracts.md`
- `/specs/003-api/auth.md`, quando houver rota protegida
- `/specs/003-api/error-patterns.md`
- `/specs/005-tests/unit-tests.md`
- `/specs/002-use-cases/<arquivo>.md`

## Objetivo

Explicar o resultado esperado de forma verificável.

Exemplo:

```txt
Criar endpoints de venda que salvam snapshots de preço e custo, calculam total bruto, desconto, total líquido e lucro estimado.
```

## Regras obrigatórias

- Não usar float para persistir dinheiro.
- Salvar dinheiro em centavos.
- Validar entrada no backend com Zod.
- Criar ou atualizar testes.
- Criar log de auditoria quando a ação for crítica.
- Não alterar regra de negócio sem atualizar spec.
- Não criar código fora de `/application`.
- Não implementar funcionalidade fora do escopo descrito.

## Arquivos esperados

Listar arquivos que provavelmente serão criados ou alterados.

Exemplo:

- `/application/src/modules/<module>/<module>.model.ts`
- `/application/src/modules/<module>/<module>.schemas.ts`
- `/application/src/modules/<module>/<module>.repository.ts`
- `/application/src/modules/<module>/<module>.service.ts`
- `/application/app/api/<route>/route.ts`
- `/specs/002-use-cases/<arquivo>.md`
- `/specs/003-api/rest-contracts.md`

## Checklist

Preencher checklist objetivo e verificável.

Exemplo:

- [ ] Criar model
- [ ] Criar schemas Zod
- [ ] Criar repository
- [ ] Criar service/use-case
- [ ] Criar route handlers
- [ ] Proteger rotas com auth
- [ ] Aplicar roles
- [ ] Criar audit logs
- [ ] Criar testes unitários
- [ ] Criar testes de integração, se aplicável
- [ ] Atualizar specs
- [ ] Rodar lint
- [ ] Rodar test
- [ ] Rodar build
- [ ] Criar commits esperados
- [ ] Atualizar task no ClickUp

## Critérios de aceite

Descrever critérios objetivos para considerar a task entregue.

Exemplo:

- [ ] Endpoint funcionando.
- [ ] Entrada inválida retorna erro padronizado.
- [ ] Regras de negócio documentadas foram implementadas.
- [ ] Valores financeiros persistidos em centavos.
- [ ] Logs criados quando aplicável.
- [ ] Testes relevantes passando.
- [ ] Documentação atualizada quando necessário.

## Specs relacionadas

Listar specs diretamente relacionadas.

Exemplo:

- `/specs/002-use-cases/sales.md`
- `/specs/001-domain-model/entities.md`
- `/specs/001-domain-model/mongodb-collections.md`
- `/specs/003-api/rest-contracts.md`
- `/specs/003-api/auth.md`

## Pendências conhecidas

Registrar pendências que já são conhecidas antes da implementação.

Exemplo:

- Sem UI nesta task.
- Sem testes de integração com Mongo real.
- Sem baixa automática de estoque.

## Validações obrigatórias

Executar dentro de `/application`:

```bash
pnpm lint
pnpm test
pnpm build
```

Registrar o resultado real de cada comando na task do ClickUp antes de mover para `Review`, `Done` ou `Closed`.

## Commits esperados

Descrever se a task exige commit e como separar os commits.

Exemplo:

- `feat(<module>): implement <feature>`
- `test(<module>): add <feature> tests`
- `docs(<module>): update specs`

Sempre que possível, incluir o ID da task no corpo do commit:

```bash
git commit -m "feat(sales): implement sales module" -m "ClickUp Task: 86aj3g91h"
```

## Regra obrigatória antes de implementar

Nenhuma task pode ser iniciada se não tiver todos os campos essenciais preenchidos:

- Nome da task.
- Descrição completa.
- Status.
- Prioridade.
- Tags.
- Checklist.
- Critérios de aceite.
- Specs relacionadas.
- Pendências conhecidas.
- Validações obrigatórias.
- Commits esperados.

Se a task estiver incompleta, o agente deve atualizar a task no ClickUp antes de implementar qualquer código.

## Regra para finalizar task

A task só pode ser movida para `Done` ou `Closed` depois que:

- `pnpm lint` passou.
- `pnpm test` passou.
- `pnpm build` passou.
- Specs/documentação foram atualizadas quando aplicável.
- Commits esperados foram criados, quando solicitados.
- Task do ClickUp foi atualizada com resumo da entrega.
- Pendências restantes foram registradas.
- Não há pendência bloqueante.

Se a implementação estiver pronta mas depender de validação humana, mover para `Review`.

## Observações

Registrar decisões técnicas tomadas durante a implementação.
