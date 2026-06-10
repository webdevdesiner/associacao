# Backend API - Associação Digital

Node.js + Express + TypeScript + Prisma + MySQL. Socket.io preparado para chat em tempo real.

## Pré-requisitos

- Node.js 18+
- MySQL (XAMPP, Workbench ou Docker)

## Configuração

### 1. Instalar dependências

```bash
cd backend-api
npm install
```

### 2. Configurar o banco MySQL

Crie um banco (ex.: `associacao_db`) no MySQL. Depois copie o arquivo de ambiente:

```bash
cp .env.example .env
```

Edite o `.env` e ajuste a `DATABASE_URL` com seu usuário e senha:

```
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/associacao_db"
```

Exemplo: `mysql://root:root@localhost:3306/associacao_db`

### 3. Primeira migration no MySQL

Gera o cliente Prisma e aplica o schema no banco:

```bash
npx prisma generate
npx prisma db push
```

Ou, para usar migrations versionadas (recomendado em produção):

```bash
npx prisma migrate dev --name init
```

### 4. Popular com dados de teste (seed)

```bash
npm run db:seed
```

### 5. Rodar a API

Modo desenvolvimento (com reload):

```bash
npm run dev
```

Modo produção:

```bash
npm run build
npm start
```

A API sobe em **http://localhost:3333**.

### Testar

- **GET** `http://localhost:3333/status` — retorna `{ ok: true, message: "API Associação Digital está rodando.", ... }`

## Estrutura

```
backend-api/
├── prisma/
│   ├── schema.prisma   # Modelos: User, Pauta, Vote, LegalTicket, LegalMessage
│   └── seed.ts        # Dados iniciais (igual ao mock do app)
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── index.ts       # Express + Socket.io
├── package.json
└── tsconfig.json
```

## Comandos úteis

| Comando           | Descrição                    |
|-------------------|-----------------------------|
| `npm run dev`     | Sobe a API em modo watch    |
| `npm run db:seed` | Popula o banco com o seed  |
| `npx prisma studio` | Abre interface no navegador |
