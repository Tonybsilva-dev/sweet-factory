# Padrão de erros da API

## Formato padrão

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos.",
    "details": [
      {
        "field": "name",
        "message": "Nome é obrigatório."
      }
    ]
  }
}
```

## Códigos

### VALIDATION_ERROR

Erro de validação de entrada.

Status:

```txt
400
```

### UNAUTHORIZED

Usuário não autenticado.

Status:

```txt
401
```

### FORBIDDEN

Usuário sem permissão.

Status:

```txt
403
```

### NOT_FOUND

Entidade não encontrada.

Status:

```txt
404
```

### CONFLICT

Conflito de regra de negócio.

Exemplos:

- Cardápio já existe para a data.
- Email já cadastrado.

Status:

```txt
409
```

### BUSINESS_RULE_ERROR

Erro de regra de negócio.

Exemplos:

- Unidade incompatível.
- Margem inválida.
- Rendimento zerado.

Status:

```txt
422
```

### INTERNAL_ERROR

Erro inesperado.

Status:

```txt
500
```

## Mensagens recomendadas

- "Nome é obrigatório."
- "Unidade de medida inválida."
- "Quantidade deve ser maior que zero."
- "Valor total deve ser maior que zero."
- "Produto precisa ter pelo menos um ingrediente."
- "Rendimento deve ser maior que zero."
- "Margem deve ser maior que zero e menor que 100."
- "Já existe cardápio para esta data."
- "Produto não encontrado."
- "Ingrediente não encontrado."
- "Material não encontrado."

## Regras

1. Não retornar stack trace para o frontend.
2. Logs internos podem conter detalhes técnicos.
3. Erros de validação devem retornar lista de campos.
4. Erros de regra de negócio devem ser claros para o usuário.

## Estado atual da implementação

Implementado em `/application`:

- `src/shared/errors/api-error.ts`
- `src/shared/http/api-response.ts`
- `src/shared/validation/object-id.ts`

Comportamento atual:

- Erros Zod são convertidos para `VALIDATION_ERROR` com status `400`.
- `ApiError` centraliza `code`, `message`, `status` e `details`.
- Rotas protegidas sem token retornam `UNAUTHORIZED` com status `401`.
- Token inválido ou usuário inativo retornam `UNAUTHORIZED` com status `401`.
- Usuário autenticado sem role permitida retorna `FORBIDDEN` com status `403`.
- Erros inesperados retornam `INTERNAL_ERROR` com mensagem genérica.
- Stack trace não é retornado para o frontend.
- Erros inesperados são registrados internamente com `console.error`.

Formato de sucesso atual:

```json
{
  "data": {}
}
```

Formato de erro atual:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos.",
    "details": []
  }
}
```

Pendências:

- Padronizar paginação quando listagens paginadas forem concluídas.
- Definir mensagens finais de erro para a futura UI de login.
