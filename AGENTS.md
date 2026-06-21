# AGENTS.md

## Projeto

Sweet Factory — Sistema de Precificação, Cardápio e Controle de Custos.

## Estrutura do repositório

A raiz do repositório contém:

* `/specs`: documentação de negócio, regras, casos de uso, API, UI, testes e decisões técnicas.
* `/application`: aplicação Next.js.
* `/AGENTS.md`: instruções gerais para o agente.

Todo código da aplicação deve ser implementado dentro de `/application`.

A pasta `/specs` contém a documentação de negócio e deve ser lida antes de qualquer implementação.

Não criar código Next.js fora de `/application`.

## Stack definida

* Next.js com App Router.
* TypeScript.
* shadcn/ui.
* Tailwind CSS.
* pnpm.
* MongoDB.
* Mongoose para modelagem e validação dos documentos.
* Zod para validação de entrada.
* Route Handlers para endpoints internos da aplicação.
* Server Components para leitura de dados quando aplicável.
* Client Components apenas quando houver interação no navegador.
* Testes unitários e integração.

## Comando inicial do projeto

O projeto Next.js já deve estar dentro de `/application`.

Caso seja necessário recriar ou inicializar novamente a aplicação, usar:

```bash
cd application
pnpm dlx shadcn@latest init --preset b1G2BfOOe --template next
```

Se o CLI pedir confirmação, manter:

* TypeScript.
* App Router.
* Tailwind.
* Alias `@/*`.
* pnpm.

## Regras para o agente

1. Antes de implementar qualquer feature, leia as specs em `/specs`.
2. Antes de alterar código da aplicação, entre em `/application`.
3. Nunca implementar regra de negócio que não esteja documentada.
4. Se alterar comportamento de negócio, atualizar a spec correspondente.
5. Não usar float para dinheiro.
6. Valores financeiros devem ser persistidos em centavos.
7. Vendas devem salvar snapshot de preço e custo.
8. Ações críticas devem gerar log de auditoria.
9. Não iniciar dashboard antes de compras, produtos e vendas estarem funcionando.
10. Evitar Client Components sem necessidade.
11. Route Handlers devem retornar respostas padronizadas.
12. Toda entrada externa deve ser validada com Zod.
13. Models MongoDB devem ficar isolados da camada de UI.
14. Não acessar MongoDB diretamente em componentes client-side.
15. Implementar testes junto com a feature.
16. Não criar código, componentes, rotas ou arquivos Next.js fora de `/application`.
17. Não mover `/specs` para dentro de `/application`.

## Regras de ClickUp e versionamento

Toda implementação deve estar associada a uma task previamente criada no ClickUp.

O agente não pode iniciar implementação de código sem antes confirmar:

* Space: Freelancers
* Folder: Sweet Factory
* List: List
* Nome da task
* ID da task no ClickUp
* Status atual da task
* Specs relacionadas

Se não existir task no ClickUp, o agente deve parar e solicitar a criação da task antes de implementar qualquer código.

## Fluxo obrigatório por task

Para cada task de implementação, seguir obrigatoriamente:

1. Localizar a task correspondente no ClickUp.
2. Confirmar que a task existe.
3. Confirmar que a task possui descrição, checklist e critérios de aceite.
4. Atualizar o status da task para `In Progress`.
5. Ler as specs relacionadas.
6. Implementar apenas o escopo da task.
7. Rodar validações obrigatórias.
8. Atualizar specs se houver mudança documentável.
9. Atualizar a task no ClickUp com resumo da entrega.
10. Criar commits separados.
11. Atualizar o status da task para `Review` ou `Done/Closed`, conforme validação.

## Regra de commits

Após cada implementação, o agente deve criar commits separados por tipo de alteração.

Não misturar implementação, testes e documentação no mesmo commit quando houver mudanças suficientes para separação.

Ordem recomendada:

1. Commit de implementação.
2. Commit de testes.
3. Commit de documentação/specs.
4. Commit de ajustes de configuração, se aplicável.

## Padrão de mensagem de commit

Usar Conventional Commits.

Exemplos:

```bash
git add application/src/modules/sales application/app/api/sales
git commit -m "feat(sales): implement sales module"

git add application/src/modules/sales/*.test.ts
git commit -m "test(sales): add sales calculation tests"

git add specs
git commit -m "docs(sales): update sales specs and api contracts"

git add application/package.json application/vitest.config.ts
git commit -m "chore(test): configure vitest"
```

## Associação entre commit e ClickUp

Sempre que possível, incluir o ID da task do ClickUp no corpo do commit.

Exemplo:

```bash
git commit -m "feat(sales): implement sales module" -m "ClickUp Task: 86aj3g91h"
```

## Restrições de versionamento

O agente não deve:

* Fazer commit sem validação.
* Fazer commit de arquivos não relacionados à task.
* Misturar alterações de múltiplas tasks no mesmo commit.
* Fazer commit de `.env`.
* Fazer commit de `node_modules`.
* Fazer commit de arquivos temporários.
* Fazer push sem solicitação explícita.

## Validações antes de commit

Antes de qualquer commit de implementação, executar dentro de `/application`:

```bash
pnpm lint
pnpm test
pnpm build
```

Se algum comando falhar, o agente deve:

1. Não criar commit final.
2. Corrigir o problema se estiver dentro do escopo.
3. Informar a falha se exigir decisão humana.
4. Manter a task no ClickUp como `In Progress` ou `Review`, nunca como `Done/Closed`.

## Atualização obrigatória no ClickUp

Após finalizar a implementação, o agente deve atualizar a task no ClickUp com:

