# Pencil review

Checklist para revisar arquivos `.pen` antes da implementação.

## Papel da revisão

Pencil é a fonte principal para criação visual das telas.

Codex é responsável por validar o protótipo contra specs, APIs reais, regras de auth e restrições técnicas antes de implementar.

A revisão do `.pen` deve aprovar explicitamente a solução visual antes de qualquer implementação de UI.

Specs e APIs são a fonte da verdade funcional. Pencil/`.pen` vence em decisões visuais aprovadas.

Se houver conflito entre `.pen`, referência visual e specs/API, registrar a divergência e pedir decisão humana antes de implementar.

Codex não deve corrigir ou reinventar layout visual por conta própria durante a implementação.

## Arquivos de protótipo esperados

- `specs/009-design/prototypes/public-routes.pen`: rotas públicas.
- `specs/009-design/prototypes/private-routes.pen`: rotas autenticadas internas.
- `specs/009-design/prototypes/full-mvp.pen`: opcional, visão consolidada do MVP.

Cada arquivo `.pen` deve ser revisado separadamente quando orientar implementação.

## Aprovação obrigatória

Nenhuma implementação de UI pode iniciar enquanto o `.pen` estiver com status `bloqueado`.

Status possíveis:

- `bloqueado`: não implementar.
- `aprovado com ajustes`: implementar somente se os ajustes forem documentados e não bloqueantes.
- `aprovado`: implementação liberada.

Para aprovar um `.pen`, a revisão deve confirmar:

- [ ] O design visual completo foi criado no Pencil.
- [ ] Cada página/estado está em frame próprio.
- [ ] Componentes reutilizáveis estão no frame `Design System` ou equivalente.
- [ ] Frames de página apontam ou correspondem aos componentes do design system.
- [ ] Estados loading/error/empty/success/permission foram definidos.
- [ ] Responsividade foi definida.
- [ ] APIs consumidas foram mapeadas.
- [ ] Divergências contra specs/API foram registradas.
- [ ] Decisões visuais estão aprovadas pelo responsável ou registradas como pendência não bloqueante.

## Revisão — rotas públicas

Data: 2026-06-21

Arquivo esperado:

- `specs/009-design/prototypes/public-routes.pen`

Resultado:

- Bloqueado.

Motivo:

- O arquivo `specs/009-design/prototypes/public-routes.pen` não foi encontrado no repositório.
- Nenhum arquivo `.pen` foi encontrado no workspace durante a revisão.
- Não foi possível inspecionar telas, estados, responsividade, rotas ou aderência visual.

Impacto:

- A task de protótipo público não pode ser considerada revisada.
- Nenhuma task de implementação web pública deve iniciar com base nesse protótipo.
- O arquivo `.pen` precisa ser anexado no ClickUp ou versionado em `specs/009-design/prototypes` antes de nova revisão.

Status por rota:

| Rota | Status |
|---|---|
| `/` | Não verificada |
| `/auth/login` | Não verificada |
| `/auth/recover-password` | Não verificada |
| `/auth/recover-password/verify` | Não verificada |
| `/auth/recover-password/reset` | Não verificada |
| `/terms-and-conditions` | Não verificada |
| `/daily-menu` | Não verificada |
| `/daily-menu/[date]` | Não verificada |
| `/unauthorized` | Não verificada |
| `404` | Não verificada |
| `loading/splash` | Não verificada |

APIs esperadas para próxima revisão:

- `POST /api/auth/login`
- `POST /api/auth/recover-password/request`
- `POST /api/auth/recover-password/verify`
- `POST /api/auth/recover-password/reset`
- `GET /api/daily-menus/by-date/[date]`

Observação:

- Specs e APIs reais vencem em caso de conflito com o `.pen`.
- A próxima revisão deve conferir se o cardápio público depende de autenticação ou se haverá rota pública específica.

## Revisão — rotas autenticadas

Arquivo esperado:

- `specs/009-design/prototypes/private-routes.pen`

Resultado:

- Pendente.

Rotas e áreas esperadas para revisão futura:

- Dashboard.
- Ingredientes.
- Embalagens e adesivos.
- Compras.
- Produtos e precificação.
- Cardápio diário interno.
- Vendas.
- Logs de auditoria.
- Estados de erro, vazio, loading, permissão e confirmação.

Critérios mínimos:

- A navegação interna deve refletir as rotas implementadas ou especificadas.
- Fluxos administrativos devem respeitar roles `admin` e `operator`.
- Nenhuma tela deve criar regra de negócio fora das specs.
- Tabelas, filtros, formulários e ações críticas devem ter estados definidos.

## Revisão — MVP completo

Arquivo esperado opcional:

- `specs/009-design/prototypes/full-mvp.pen`

Uso:

- Revisar consistência global entre rotas públicas e autenticadas.
- Conferir continuidade visual, navegação e estados gerais.
- Não substituir a revisão específica de `public-routes.pen` e `private-routes.pen` quando elas forem usadas como fonte de handoff.

## Fonte da verdade

- [ ] O protótipo segue `/specs/004-ui/pages.md`.
- [ ] O protótipo segue `/specs/004-ui/flows.md`.
- [ ] O protótipo segue `/specs/004-ui/components.md`.
- [ ] O protótipo respeita `/specs/003-api/auth.md`.
- [ ] O protótipo não cria regra de negócio nova.
- [ ] O protótipo respeita contratos em `/specs/003-api/rest-contracts.md`.
- [ ] O protótipo usa `trinketos-visual-reference.md` apenas como referência visual.
- [ ] O protótipo define a fonte visual principal para implementação.

## Rotas e navegação

- [ ] Rotas públicas estão separadas das autenticadas.
- [ ] Estados de unauthorized estão previstos.
- [ ] Fluxo de login está claro.
- [ ] Fluxo de recuperação de acesso está claro.

## Componentes

- [ ] Tabelas têm filtros e estados vazios.
- [ ] Formulários têm labels e erros por campo.
- [ ] Ações destrutivas têm confirmação.
- [ ] Cards de métricas têm hierarquia clara.

## Responsividade

- [ ] Mobile 375px revisado.
- [ ] Tablet 768px revisado.
- [ ] Desktop 1024px revisado.
- [ ] Desktop amplo 1440px revisado.

## Handoff

- [ ] Pendências foram registradas.
- [ ] Decisões visuais foram registradas.
- [ ] Task ClickUp correspondente está completa.
- [ ] Handoff para Codex foi atualizado.
- [ ] O status final da revisão permite implementação.
- [ ] Implementação pode iniciar no Codex.

## Resultado da revisão

Ao concluir uma revisão, registrar:

- Arquivo `.pen` revisado.
- Data da revisão.
- Telas aprovadas.
- Telas faltantes.
- Divergências contra specs/API.
- Ajustes obrigatórios antes da implementação.
- Pendências não bloqueantes.
- Status final: `bloqueado`, `aprovado com ajustes` ou `aprovado`.
