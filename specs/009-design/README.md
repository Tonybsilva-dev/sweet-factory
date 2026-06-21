# Design specs

Esta pasta documenta a experiência visual do Sweet Factory.

## Relação com `/specs/004-ui`

- `/specs/004-ui` define funcionalidade: páginas, fluxos e componentes esperados.
- `/specs/009-design` define experiência visual: layout, composição, estados, responsividade, protótipos e handoff.

As specs de produto, API e regras de negócio continuam sendo a fonte da verdade.

Se houver conflito entre um arquivo `.pen` e as specs, as specs vencem.

## Fluxo

1. Ler specs funcionais em `/specs/004-ui`.
2. Planejar experiência visual em `/specs/009-design`.
3. Criar ou revisar protótipos `.pen` com Pencil.
4. Validar o protótipo contra specs, API e regras de negócio.
5. Criar ou completar task no ClickUp antes de implementar.
6. Implementar no Codex somente depois da revisão do `.pen`.

## Arquivos

- `design-brief.md`: objetivo visual e princípios de experiência.
- `design-system.md`: tokens, componentes e padrões visuais.
- `routes-map.md`: mapa geral das rotas.
- `public-routes.md`: rotas públicas.
- `authenticated-routes.md`: rotas autenticadas.
- `states.md`: estados de loading, vazio, erro, sucesso e permissão.
- `responsive.md`: regras de responsividade.
- `pencil-prompts.md`: prompts e instruções para gerar protótipos no Pencil.
- `pencil-review.md`: checklist de revisão do `.pen`.
- `handoff-to-codex.md`: critérios para sair do design e entrar na implementação.
- `prototypes/`: pasta reservada para arquivos `.pen` e exports de protótipo.
