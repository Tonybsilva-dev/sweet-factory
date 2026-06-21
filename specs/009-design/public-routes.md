# Public routes

## `/`

Landing pública simples com:

- Apresentação do produto.
- CTA para login.
- Resumo das funcionalidades.
- Link para termos.
- Link para cardápio público, se confirmado.

Referência visual:

- Usar estrutura pública inspirada no Trinketos: header sticky, hero com gradiente suave, cards de funcionalidades, seção de passos e footer multi-coluna.
- Não copiar textos de negócio do Trinketos.
- Não incluir cadastro público no Sweet Factory.

## `/auth/login`

Tela de login com:

- Email.
- Senha.
- Erro amigável.
- Loading.
- Redirecionamento para dashboard.

Referência visual:

- Usar login do Trinketos como base estrutural: fundo de autenticação, narrativa lateral no desktop e formulário em card.
- Remover CTA de signup/cadastro público.
- Manter link de recuperação de acesso.

## Recuperação de acesso

Rotas:

- `/auth/recover-password`
- `/auth/recover-password/verify`
- `/auth/recover-password/reset`

API relacionada:

- `POST /api/auth/recover-password/request`
- `POST /api/auth/recover-password/verify`
- `POST /api/auth/recover-password/reset`

Referência visual:

- Adaptar padrões de formulário do login/signup do Trinketos.
- Usar card central ou grid simples com texto lateral.
- Incluir estados de sucesso, token inválido, token expirado, senha divergente e loading.

## `/terms-and-conditions`

Página pública estática. Conteúdo final depende de revisão humana.

Referência visual:

- Usar padrão legal do Trinketos: container estreito, eyebrow "Legal", título grande, descrição, data de atualização e seções separadas por borda.
- Conteúdo jurídico deve ser próprio do Sweet Factory e revisado.

## Cardápio público

Rotas previstas:

- `/daily-menu`
- `/daily-menu/[date]`, se confirmado

Pendência:

- Confirmar regra de acesso público para cardápio diário.

Referência visual:

- Usar cards/listas com leitura mobile semelhante aos cards públicos do Trinketos.
- Usar estado "em breve"/indisponível do Trinketos como referência para cardápio não publicado, encerrado ou vazio.
