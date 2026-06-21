# Specs

Esta pasta contém a documentação de Spec Driven Development do projeto.

## Estrutura

- `000-product`: visão do produto, PRD, glossário e regras.
- `001-domain-model`: entidades, coleções MongoDB, índices, dinheiro e unidades.
- `002-use-cases`: casos de uso por módulo.
- `003-api`: contratos REST, erros e autenticação.
- `004-ui`: páginas, fluxos e componentes.
- `005-tests`: testes de aceite, unidade e integração.
- `006-agent-tasks`: backlog e tarefas para agente de desenvolvimento.
- `007-technical-stack`: stack definida, Next.js, shadcn/ui, MongoDB/Mongoose, validação e testes.
- `008-project-structure`: estrutura de pastas para Next.js App Router.
- `009-design`: experiência visual, protótipos Pencil, rotas visuais, estados, responsividade e handoff para Codex.

## Regra principal

Antes de implementar qualquer feature, leia a spec correspondente.

Se a implementação mudar comportamento de negócio, atualize a spec.

## UI e design

- `/specs/004-ui` define funcionalidade: páginas, fluxos e componentes esperados.
- `/specs/009-design` define experiência visual: layout, estados, responsividade, protótipos e handoff.
- Arquivos `.pen` são referência visual de apoio.
- Specs de produto, API e regras de negócio continuam sendo a fonte da verdade.
- Se houver conflito entre `.pen` e specs, specs vencem.