* Resumo do que foi implementado.
* Arquivos principais criados/alterados.
* Rotas criadas ou alteradas.
* Regras de negócio implementadas.
* Specs atualizadas.
* Validações executadas.
* Resultado de `pnpm lint`.
* Resultado de `pnpm test`.
* Resultado de `pnpm build`.
* Pendências restantes.
* Commits criados.

## Status no ClickUp

Usar:

* `To Do`: task ainda não iniciada.
* `In Progress`: implementação em andamento.
* `Review`: implementação concluída, aguardando validação manual.
* `Done` ou `Closed`: implementação validada, testes passando e documentação atualizada.

Se a lista do ClickUp usar `Closed` em vez de `Done`, considerar `Closed` como equivalente a `Done`.


## Ordem de leitura recomendada

Antes de qualquer implementação, ler:

1. `/AGENTS.md`
2. `/specs/000-product/prd.md`
3. `/specs/000-product/business-rules.md`
4. `/specs/007-technical-stack/stack.md`
5. `/specs/008-project-structure/nextjs-folder-structure.md`
6. O caso de uso específico em `/specs/002-use-cases`

Quando estiver implementando dentro da aplicação, também consultar:

* `/application/package.json`
* `/application/tsconfig.json`
* `/application/components.json`

## Comandos de validação

Todos os comandos abaixo devem ser executados dentro de `/application`:

```bash
cd application
pnpm lint
pnpm test
pnpm build
```

Para rodar o projeto localmente:

```bash
cd application
pnpm dev
```

## Padrão de implementação

Para cada módulo:

* Criar schema/model.
* Criar validators com Zod.
* Criar services/use-cases.
* Criar repository quando houver acesso ao MongoDB.
* Criar route handlers.
* Criar componentes de UI.
* Criar testes.
* Criar logs de auditoria quando aplicável.

## Estrutura esperada da aplicação

A aplicação deve seguir esta base dentro de `/application`:

```txt
application/
├── app/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── hooks/
├── lib/
├── public/
├── package.json
├── components.json
├── next.config.ts
└── tsconfig.json
```

À medida que os módulos forem implementados, criar também:

```txt
application/
└── src/
    ├── modules/
    │   ├── auth/
    │   ├── ingredients/
    │   ├── purchases/
    │   ├── packaging-materials/
    │   ├── products/
    │   ├── daily-menu/
    │   ├── sales/
    │   ├── dashboard/
    │   └── audit-logs/
    ├── shared/
    │   ├── database/
    │   ├── errors/
    │   ├── http/
    │   ├── logger/
    │   ├── money/
    │   ├── units/
    │   ├── validation/
    │   └── auth/
    └── tests/
        ├── unit/
        ├── integration/
        └── setup.ts
```

Se o projeto estiver usando `app/`, `components/`, `hooks/` e `lib/` diretamente na raiz de `/application`, manter compatibilidade com a estrutura gerada pelo shadcn/ui.

Não mover arquivos gerados automaticamente sem necessidade.

## Padrão de API

APIs internas devem usar Route Handlers do Next.js.

Exemplo:

```txt
application/app/api/ingredients/route.ts
application/app/api/ingredients/[id]/route.ts
```

Cada Route Handler deve:

1. Validar entrada com Zod.
2. Chamar service/use-case.
3. Retornar resposta padronizada.
4. Registrar log de auditoria quando aplicável.
5. Não conter regra de negócio complexa.

## Restrições

* Não colocar regra de negócio em componente React.
* Não misturar cálculo financeiro em controller/route handler.
* Não usar valores monetários em float.
* Não retornar stack trace para o frontend.
* Não remover snapshots antigos.
* Não acessar MongoDB em Client Components.
* Não criar dashboard antes dos módulos de compras, produtos e vendas.
* Não implementar baixa automática de estoque sem spec aprovada.
* Não criar integrações externas fora do escopo do MVP.

## Checklist antes de finalizar uma tarefa

Antes de considerar uma tarefa concluída:

* [ ] Specs relacionadas foram lidas.
* [ ] Código foi criado dentro de `/application`.
* [ ] Validações foram implementadas com Zod.
* [ ] Valores financeiros usam centavos.
* [ ] Testes foram criados ou atualizados.
* [ ] Logs de auditoria foram criados quando aplicável.
* [ ] `pnpm lint` foi executado.
* [ ] `pnpm test` foi executado, se já configurado.
* [ ] `pnpm build` foi executado quando houver alteração estrutural.
* [ ] Nenhuma regra de negócio foi implementada sem documentação.


## Regras locais de implementação, commits e ClickUp

Este diretório contém a aplicação Next.js.

Todo código alterado neste diretório deve estar vinculado a uma task existente no ClickUp.

Antes de implementar qualquer alteração em `/application`, o agente deve confirmar a task do ClickUp associada.

Dados obrigatórios da task:

* Nome da task.
* ID da task.
* Status.
* Specs relacionadas.
* Critérios de aceite.

Se não houver task associada, não implementar.

## Commits dentro de `/application`

Alterações de código da aplicação devem ser commitadas separadamente das specs.

Exemplos:

```bash
git add application/src/modules/products application/app/api/products
git commit -m "feat(products): implement product pricing module" -m "ClickUp Task: <task-id>"

git add application/src/modules/products/*.test.ts
git commit -m "test(products): add product pricing tests" -m "ClickUp Task: <task-id>"
```

## Validação local obrigatória

Antes de concluir uma task que altere `/application`, executar:

```bash
pnpm lint
pnpm test
pnpm build
```

A task só pode ir para `Done` ou `Closed` se as validações passarem.

