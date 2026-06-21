# Caso de uso — Cardápio diário

## Objetivo

Criar cardápio por data usando produtos cadastrados e permitir habilitar/desabilitar produtos.

## Atores

- Usuário autenticado.
- Sistema.

## Entrada

- Data.
- Produtos.
- Preço do dia.
- Status.
- Observação opcional.

## Fluxo principal

1. Usuário escolhe uma data.
2. Sistema verifica se já existe cardápio para a data.
3. Usuário adiciona produtos.
4. Sistema salva snapshot de nome, preço e custo.
5. Usuário publica cardápio.
6. Usuário habilita ou desabilita produtos conforme disponibilidade.

## Regras aplicadas

- Só pode haver um cardápio por data.
- Produto inativo não deve ser adicionado.
- Preço do cardápio pode ser diferente do preço base.
- Cardápio pode ter status draft, published ou closed.

## Saída esperada

- Cardápio criado.
- Produtos habilitados ou desabilitados.
- Cardápio publicado.
- Cardápio encerrado.

## Critérios de aceite

- Deve impedir dois cardápios na mesma data.
- Deve permitir desabilitar produto.
- Deve manter snapshot de preço do dia.
- Deve permitir encerrar cardápio.

## Logs de auditoria

- `daily_menu.created`
- `daily_menu.product_enabled`
- `daily_menu.product_disabled`
- `daily_menu.published`
- `daily_menu.closed`

## Observações para implementação

Criar endpoint para clonar cardápio de outro dia como evolução futura.
