# UI states

## Loading

- Usar skeletons para tabelas e cards.
- Evitar mudanças bruscas de layout.
- Usar loading específico em botões durante submit.

## Empty

- Explicar o que está vazio.
- Mostrar ação primária quando houver próximo passo claro.
- Não usar texto longo.

## Error

- Exibir mensagem amigável.
- Preservar mensagem de validação por campo quando vier da API.
- Não expor stack trace.
- Oferecer ação de tentar novamente quando aplicável.

## Success

- Confirmar ações críticas como criação, edição, inativação, publicação e venda registrada.
- Evitar bloquear o usuário quando toast/feedback inline resolver.

## Unauthorized

- Redirecionar ou exibir `/unauthorized`.
- Não renderizar dados protegidos antes da validação de permissão.

## Destructive actions

- Usar confirmação para inativar/excluir logicamente.
- Informar consequência da ação.
