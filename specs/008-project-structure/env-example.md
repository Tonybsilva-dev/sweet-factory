# Variáveis de ambiente

Criar `.env.example` com:

```env
MONGODB_URI=mongodb://localhost:27017/food_costing
JWT_SECRET=change-me
APP_URL=http://localhost:3000
```

## Regras

- `.env` não deve ser commitado.
- `JWT_SECRET` precisa ser forte em produção.
- `MONGODB_URI` deve apontar para banco separado por ambiente.
