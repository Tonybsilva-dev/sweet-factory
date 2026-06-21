# Design brief

## Produto

Sweet Factory é um sistema operacional para precificação, cardápio e controle de custos de pequenos negócios de alimentação.

## Objetivo visual

Criar uma interface clara, rápida e confiável para uso recorrente. O produto deve priorizar leitura de dados, cadastro eficiente e tomada de decisão sobre custos, preços e vendas.

## Público

- Dono do negócio: acompanha custos, define produtos, preços e margem.
- Operador: registra vendas e atualiza cardápio.

## Direção de experiência

- Interface de SaaS operacional, não landing promocional como experiência principal.
- Layout autenticado denso, organizado e fácil de escanear.
- Tabelas e formulários devem ser previsíveis.
- Indicadores financeiros devem ter hierarquia clara.
- Estados de erro devem ser objetivos e acionáveis.

## Regras de produto

- Não colocar regra de negócio em componente React.
- Toda validação visual deve respeitar validação backend com Zod/API.
- Dinheiro deve ser exibido formatado, mas persistido em centavos pela API.
- Permissões visuais devem seguir roles documentadas em `/specs/003-api/auth.md`.

## Dependência de protótipo

Nenhuma task de UI pode iniciar sem:

- Task completa no ClickUp.
- Arquivo `.pen` criado ou revisado.
- Revisão do `.pen` contra specs e API.
