# dealership-core

> Serviço Core do Dealership — responsável por agregação de dados de veículos, vendas e pagamentos.

## 🚀 Visão Geral da Arquitetura
![Visão da Arquitetura.drawio.png](docs%2FVis%C3%A3o%20da%20Arquitetura.drawio.png)

## 🚀 Fluxo Arquitetural
![Fluxo Arquitetural Completo.jpg](docs%2FFluxo%20Arquitetural%20Completo.jpg)


## 🚀 Requisitos

- Node.js >= 18
- npm
- Docker + Docker Compose

## 📦 Instalação

```bash
git clone <url-do-repo>
cd dealership-core
npm install
```

## 🗄️ Configuração do Banco

Crie `.env`:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dealership_core?schema=public"
```

Suba o banco:
```bash
docker compose up -d
```

## 🔧 Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## ▶️ Rodando a aplicação

```bash
npm run start:dev
```

## ✅ Testes

### Listar veículos disponíveis
```bash
curl --location --request GET 'http://localhost:3000/vehicles/for-sale'
```

### Listar veículos vendidos
```bash
curl --location --request GET 'http://localhost:3000/vehicles/sold'
```

### Criar venda
```bash
curl --location 'http://localhost:3000/sales' --header 'Content-Type: application/json' --data '{
  "vehicleId": 1,
  "customerName": "João Silva",
  "paymentMethod": "credit_card"
}'
```

### Webhook pagamento
```bash
curl --location 'http://localhost:3000/payments/webhook' --header 'Content-Type: application/json' --data '{
  "saleId": 1,
  "status": "paid"
}'
```

## 🐳 Docker

Rodar tudo via docker:

```bash
docker compose up -d
```

A API ficará em:
```
http://localhost:3000
```

## 🚧 Estrutura

```
src/
 ├── prisma/
 ├── modules/
 │    ├── vehicles
 │    ├── sales
 │    └── payments
 ├── app.module.ts
 └── main.ts
```

## 📄 Licença

MIT
