# Pencil prompts

Este arquivo reúne os prompts oficiais para criação de protótipos `.pen` no Pencil.

## Regras

- Pencil é apoio visual.
- Codex valida e implementa.
- Specs e API são fonte da verdade.
- Se houver conflito entre `.pen` e specs, specs vencem.
- Não inventar regra de negócio no protótipo.
- Não criar fluxo visual sem API/spec correspondente, salvo quando marcado como pendência.
- O design deve ser compatível com shadcn/ui, Tailwind CSS, React Hook Form + Zod e os componentes previstos em `/specs/004-ui/components.md`.
- O idioma da interface deve ser português.

## Prompt 1 — Base visual das rotas públicas

```txt
Criar um protótipo .pen das rotas públicas do Sweet Factory.

Produto:
Sweet Factory é um SaaS operacional para precificação, cardápio e controle de custos de pequenos negócios de alimentação.

Objetivo:
Desenhar a experiência pública antes da implementação web, priorizando clareza, confiança e conversão para login, sem criar funcionalidades fora das specs.

Rotas obrigatórias:
- /
- /auth/login
- /auth/recover-password
- /auth/recover-password/verify
- /auth/recover-password/reset
- /terms-and-conditions
- /daily-menu
- /daily-menu/[date]
- /unauthorized
- 404
- loading/splash

Regras:
- Nomear cada tela com sua rota.
- Incluir estado normal de cada tela.
- Incluir loading, erro e vazio quando aplicável.
- Usar textos em português.
- Usar componentes compatíveis com shadcn/ui.
- Usar visual limpo, operacional e confiável.
- Não criar checkout, pedido online, cadastro público ou integração WhatsApp.
- Não criar regras de negócio novas.
- Se uma tela depender de API ainda pendente ou decisão futura, marcar como pendência visual.

Responsividade:
- Indicar adaptação mobile para 375px.
- Indicar adaptação tablet para 768px quando necessário.
- Evitar layouts que dependam de largura desktop para funcionar.

Fonte da verdade:
- /specs/009-design/README.md
- /specs/009-design/design-brief.md
- /specs/009-design/routes-map.md
- /specs/009-design/public-routes.md
- /specs/004-ui/pages.md
- /specs/004-ui/flows.md
- /specs/004-ui/components.md
- /specs/003-api/rest-contracts.md
- /specs/003-api/auth.md
```

## Prompt 2 — Landing page

```txt
Criar a tela da rota / para o Sweet Factory.

Objetivo:
Página pública inicial simples, focada em apresentar o produto e levar o usuário para login.

Conteúdo obrigatório:
- Nome Sweet Factory como primeiro sinal visual.
- Texto curto explicando que o sistema ajuda a controlar custos, precificar produtos, montar cardápio e acompanhar vendas.
- CTA principal para /auth/login.
- CTA secundário para cardápio público, se confirmado visualmente como pendência.
- Resumo das funcionalidades:
  - Ingredientes e compras.
  - Embalagens e adesivos.
  - Produtos e precificação.
  - Cardápio diário.
  - Vendas.
  - Dashboard mensal.
- Link para /terms-and-conditions.

Estados:
- Estado normal.
- Loading/splash antes da página, se fizer sentido.

Restrições:
- Não criar cadastro público.
- Não criar checkout.
- Não criar pedido online.
- Não prometer integração WhatsApp ou iFood.
- Não usar hero genérico de marketing que esconda o produto.

Visual:
- Interface clara, moderna e confiável.
- Deve parecer um produto SaaS de operação, não uma campanha promocional complexa.
- Compatível com shadcn/ui.
- Responsivo em mobile.
```

## Prompt 3 — Login e recuperação de acesso

```txt
Criar as telas públicas de autenticação e recuperação de acesso do Sweet Factory.

Rotas:
- /auth/login
- /auth/recover-password
- /auth/recover-password/verify
- /auth/recover-password/reset

Tela /auth/login:
- Campo Email.
- Campo Senha.
- Botão Entrar.
- Link para recuperação de acesso.
- Estado loading ao enviar.
- Estado de erro para credenciais inválidas.
- Estado de erro de validação para email inválido ou senha vazia.

Tela /auth/recover-password:
- Campo Email.
- Botão Enviar instruções.
- Mensagem de sucesso genérica:
  "Se o email existir, enviaremos instruções para recuperação."
- Não revelar se o email existe.
- Estado loading.
- Estado de erro de validação.

Tela /auth/recover-password/verify:
- Campo Token ou Código.
- Botão Validar.
- Estado válido.
- Estado token inválido.
- Estado token expirado.
- Estado loading.

Tela /auth/recover-password/reset:
- Campo Nova senha.
- Campo Confirmar senha.
- Botão Redefinir senha.
- Estado de sucesso:
  "Senha redefinida com sucesso."
- Estado senha e confirmação divergentes.
- Estado token inválido ou expirado.
- Estado loading.

APIs relacionadas:
- POST /api/auth/login
- POST /api/auth/recover-password/request
- POST /api/auth/recover-password/verify
- POST /api/auth/recover-password/reset

Regras:
- Senha nunca deve aparecer em resposta.
- O fluxo visual não deve sugerir cadastro público.
- Não desenhar refresh token.
- Não desenhar MFA.
- Usar mensagens em português.
- Usar formulários compatíveis com React Hook Form + Zod.
- Usar componentes compatíveis com shadcn/ui.
```

