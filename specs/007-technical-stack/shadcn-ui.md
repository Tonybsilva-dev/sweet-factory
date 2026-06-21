# shadcn/ui

## Decisão

Usar shadcn/ui como base visual do MVP.

## Comando inicial

```bash
pnpm dlx shadcn@latest init --preset b1G2BfOOe --template next
```

## Componentes iniciais

Adicionar inicialmente:

```bash
pnpm dlx shadcn@latest add button input label textarea select dialog dropdown-menu table badge card separator form sonner calendar popover command
```

## Componentes por tela

### Dashboard

- Card.
- Badge.
- Table.
- Separator.

### Ingredientes

- Table.
- Dialog.
- Input.
- Select.
- Form.
- Badge.

### Compras

- Form.
- Input.
- Select.
- Table.
- Button.
- Card.

### Produtos

- Form.
- Input.
- Select.
- Table.
- Card.
- Dialog.

### Cardápio diário

- Calendar.
- Popover.
- Table.
- Switch, se disponível.
- Badge.
- Card.

### Vendas

- Form.
- Command.
- Table.
- Card.
- Dialog.

### Logs

- Table.
- Badge.
- Dialog.
- Separator.

## Regras de UI

- Interface simples.
- Priorizar tabelas e formulários claros.
- Não criar animações desnecessárias.
- Não usar estado global complexo no MVP.
- Componentes shadcn devem ficar em `src/components/ui`.
- Componentes de domínio devem ficar em `src/components/domain` ou dentro do módulo.
