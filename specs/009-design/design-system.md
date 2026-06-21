# Design system

## Base técnica

- shadcn/ui para componentes base.
- Tailwind CSS para estilos.
- Lucide icons para ícones quando houver equivalente.
- React Hook Form + Zod para formulários.
- Zustand somente quando houver estado client-side compartilhado.

## Princípios

- Priorizar clareza operacional.
- Evitar decoração sem função.
- Não usar emoji como ícone de interface.
- Usar estados de foco visíveis.
- Manter contraste adequado em textos, cards e tabelas.
- Evitar mudança de layout em hover.

## Componentes base

Referência funcional em `/specs/004-ui/components.md`.

Componentes visuais esperados:

- `PageHeader`
- `DataTable`
- `EmptyState`
- `ConfirmDialog`
- `CurrencyInput`
- `QuantityInput`
- `UnitSelect`
- `DatePicker`
- `MonthPicker`
- `StatusBadge`
- `MetricCard`
- `AuditLogDrawer`

## Padrões de tela

### Listagens

- Header com título e ação principal.
- Filtros acima da tabela.
- Estado vazio com ação clara.
- Erro com mensagem objetiva e opção de tentar novamente.

### Formulários

- Labels sempre visíveis.
- Mensagens de erro por campo.
- Botão primário para salvar/confirmar.
- Botão secundário para cancelar.
- Confirmação para ações destrutivas.

### Dashboard

- Cards de métricas no topo.
- Comparação com mês anterior.
- Tabelas ou gráficos simples para produtos mais vendidos.
- Sem gráficos avançados antes de existir necessidade validada.

## Tokens visuais

Os tokens finais devem ser definidos ou confirmados no `.pen`.

Enquanto não houver `.pen`, usar padrões do shadcn/ui e tema atual da aplicação.

## Referência visual Trinketos

O projeto Trinketos foi analisado como referência visual pública aprovada.

Usar `specs/009-design/trinketos-visual-reference.md` como apoio para:

- Header público sticky com fundo translúcido e blur.
- Footer multi-coluna com marca, links de produto/suporte/legal e linha final.
- Hero com gradiente suave, eyebrow, título forte, texto curto e CTAs.
- Cards de funcionalidades com borda, fundo secundário suave, ícones e hover discreto.
- Páginas legais em container estreito, com seções separadas por borda.
- Layout de login com fundo próprio, narrativa lateral e formulário em card.
- Formulários com labels visíveis, textos auxiliares e inputs compactos.

Não copiar conteúdo de negócio nem identidade literal do Trinketos.

Sweet Factory deve adaptar:

- Textos para alimentação/doceria/SaaS.
- CTAs para login e cardápio público.
- Cards para custos, compras, produtos, cardápio, vendas e dashboard.
- Login e recuperação de acesso para as APIs reais do Sweet Factory.

Se houver conflito entre referência visual e specs do Sweet Factory, as specs vencem.
