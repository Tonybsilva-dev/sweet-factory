# Regras de negócio

## BR01 — Dinheiro deve ser salvo em centavos

Todos os valores financeiros devem ser armazenados como inteiro em centavos.

Exemplo:

- R$ 10,50 deve ser salvo como `1050`.
- R$ 0,03 deve ser salvo como `3`.

Não usar float para persistir dinheiro.

## BR02 — Custo médio de ingrediente

Ao registrar uma nova compra de ingrediente, o sistema deve recalcular o custo médio.

Fórmula:

```txt
novoCustoMedio = ((estoqueAtual * custoMedioAtual) + valorTotalCompra) / (estoqueAtual + quantidadeComprada)
```

A quantidade deve estar convertida para a unidade base do ingrediente.

## BR03 — Conversão de unidades

O sistema deve trabalhar com uma unidade base por item.

Conversões aceitas no MVP:

- kg para g.
- g para g.
- l para ml.
- ml para ml.
- unidade para unidade.

Exemplo:

Ingrediente: Chocolate  
Unidade base: g  
Compra: 2 kg  
Quantidade persistida: 2000 g

## BR04 — Custo de produto

O custo do produto deve considerar:

- Ingredientes.
- Quantidade usada de cada ingrediente.
- Custo médio atual de cada ingrediente.
- Embalagens.
- Adesivos.
- Materiais descartáveis.
- Percentual de perda.
- Rendimento da receita.

## BR05 — Rendimento obrigatório

Todo produto deve possuir rendimento.

Exemplo:

Uma receita que custa R$ 60,00 e rende 10 unidades tem custo base de R$ 6,00 por unidade.

## BR06 — Perda/desperdício

Produto pode ter percentual de perda.

Fórmula implementada:

```txt
custoComPerda = custoUnitario / (1 - percentualPerda)
```

Exemplo:

Custo unitário: R$ 5,00  
Perda: 10%  
Custo com perda: R$ 5,56

Observações:

- `percentualPerda` deve ser informado como percentual.
- Exemplo: `10` representa 10%.
- Divisões não exatas devem ser arredondadas para centavos inteiros.

## BR07 — Preço sugerido

O preço sugerido deve ser calculado com base na margem desejada.

Fórmula:

```txt
precoSugerido = custoFinalUnitario / (1 - margemDesejada)
```

Exemplo:

Custo: R$ 4,00  
Margem desejada: 50%  
Preço sugerido: R$ 8,00

Divisões não exatas devem ser arredondadas para centavos inteiros.

## BR08 — Preço manual prevalece

O sistema sugere o preço, mas o usuário pode definir manualmente o preço de venda.

O produto deve guardar:

- `suggestedPriceCents`
- `salePriceCents`

## BR09 — Snapshot em vendas

Ao registrar uma venda, o sistema deve salvar:

- Nome do produto no momento.
- Preço unitário vendido.
- Custo unitário estimado no momento.
- Margem estimada no momento.

Atualizações futuras no produto não podem alterar vendas antigas.

## BR10 — Cardápio diário com preço próprio

O preço de venda no cardápio diário pode ser diferente do preço padrão do produto.

Exemplo:

Produto base: R$ 12,00  
Cardápio do dia: R$ 10,00 em promoção

## BR11 — Exclusão lógica

Entidades principais devem usar exclusão lógica.

Campos recomendados:

- `isActive`
- `deletedAt`
- `deletedBy`

## BR12 — Auditoria

Toda ação crítica deve gerar log.

Ações críticas:

- Criar.
- Editar.
- Inativar.
- Excluir logicamente.
- Registrar compra.
- Registrar venda.
- Alterar preço.
- Publicar cardápio.
- Encerrar cardápio.

## BR13 — Dashboard mensal

O dashboard deve comparar o mês selecionado com o mês anterior.

Indicadores mínimos:

- Receita líquida.
- Gastos com ingredientes.
- Gastos com embalagens/adesivos.
- Lucro bruto estimado.
- Variação percentual.

## BR14 — Estoque no MVP

No MVP, a baixa automática de estoque pode ser opcional.

Se implementada, ao registrar venda, o sistema deve reduzir ingredientes e materiais com base na receita do produto vendido.
