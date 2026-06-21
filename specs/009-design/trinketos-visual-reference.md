# Referência visual — Trinketos

## Objetivo

Documentar os padrões visuais públicos do Trinketos que podem ser reaproveitados no Sweet Factory.

Esta referência serve como apoio visual e estrutural. O Sweet Factory deve manter sua própria identidade, textos, regras de negócio, rotas e contratos de API.

## Rotas analisadas

Rotas analisadas em 2026-06-21:

- Home: `https://trinketos.antoniobsilva.com.br/`
- Docs: `https://trinketos.antoniobsilva.com.br/docs`
- Coming Soon/Contato: `https://trinketos.antoniobsilva.com.br/coming-soon?page=Contato`
- Privacy: `https://trinketos.antoniobsilva.com.br/privacy`
- Terms: `https://trinketos.antoniobsilva.com.br/terms`
- LGPD: `https://trinketos.antoniobsilva.com.br/lgpd`
- Login: `https://trinketos.antoniobsilva.com.br/login`
- Signup: `https://trinketos.antoniobsilva.com.br/signup`

## Estrutura de navegação

## Header

- Header público sticky no topo.
- Fundo translúcido com blur: `bg-background/80`, `backdrop-blur-md`.
- Borda inferior discreta.
- Container centralizado com largura máxima aproximada `max-w-7xl`.
- Marca à esquerda com símbolo quadrado preenchido e nome do produto.
- Links centrais para seções do produto e documentação.
- CTAs à direita: botão secundário para login e botão primário para cadastro.
- Menu mobile com botão de ícone e navegação recolhida.

## Footer

- Footer com borda superior e fundo secundário suave.
- Grid responsivo em colunas.
- Coluna de marca e descrição curta.
- Colunas de links por categoria: produto, suporte e legal.
- Linha inferior com copyright e texto auxiliar.

## Menus

- Links de navegação usam texto pequeno, peso médio e transição de cor no hover.
- Em mobile, navegação principal fica recolhida em botão de menu.

## CTAs

- CTA primário usa cor `primary` com texto claro.
- CTA secundário usa borda e fundo neutro.
- Botões públicos são compactos, com altura entre `h-8` e `h-10`.

## Hierarquia visual

- Eyebrow em caixa alta e tracking amplo.
- Título principal grande e forte.
- Texto de apoio em cor muted.
- Seções com espaçamento vertical amplo.
- Cards e blocos de conteúdo organizam recursos, passos e documentação.

## Layout

## Grid

- Layout público usa containers centralizados.
- Páginas amplas usam `max-w-7xl`.
- Páginas legais usam leitura estreita, aproximadamente `max-w-3xl`.
- Login usa grid de duas colunas no desktop e coluna única no mobile.
- Signup usa container central com largura média, aproximadamente `max-w-2xl`.

## Largura máxima

- Home/docs/footer: `max-w-7xl`.
- Login: `max-w-6xl`.
- Legal: `max-w-3xl`.
- Signup: `max-w-2xl`.
- Coming soon: `max-w-md`.

## Espaçamentos

- Seções públicas usam `px-6` e `py-16`, `py-20` ou `py-24`.
- Cards usam `p-4`, `p-6` ou `p-8`.
- Grids usam gaps entre `gap-4` e `gap-10`.

## Seções

- Hero com gradiente suave e borda inferior.
- Seção de recursos em grid de cards.
- Seção de como funciona em passos numerados.
- Blocos legais com grupos de texto e divisórias.
- Bloco de contato/dúvida destacado em card neutro.

## Hero

- Fundo com gradiente de `background` para `secondary`.
- Eyebrow de categoria.
- Título grande e direto.
- Texto de apoio curto.
- CTAs lado a lado no desktop e empilháveis no mobile.

## Cards

- Cards de recursos têm borda, fundo `secondary/20`, hover `secondary/40`, ícone em bloco suave e título/texto.
- Cards de login usam fundo translúcido, borda, sombra e radius maior.
- Cards legais usam borda, fundo secundário e conteúdo curto.

## Blocos de conteúdo

- Conteúdo institucional é organizado por seções com `h2` em borda inferior.
- Subtítulos pequenos e sem excesso visual.
- Parágrafos com `text-sm` e `leading-relaxed`.

## Páginas institucionais

- Estrutura simples: header público, conteúdo estreito, footer.
- Título com eyebrow "Legal".
- Texto introdutório e data de atualização.
- Seções empilhadas com separadores.
- CTA textual para voltar ao início.

## Layout de autenticação

