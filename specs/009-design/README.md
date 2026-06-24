# Design specs

Esta pasta documenta a experiência visual do Sweet Factory.

## Responsabilidade de design

Pencil é a ferramenta responsável por criar o design visual das telas.

Codex não deve criar visual de telas do zero quando houver etapa de design pendente.

Codex deve usar o `.pen` aprovado como referência visual principal para implementação. Seu papel é validar tecnicamente o protótipo contra specs, APIs, permissões e restrições da aplicação, registrar divergências e implementar a UI de forma fiel ao handoff aprovado.

Specs e APIs continuam sendo a fonte da verdade funcional.

Em decisões visuais aprovadas, Pencil/`.pen` vence. Codex não deve alterar layout, hierarquia, composição, espaçamento, estilo ou comportamento visual por preferência própria.

Se não houver `.pen` aprovado, uma tela não deve ser implementada, salvo autorização explícita do responsável dispensando o protótipo.

## Relação com `/specs/004-ui`

- `/specs/004-ui` define funcionalidade: páginas, fluxos e componentes esperados.
- `/specs/009-design` define experiência visual: layout, composição, estados, responsividade, protótipos e handoff.

As specs de produto, API e regras de negócio continuam sendo a fonte da verdade funcional.

Se houver conflito entre um arquivo `.pen` e specs/API, registrar a divergência e pedir decisão antes de implementar.

Regra de conflito:

- Specs/API vencem em regra de negócio, contratos, dados, validações e permissões.
- Pencil/`.pen` vence em decisões visuais aprovadas.
- Referências visuais documentadas orientam o Pencil, mas não substituem specs nem `.pen` aprovado.
- Codex não deve alterar visual por preferência própria.

## Fluxo

1. Ler specs funcionais em `/specs/004-ui`.
2. Ler referência visual documentada em `/specs/009-design`.
3. Criar ou atualizar prompt do Pencil.
4. Gerar arquivo `.pen` com Pencil.
5. Revisar visual e tecnicamente o `.pen`.
6. Atualizar handoff para Codex.
7. Criar ou completar task no ClickUp antes de implementar.
8. Implementar no Codex somente depois da aprovação do `.pen` ou dispensa explícita.

## Checklist obrigatório antes de implementar UI

- [ ] Task ClickUp da tela existe.
- [ ] Specs relacionadas foram lidas.
- [ ] Referência visual foi documentada.
- [ ] `.pen` foi gerado.
- [ ] `.pen` foi revisado.
- [ ] Handoff para Codex foi atualizado.
- [ ] Estados loading/error/empty foram definidos.
- [ ] Responsividade foi definida.
- [ ] APIs consumidas foram mapeadas.

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
