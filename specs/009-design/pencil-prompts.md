# Pencil prompts

Este arquivo reúne instruções para criação de protótipos no Pencil.

## Regras

- Pencil é apoio visual.
- Specs e API são fonte da verdade.
- Se houver conflito entre `.pen` e specs, specs vencem.
- Não inventar regra de negócio no protótipo.

## Prompt base

```txt
Criar protótipo visual para Sweet Factory, um SaaS operacional de precificação, cardápio e controle de custos para pequenos negócios de alimentação.

Usar as funcionalidades descritas em /specs/004-ui e respeitar as permissões de /specs/003-api/auth.md.

Priorizar interface limpa, utilitária, com tabelas, formulários, cards de métricas, estados vazios, loading e erro.

Não adicionar funcionalidades fora das specs.
```

## Telas prioritárias

1. Login.
2. Layout autenticado.
3. Dashboard.
4. Ingredientes.
5. Compras.
6. Embalagens e adesivos.
7. Produtos e precificação.
8. Cardápio diário.
9. Vendas.
10. Recuperação de acesso.

## Saída esperada

- Arquivo `.pen` salvo em `specs/009-design/prototypes`.
- Export visual para revisão, se necessário.
- Observações registradas em `pencil-review.md`.
