# Handoff to Codex

## Pré-condições

Nenhuma task de UI pode iniciar sem:

- Task criada no ClickUp em `Freelancers > Sweet Factory > List`.
- Task com descrição completa, checklist, critérios de aceite, specs, pendências, validações e commits esperados.
- Arquivo `.pen` disponível ou revisão explícita dispensando protótipo.
- Revisão do `.pen` registrada em `pencil-review.md`.

## Arquivos de protótipo

Os protótipos Pencil devem ficar em `specs/009-design/prototypes`.

Arquivos previstos:

- `public-routes.pen`: rotas públicas, autenticação pública, recuperação de acesso, páginas legais, cardápio público e estados públicos.
- `private-routes.pen`: rotas autenticadas internas, navegação operacional, CRUDs, dashboard e estados administrativos.
- `full-mvp.pen`: opcional, usado apenas se fizer sentido consolidar a visão completa do MVP em um único arquivo.

O arquivo `.pen` é referência visual. Ele não substitui specs, contratos de API, regras de autorização ou regras de negócio.

## Status de handoff — rotas públicas

Data: 2026-06-21

Status:

- Bloqueado.

Motivo:

- O arquivo `specs/009-design/prototypes/public-routes.pen` não foi encontrado no repositório.
- Nenhum arquivo `.pen` foi encontrado no workspace.
- A revisão visual das rotas públicas não foi concluída.

Condição para desbloquear:

- Anexar ou versionar `public-routes.pen`.
- Reexecutar revisão em `pencil-review.md`.
- Confirmar aderência às rotas públicas, estados, APIs reais e regras de auth.

Enquanto bloqueado, Codex não deve iniciar implementação das rotas públicas com base no `.pen`.

## Status de handoff — rotas autenticadas

Status:

- Pendente.

Arquivo esperado:

- `specs/009-design/prototypes/private-routes.pen`

Condição para desbloquear:

- Gerar ou anexar `private-routes.pen`.
- Revisar telas autenticadas contra `/specs/004-ui`, `/specs/003-api`, regras de auth e specs dos módulos.
- Registrar pendências em `pencil-review.md`.

## Status de handoff — MVP completo

Status:

- Opcional.

Arquivo esperado, se existir:

- `specs/009-design/prototypes/full-mvp.pen`

Uso:

- Consolidar rotas públicas e autenticadas apenas se isso ajudar a revisão do fluxo completo.
- Não substituir `public-routes.pen` nem `private-routes.pen` quando esses arquivos forem mais claros para revisão segmentada.

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
- Interromper implementação de UI se o `.pen` criar fluxo, rota, permissão ou contrato sem correspondência nas specs.
- Registrar divergências antes de implementar.

## Conflitos

Se houver conflito:

1. Specs de produto/API/regra de negócio vencem.
2. `/specs/004-ui` vence para funcionalidade.
3. `/specs/009-design` orienta experiência visual.
4. `trinketos-visual-reference.md` é apoio visual e não fonte normativa.
5. `.pen` é referência visual, não fonte normativa de regra de negócio.

## Critério para iniciar implementação de UI

Antes de implementar UI, Codex deve confirmar:

- Task do ClickUp completa.
- Specs funcionais e APIs lidas.
- `.pen` revisado ou dispensa explícita registrada.
- Divergências do `.pen` resolvidas ou registradas como pendência não bloqueante.
- Estados de loading, erro, vazio, sucesso e permissão revisados.
- Responsividade mínima revisada ou explicitamente pendente.

## Validações finais

Executar dentro de `/application` quando houver implementação:

```bash
pnpm lint
pnpm test
pnpm build
```

Registrar resultados na task do ClickUp.
