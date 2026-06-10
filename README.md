# Associação Digital

Ecossistema mobile (Expo) + API (Node/Prisma) para associação com governança, jurídico e benefícios.

## Onde trabalhar

**Use esta pasta local — NÃO use o OneDrive para desenvolvimento:**

```
C:\dev\associacao
```

O OneDrive causa erros ao rodar `node_modules` e o Expo. O código-fonte oficial está no GitHub.

## Rodar para apresentação (rápido)

### 1. App no navegador (recomendado)

```powershell
cd C:\dev\associacao\projetoApp
npm install --legacy-peer-deps
npm run web
```

Abra: **http://localhost:8081**

### 2. Atalho Windows

Dê duplo clique em `start-web.bat` na raiz do projeto.

## Fluxo de demonstração

1. **Login** — RS `12345` entra · RS `0000` mostra erro
2. **Início** — Carteirinha digital (toque no QR) · Atalhos rápidos
3. **Pautas** — Lista → Detalhe → Votar (A Favor / Contra / Abster)
4. **Jurídico** — Lista de chamados → Chat com advogado

## Estrutura

```
associacao/
├── projetoApp/     # App Expo (protótipo com dados mockados)
├── backend-api/    # API Node + Express + Prisma + MySQL
├── start-web.bat   # Inicia app no navegador
└── APRESENTACAO.md # Roteiro para demo
```

## API (opcional — não necessária para o protótipo)

```powershell
cd backend-api
npm install
copy .env.example .env
# Edite DATABASE_URL no .env
npm run dev
```

API em: http://localhost:3333/status

## GitHub

Repositório: https://github.com/webdevdesiner/associacao

```powershell
git clone https://github.com/webdevdesiner/associacao.git C:\dev\associacao
```