## Prompt 4 — Cardápio público

```txt
Criar o protótipo das rotas públicas de cardápio diário.

Rotas:
- /daily-menu
- /daily-menu/[date]

Objetivo:
Permitir que visitantes visualizem o cardápio diário quando publicado, sem registrar pedido ou venda.

Conteúdo obrigatório:
- Data do cardápio.
- Status do cardápio.
- Lista de produtos habilitados.
- Nome do produto.
- Descrição curta, se existir no payload/decisão visual.
- Preço do dia.
- Mensagem para cardápio não publicado.
- Mensagem para cardápio encerrado.
- Mensagem para cardápio vazio.
- Estado de erro ao falhar consulta.
- Estado loading.

Estados obrigatórios:
- Publicado com produtos.
- Publicado vazio.
- Encerrado.
- Não publicado/indisponível.
- Erro.
- Loading.

API relacionada:
- GET /api/daily-menus/by-date/[date]

Pendência visual obrigatória:
- Confirmar se o cardápio público será liberado sem autenticação ou se haverá rota pública específica.

Restrições:
- Não criar pedido online.
- Não registrar venda.
- Não criar checkout.
- Não integrar WhatsApp.
- Não exibir produto desabilitado como disponível.

Visual:
- Fácil leitura em mobile.
- Produtos em cards ou lista simples.
- Preços legíveis.
- Compatível com shadcn/ui.
```

## Prompt 5 — Termos, unauthorized, 404 e loading

```txt
Criar telas públicas e especiais complementares do Sweet Factory.

Telas:
- /terms-and-conditions
- /unauthorized
- 404
- loading/splash

Tela /terms-and-conditions:
- Página pública estática.
- Título "Termos e Condições".
- Conteúdo placeholder claramente marcado como pendente de revisão humana.
- Link para voltar à página inicial.
- Link para login.

Tela /unauthorized:
- Mensagem clara de acesso não autorizado.
- Botão para voltar.
- Botão para login ou dashboard.
- Não exibir dados protegidos.

Tela 404:
- Mensagem clara de página não encontrada.
- Botão para voltar à página inicial.
- Botão para login quando fizer sentido.
- Visual alinhado ao produto.

Tela loading/splash:
- Estado global inicial.
- Indicar carregamento sem quebrar layout.
- Visual simples e compatível com shadcn/ui.
- Evitar animações complexas.

Regras:
- Textos em português.
- Sem emojis como ícones.
- Usar ícones compatíveis com Lucide quando necessário.
- Manter foco em acessibilidade e recuperação de navegação.
- Indicar adaptação mobile.
```

## Prompt 6 — Checklist final de revisão do `.pen`

```txt
Revisar o protótipo .pen das rotas públicas do Sweet Factory.

Checklist obrigatório:
- Todas as rotas públicas estão presentes:
  - /
  - /auth/login
  - /auth/recover-password
  - /auth/recover-password/verify
  - /auth/recover-password/reset
  - /terms-and-conditions
  - /daily-menu
  - /daily-menu/[date]
  - /unauthorized
  - 404
  - loading/splash
- Cada tela está nomeada com sua rota.
- Cada tela tem estado normal.
- Login tem loading e erro.
- Recuperação de acesso cobre request, verify e reset.
- Cardápio público cobre publicado, encerrado, vazio, erro e loading.
- Termos indica conteúdo pendente de revisão humana.
- Unauthorized não exibe dados protegidos.
- 404 oferece recuperação de navegação.
- Loading/splash não quebra layout.
- Design está em português.
- Design é compatível com shadcn/ui.
- Design indica adaptação mobile.
- Não existe checkout.
- Não existe pedido online.
- Não existe cadastro público.
- Não existe fluxo visual sem spec/API correspondente, salvo quando marcado como pendência.
- Conflitos com specs foram registrados para revisão do Codex.

Saída esperada:
- Arquivo .pen salvo.
- Arquivo anexado na task do ClickUp.
- Arquivo copiado ou versionado em specs/009-design/prototypes.
- Observações para revisão registradas em specs/009-design/pencil-review.md.
```

## Saída esperada

- Arquivo `.pen` salvo em `specs/009-design/prototypes`.
- Export visual para revisão, se necessário.
- Observações registradas em `pencil-review.md`.
- Task do ClickUp atualizada com o resultado.
