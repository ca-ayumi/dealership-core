# dealership-core

> Serviço Core do Dealership — responsável por agregação de dados de veículos, vendas e pagamentos.

## Visão Geral da Arquitetura
![Visão da Arquitetura.drawio.png](docs%2FVis%C3%A3o%20da%20Arquitetura.drawio.png)

## Fluxo Arquitetural
![Fluxo Arquitetural Completo.jpg](docs%2FFluxo%20Arquitetural%20Completo.jpg)


## Requisitos

- Node.js >= 18
- npm
- Docker + Docker Compose

## Instalação

```bash
npm install
```


1) Configure `.env`

```bash
cp .env.example .env
```

Exemplo (`.env`):

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5435/dealership_core"
```

2) Suba o banco
```bash
docker compose up -d
```

3) Execute migrations do Prisma:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4) Inicie a aplicação

```bash
npm run start:dev
```

A API roda em:

```
http://localhost:3002
```

---

## Variáveis de ambiente

| Nome | Obrigatório | Exemplo                                           | Descrição |
|------|-------------|---------------------------------------------------|-----------|
| `DATABASE_URL` | ✅ | postgresql://postgres:postgres@localhost:5435/dealership_core | URL do banco |


---

## Testes

Rodar testes unitários + integração:

```bash
npm run test
```

Com cobertura:

```bash
npm run test:cov  
```

Config exige ≥ **80%**:

```
branches: 80
functions: 80
lines: 80
statements: 80
```
---

## Endpoints 

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **GET** | `/vehicles` | Lista veículos (opcional `?status=`) |
| **GET** | `/vehicles?status=AVAILABLE` | Lista veículos disponíveis |
| **GET** | `/vehicles?status=SOLD` | Lista veículos vendidos |
| **GET** | `/vehicles/:id` | Busca veículo por ID |
| **POST** | `/vehicles` | Cria novo veículo |
| **PATCH** | `/vehicles/:id` | Atualiza dados do veículo |
| **PATCH** | `/vehicles/:id/status` | Atualiza status do veículo |

---

## Exemplos de cURL

### Criar veículo
```bash
curl --location 'http://localhost:3002/vehicles' \
--header 'Content-Type: application/json' \
--data '{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "color": "White",
  "price": 95000
}'
```

### Listar todos os veículos
>Valores possíveis: AVAILABLE | SOLD
```bash
curl --location 'http://localhost:3002/vehicles?status=AVAILABLE'
```
```bash
curl --location 'http://localhost:3002/vehicles?status=SOLD'
```

### Buscar veículo por ID
```bash
curl --location 'http://localhost:3002/vehicles/<ID>'
```

### Atualizar dados de veículo
```bash
curl --location --request PATCH 'http://localhost:3002/vehicles/<ID>' \
--header 'Content-Type: application/json' \
--data '{
  "model": "Corolla Altis",
  "color": "Black",
  "price": 110000
}'
```
### Alterar status do veículo
```bash
curl --location --request PATCH 'http://localhost:3002/vehicles/<ID>/status' \
--header 'Content-Type: application/json' \
--data '{
  "status": "SOLD"
}'
```
### Criar múltiplos veículos rápido
```bash
curl -X POST http://localhost:3002/vehicles \
-H "Content-Type: application/json" \
-d '{"brand":"Honda","model":"Civic","year":2021,"color":"Blue","price":98000}'

curl -X POST http://localhost:3002/vehicles \
-H "Content-Type: application/json" \
-d '{"brand":"Ford","model":"Mustang","year":2020,"color":"Red","price":250000}'

curl -X POST http://localhost:3002/vehicles \
-H "Content-Type: application/json" \
-d '{"brand":"Chevrolet","model":"Onix","year":2022,"color":"Gray","price":65000}'

```
