## E-commerce backend

## Description

Backend do [E-commerce Dashboard](frankllin15/roxobrasil-dashboard). Expõe duas APIs
- API Grapgql: Gerecimento de produtos, usuarios e pedidos.
- API REST: Upload e formatação de images

## Intalação

```bash
$ npm install
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`
`JWT_SECRET`

## Rodando localmente
### Sincronise o banco de dados
```
  npx prisma migrate dev --name init
```

### Inicie o servidor

#### Desenvolvimento
```bash
$ npm run start:dev
```
#### Produção
```bash
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```



## Autor

- [Frankllin Teixeira](https://github.com/frankllin15)