- Login usa fundo visual próprio (`bg-auth-pattern`) e container `max-w-6xl`.
- Desktop em duas colunas: narrativa/benefícios à esquerda e formulário à direita.
- Signup usa card centralizado com formulário em grid responsivo.
- Formulários têm labels visíveis, textos auxiliares e inputs compactos.

## Identidade visual

## Cores principais observadas

Tokens CSS observados:

- `--background: oklch(100% 0 0)`
- `--foreground: oklch(13% .028 261.692)`
- `--primary: oklch(59% .26 323)`
- `--primary-foreground: oklch(98% .02 320)`
- `--secondary: oklch(96.7% .001 286.375)`
- `--muted: oklch(96.7% .003 264.542)`
- `--muted-foreground: oklch(55.1% .027 264.364)`
- `--border: oklch(92.8% .006 264.531)`
- `--radius: 0`

## Cores secundárias

- Uso forte de neutros claros para fundos e cards.
- Primary em magenta/roxo para CTAs, ícones e destaques.
- Secondary muito claro para seções e cards.
- Muted foreground para textos auxiliares.

## Cores de fundo

- Fundo base branco.
- Seções com `secondary/20`, `secondary/30`, `secondary/40` e gradientes suaves.
- Autenticação usa padrão de fundo específico com imagem (`bg-auth-pattern`).

## Cores de texto

- Títulos em `foreground`.
- Textos auxiliares em `muted-foreground`.
- Eyebrows e links ativos em `primary`.

## Cores de borda

- Bordas usam `border`, com visual claro e discreto.
- Cards e seções usam bordas suaves para separar sem pesar.

## Gradientes, sombras e glassmorphism

- Gradientes suaves em hero e login.
- Header translúcido com blur.
- Login usa cards com sombra e backdrop blur.
- O uso de glassmorphism é moderado e funcional.

## Tipografia

## Fontes observadas

- Corpo: `Space Grotesk`.
- Display: `Funnel Display`.

## Estilo dos títulos

- Títulos fortes, compactos e com peso `font-bold`.
- Uso de `text-4xl`, `text-5xl`, `text-6xl` e `text-7xl` em hero/404.

## Estilo dos subtítulos

- Subtítulos médios, com `font-semibold`.
- Legal/docs usam `text-xl` para seções e `text-sm` para subtítulos internos.

## Textos longos

- Textos longos usam `text-sm` ou `text-base`.
- `leading-relaxed` é recorrente para leitura.

## Hierarquia de tamanho

- Eyebrow: `text-xs` ou `text-sm`, uppercase, tracking amplo.
- H1 público: `text-4xl` até `text-7xl`.
- H2: `text-xl` a `text-3xl`.
- Body: `text-sm` a `text-base`.

## Peso das fontes

- Labels e links: `font-medium`.
- Títulos e CTAs: `font-semibold` ou `font-bold`.

## Componentes observados

## Botões primários

- Fundo `primary`.
- Texto `primary-foreground`.
- Compactos, com foco visível.
- Algumas páginas usam `rounded-none`; outras usam `rounded-md` em CTAs públicos.

## Botões secundários

- Borda `border`.
- Fundo `background`.
- Hover com `muted` ou `secondary`.

## Inputs

- Inputs compactos com altura `h-8` ou `h-9`.
- Bordas retas ou radius zero.
- Labels sempre visíveis.
- Textos auxiliares pequenos.
- Estados inválidos previstos via `aria-invalid`.

## Cards

- Cards de feature: borda, fundo secundário suave, ícone destacado, título e texto.
- Cards de autenticação: borda, sombra, fundo e padding maior.
- Cards informativos: fundo `secondary/20`, borda e radius suave.

## Badges

- Badges em uppercase, tracking amplo, border e fundo secundário.
- Usados para "em breve" e marcação de seção.

## Alerts

- Não foi observado alerta complexo nas rotas analisadas.
- Padrão de mensagem simples em card ou texto auxiliar é suficiente para Sweet Factory.

## Formulários

- Formulários com labels, textos auxiliares e grid responsivo.
- Login possui suporte visual lateral, não apenas um card isolado.
- Signup usa duas colunas no desktop e uma coluna no mobile.

## Links

- Links discretos em `muted-foreground`.
- Hover em `primary` ou `foreground`.
- Links legais aparecem no footer e no corpo das páginas institucionais.

## Seções de conteúdo

- Seções com título, descrição e blocos/cards.
- Divisórias por border-bottom nas páginas legais.

## Estados vazios

