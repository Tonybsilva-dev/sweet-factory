# Testes de aceite

## Ingredientes

### Criar ingrediente

Dado que o usuário informa nome, categoria e unidade base, quando salvar, então o ingrediente deve ser criado ativo.

### Bloquear unidade inválida

Dado que o usuário informa unidade inválida, quando salvar, então o sistema deve retornar erro de validação.

## Compras

### Registrar compra de ingrediente

Dado que existe um ingrediente cadastrado, quando o usuário registra uma compra, então o estoque e custo médio devem ser atualizados.

### Registrar compra com múltiplos itens

Dado que existem ingredientes e materiais, quando registrar compra com múltiplos itens, então todos devem ter estoque e custo atualizados.

## Produtos

### Calcular custo de produto

Dado que o produto possui ingredientes e materiais, quando salvar, então o sistema deve calcular custo unitário.

### Sugerir preço

Dado que o produto tem custo unitário e margem, quando salvar, então o sistema deve sugerir preço de venda.

## Cardápio

### Criar cardápio

Dado que existem produtos ativos, quando criar cardápio para uma data, então os produtos devem ser adicionados com snapshot de preço e custo.

### Impedir cardápio duplicado

Dado que já existe cardápio para uma data, quando tentar criar outro, então o sistema deve retornar conflito.

## Vendas

### Registrar venda

Dado que existe produto ativo, quando registrar venda, então o sistema deve salvar receita, custo e lucro estimado.

### Aplicar desconto

Dado que a venda possui desconto, quando salvar, então o total líquido deve ser calculado corretamente.

## Dashboard

### Exibir variação mensal

Dado que existem vendas em dois meses, quando abrir dashboard, então o sistema deve mostrar variação percentual.

## Logs

### Registrar ação crítica

Dado que uma compra é criada, quando a ação finalizar, então deve existir log em `audit_logs`.
