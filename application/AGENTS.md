<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Regras locais de ClickUp

Antes de implementar qualquer alteração dentro de `/application`, confirmar que existe uma task completa no ClickUp em:

- Space: Freelancers
- Folder: Sweet Factory
- List: List

A implementação não pode começar se a task estiver incompleta. A task deve conter:

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

Se algum campo estiver ausente ou genérico demais, atualizar a task no ClickUp antes de alterar código.

Só mover a task para `Done` ou `Closed` depois que `pnpm lint`, `pnpm test`, `pnpm build`, documentação aplicável e commits esperados estiverem concluídos. Se ainda houver validação humana pendente, usar `Review`.
