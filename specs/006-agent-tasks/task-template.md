# Template de tarefa para o Codex

## Tarefa

Descrever a alteração a ser feita.

## Contexto

Arquivos de spec que devem ser lidos antes:

- `/specs/000-product/prd.md`
- `/specs/000-product/business-rules.md`
- `/specs/002-use-cases/<arquivo>.md`

## Objetivo

Explicar o resultado esperado.

## Regras obrigatórias

- Não usar float para dinheiro.
- Salvar dinheiro em centavos.
- Validar entrada no backend.
- Criar ou atualizar testes.
- Criar log de auditoria quando a ação for crítica.
- Não alterar regra de negócio sem atualizar spec.

## Arquivos esperados

Listar arquivos que provavelmente serão criados ou alterados.

## Critérios de aceite

- [ ] Teste unitário criado/atualizado.
- [ ] Teste de integração criado/atualizado.
- [ ] Endpoint funcionando.
- [ ] Logs criados quando aplicável.
- [ ] Documentação atualizada quando necessário.

## Comando de validação

```bash
npm run lint
npm run test
```

## Observações

Registrar decisões técnicas tomadas durante a implementação.
