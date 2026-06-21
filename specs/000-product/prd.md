# PRD — Sistema de Precificação, Cardápio e Controle de Custos

## 1. Visão geral

Criar uma aplicação simples para controle de compras, ingredientes, embalagens, adesivos, produtos, cardápio diário, vendas e análise de custos.

O sistema deve ajudar o usuário a entender quanto custa produzir cada produto e qual preço médio de venda deve ser praticado com base no custo real dos ingredientes e materiais.

## 2. Objetivos

- Registrar compras de ingredientes.
- Registrar compras de embalagens, adesivos e materiais descartáveis.
- Calcular custo médio dos ingredientes.
- Cadastrar produtos com base em ingredientes e materiais usados.
- Calcular custo estimado por produto.
- Recomendar preço de venda.
- Montar cardápio diário habilitando ou desabilitando produtos.
- Registrar vendas.
- Exibir dashboard mensal de vendas, gastos e margem.
- Registrar logs das principais ações.

## 3. Problema

Pequenos negócios de alimentação geralmente precificam produtos no "olhômetro", sem saber exatamente:

- Quanto foi gasto em ingredientes.
- Quanto foi gasto em embalagem e adesivo.
- Qual produto tem melhor margem.
- Qual produto vende mais.
- Se o preço de venda atual cobre os custos.
- Como os gastos variam de mês para mês.

## 4. Escopo do MVP

O MVP deve conter:

1. Cadastro de ingredientes.
2. Registro de compras.
3. Cadastro de embalagens e adesivos.
4. Cadastro de produtos/receitas.
5. Cálculo de custo e preço sugerido.
6. Cardápio diário.
7. Registro de vendas.
8. Dashboard mensal.
9. Logs de auditoria.

## 5. Fora do escopo inicial

- Emissão fiscal.
- Integração com iFood.
- Integração com WhatsApp.
- Aplicativo mobile.
- Multiempresa.
- Controle avançado de validade.
- Controle de produção por lote.
- Controle financeiro completo.
- Contas a pagar/receber.
- Integração com maquininha.
- Gestão de funcionários avançada.

## 6. Personas

### Dono do negócio

Pessoa que compra ingredientes, monta produtos, define preços e acompanha resultado mensal.

### Operador

Pessoa que registra vendas e atualiza o cardápio do dia.

## 7. Métricas de sucesso

- Usuário consegue cadastrar uma compra em menos de 1 minuto.
- Usuário consegue cadastrar um produto com cálculo de custo.
- Usuário consegue visualizar preço sugerido.
- Usuário consegue montar cardápio diário.
- Usuário consegue entender variação de vendas e gastos por mês.
- Dashboard apresenta dados consistentes com vendas e compras registradas.

## 8. Premissas

- O banco usado será MongoDB.
- Valores financeiros devem ser salvos em centavos.
- Vendas devem salvar snapshot de custo e preço.
- Produtos devem ter rendimento definido.
- Cardápio diário deve permitir preço diferente do cadastro base.
- Logs devem ser gerados desde o início do projeto.

## 9. Fluxo resumido

1. Usuário cadastra ingredientes.
2. Usuário registra compras.
3. Sistema calcula custo médio dos ingredientes.
4. Usuário cadastra embalagens e adesivos.
5. Usuário cadastra produtos usando ingredientes e materiais.
6. Sistema calcula custo do produto.
7. Sistema sugere preço de venda.
8. Usuário monta cardápio diário.
9. Usuário registra vendas.
10. Dashboard exibe vendas, custos e variações.