- Coming Soon funciona como referência para estado vazio/indisponível:
  - badge de status;
  - título;
  - descrição curta;
  - CTA para voltar.

## Estados de loading

- Loading global não foi analisado como rota dedicada, mas há fallback 404 e estados de app em HTML.
- Para Sweet Factory, usar skeletons e splash simples conforme `states.md`.

## Páginas públicas observadas

## Home

Objetivo:

- Apresentar o produto e direcionar para cadastro/login/documentação.

Layout usado:

- Header sticky.
- Hero com gradiente.
- CTA primário e secundário.
- Grid de cards de recursos.
- Seção de passos.
- Footer multi-coluna.

Padrões reaproveitáveis:

- Header/footer públicos.
- Hero com texto direto e CTAs.
- Cards de funcionalidades.
- Seção de "como funciona" em passos.

Adaptações para Sweet Factory:

- Trocar suporte/tickets por custos, cardápio, produtos e vendas.
- CTA principal deve ir para `/auth/login`.
- CTA secundário pode apontar para cardápio público, se confirmado.
- Não incluir cadastro público.

## Docs

Objetivo:

- Explicar capacidades e evolução do produto.

Layout usado:

- Header público.
- Hero institucional.
- Cards/seções de navegação.
- Conteúdo em blocos com chamadas para áreas internas de documentação.

Padrões reaproveitáveis:

- Página de documentação leve, com cards de navegação.
- Bom padrão para página pública explicativa futura.

Adaptações para Sweet Factory:

- Pode virar documentação/guia público futuro, mas não é rota prioritária do MVP.

## Coming Soon/Contato

Objetivo:

- Comunicar seção indisponível sem quebrar navegação.

Layout usado:

- Header/footer públicos.
- Conteúdo centralizado.
- Badge de "em breve".
- Texto curto e CTAs.

Padrões reaproveitáveis:

- Estado vazio/indisponível.
- Página simples de fallback.

Adaptações para Sweet Factory:

- Usar para estados públicos pendentes, como cardápio indisponível ou termos pendentes.

## Privacy

Objetivo:

- Explicar política de privacidade.

Layout usado:

- Conteúdo estreito.
- Eyebrow legal.
- Título, descrição e data.
- Seções com `h2` e blocos de texto.
- Card de contato/dúvida.

Padrões reaproveitáveis:

- Estrutura para páginas legais longas.
- Blocos com títulos curtos e texto relaxado.

Adaptações para Sweet Factory:

- Útil para `/terms-and-conditions` e futuras páginas `/privacy` ou `/lgpd`.

## Terms

Objetivo:

- Apresentar termos de uso.

Layout usado:

- Mesmo padrão de página legal.
- Seções com borda inferior.
- Link de retorno ao início.

Padrões reaproveitáveis:

- Excelente base para `/terms-and-conditions`.

Adaptações para Sweet Factory:

- Conteúdo jurídico deve ser próprio e revisado, não copiado.

## LGPD

Objetivo:

- Explicar tratamento de dados e direitos do titular.

Layout usado:

- Página legal longa.
- Estrutura em tópicos.
- Seções por tema.

Padrões reaproveitáveis:

- Modelo para página LGPD futura.

Adaptações para Sweet Factory:

- Registrar como rota futura, não MVP obrigatório.

## Login

Objetivo:

- Entrada autenticada para o portal.

Layout usado:

- Fundo visual `bg-auth-pattern`.
- Topbar simples com voltar, documentação e criar conta.
- Grid desktop com narrativa à esquerda e card/formulário à direita.
- Benefícios/garantias em cards pequenos.
- Formulário com título, descrição, labels, textos auxiliares, checkbox e link de recuperação.

Padrões reaproveitáveis:

- Layout de login com contexto lateral.
- Card de formulário com boa hierarquia.
- Link para recuperação.
- Estados de erro/loading devem ser adicionados no `.pen`.

Adaptações para Sweet Factory:

- Remover cadastro público.
- Ajustar narrativa para custos, cardápio e vendas.
- Login deve consumir `POST /api/auth/login`.
- Recuperação deve usar APIs já implementadas.

## Signup

Objetivo:

- Cadastro público de organização.

Layout usado:

- Fundo de autenticação.
- Card centralizado.
- Formulário em grid responsivo.
- Termos e política como links auxiliares.

Padrões reaproveitáveis:

- Grid de formulário e card central.
- Bom padrão visual para telas de recuperação ou formulários públicos.

Adaptações para Sweet Factory:

- Não implementar signup público no MVP.
- Reaproveitar estrutura visual para recuperação de senha e, futuramente, cadastro administrativo se for documentado.

## Login e Signup

## Estrutura do formulário

- Título e descrição no topo.
- Campos com labels.
- Textos auxiliares abaixo de alguns campos.
- Botão principal no final.
- Links auxiliares para recuperação, termos ou ação alternativa.

## Card/container

- Login: duas colunas com card narrativo e formulário.
- Signup: card centralizado com largura média.
- Ambos usam fundo próprio de autenticação.

## Campos

- Inputs compactos.
- Labels sempre presentes.
- Grid responsivo em signup.

## Botões

- Primário em `primary`.
- Secundários com borda/neutro.
- Altura compacta.

## Links auxiliares

- Recuperação de acesso.
- Voltar para home.
- Documentação.
- Termos e privacidade.

## Feedback visual

- Textos auxiliares orientam o usuário antes do erro.
- Estados explícitos de erro/loading precisam ser desenhados para Sweet Factory.

## Padrões reaproveitáveis

Para Sweet Factory:

- `/auth/login`: reaproveitar layout de duas colunas, mas sem CTA de signup.
- `/auth/recover-password`: pode usar card central ou grid simples com texto lateral.
- `/auth/recover-password/verify`: usar card compacto com campo de token/código.
- `/auth/recover-password/reset`: usar card com dois campos de senha e mensagens claras.

## Páginas legais

Padrões reaproveitáveis para:

- `/terms-and-conditions`
- `/privacy`, se futuramente existir
- `/lgpd`, se futuramente existir

Recomendações:

- Usar container estreito `max-w-3xl`.
- Manter header/footer públicos.
- Usar eyebrow "Legal".
- Usar título grande, descrição curta e data de atualização.
- Separar seções por borda inferior.
- Adicionar card final de contato/dúvidas se houver contato definido.

## Adaptação para Sweet Factory

- Manter estrutura visual: header público, hero, cards, steps, footer e páginas legais estreitas.
- Adaptar textos para alimentação/doceria/SaaS.
- Adaptar CTAs para login e cardápio público, sem cadastro público.
- Adaptar cards para custos, ingredientes, compras, produtos, cardápio, vendas e dashboard.
- Adaptar login para auth já implementado.
- Adaptar recuperação de acesso para API já implementada.
- Adaptar páginas legais para termos do Sweet Factory.
- Trocar marca, ícones e paleta conforme identidade Sweet Factory.
- Preservar clareza, hierarquia e espaçamento do Trinketos, sem copiar conteúdo literal.

## Regras

- Não copiar identidade literal se não for desejado.
- Não copiar textos de negócio do Trinketos.
- Usar Trinketos como referência visual e estrutural.
- Sweet Factory deve manter sua própria identidade de produto.
- Specs e APIs do Sweet Factory continuam sendo fonte da verdade.
- Se o visual sugerir cadastro público, remover do Sweet Factory porque cadastro público está fora de escopo.
- Se o visual sugerir documentação pública, tratar como rota futura, não obrigatória no MVP.

## Recomendações para o `.pen`

## `public-routes.pen`

- Usar header/footer públicos inspirados no Trinketos.
- Incluir landing com hero, cards de funcionalidades e steps.
- Usar login com layout de duas colunas ou card central, sem cadastro público.
- Usar recuperação de acesso com variações request, verify e reset.
- Usar termos com layout legal estreito.
- Usar coming soon/empty como referência para cardápio indisponível.
- Incluir estados de loading, erro e vazio.
- Marcar pendência sobre cardápio público sem autenticação.

## `private-routes.pen`

- Reaproveitar densidade, cards e hierarquia, mas trocar header público por layout autenticado.
- Usar cards de métricas semelhantes em clareza, mas voltados a receita, custos e margem.
- Usar tabelas e formulários compatíveis com shadcn/ui.
- Priorizar operação e leitura rápida.

## `full-mvp.pen`

- Consolidar rotas públicas, autenticadas e estados especiais.
- Garantir que nenhum fluxo fora de spec apareça como funcionalidade pronta.

## Pendências

- Decidir paleta final do Sweet Factory: manter primary próximo ao magenta do Trinketos ou adaptar para identidade mais ligada a alimentação/doceria.
- Decidir se Sweet Factory terá páginas futuras de privacidade e LGPD além de termos.
- Confirmar rota pública de cardápio sem autenticação.
- Definir se haverá documentação pública no MVP ou apenas landing/login/cardápio/termos.
- Definir contato oficial para páginas legais.
