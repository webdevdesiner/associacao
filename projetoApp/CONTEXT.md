# PROJETO: Ecossistema da Associação Digital (Mobile App)

## 1. Visão Geral
Desenvolvimento de um aplicativo móvel para uma Associação, focado em **Governança (Votação)**, **Comunicação Jurídica** e **Benefícios**.
O objetivo atual é criar um **Protótipo de Alta Fidelidade** rodando localmente com dados simulados (mockados) para validação com o cliente.

## 2. Stack Tecnológica (Protótipo)
- **Framework:** React Native (via Expo).
- **Linguagem:** TypeScript.
- **Roteamento:** Expo Router (estrutura baseada em arquivos na pasta `/app`).
- **Estilização:** StyleSheet padrão ou NativeWind (Tailwind).
- **Ícones:** Lucide-React-Native ou Ionicons.
- **Dados:** JSON estático local (Mock Data) simulando uma API.

## 3. Identidade Visual
- **Estilo:** Corporativo, Limpo, Seguro.
- **Cor Primária (Brand):** #0056D2 (Azul Institucional).
- **Cor Secundária:** #F4F6F8 (Fundo Cinza Claro).
- **Cor de Erro:** #D32F2F (Para validação de RS inválido).
- **Cor de Sucesso:** #2E7D32 (Para voto confirmado).

## 4. Fluxos e Telas Principais

### A. Autenticação (Login)
- **Campos:** E-mail, Senha, **Número de Registro (RS)**.
- **Lógica de Negócio:**
  - O sistema deve validar o "RS".
  - Se RS for inválido (ex: "0000"), exibir mensagem de erro vermelha: "Registro não encontrado na base oficial. Contate a secretaria."
  - Se válido, permitir login.
- **Restrição Apple Store:** Não deve haver botão de "Cadastrar" (cadastro é restrito à secretaria).

### B. Home (Dashboard)
- Resumo do Usuário (Nome, Status da Mensalidade).
- Cards de Acesso Rápido: "Votar em Pautas", "Falar com Jurídico", "Clube de Vantagens".
- Lista horizontal de "Últimas Notícias".

### C. Governança (Pautas e Votação)
- **Lista de Pautas:** Mostra pautas "Abertas" e "Encerradas".
- **Detalhe da Pauta:**
  - Título, Descrição longa, Link para PDF (fictício), Vídeo embedado (placeholder).
  - **Abas:** "Detalhes", "Votação", "Chat da Pauta".
  - **Ação de Votar:** Botões grandes "A Favor", "Contra", "Abster".
  - **Lógica:** Ao clicar, exibir `Alert` confirmando o voto e bloquear novos votos.

### D. Chat Jurídico (Privado)
- Lista de chamados abertos.
- Tela de Chat (estilo WhatsApp/Messenger).
- Diferenciação visual entre mensagens do "Usuário" (direita, azul) e do "Advogado" (esquerda, cinza).

## 5. Estrutura de Dados (Interfaces TypeScript)

Use estas interfaces para criar os mocks:

```typescript
interface User {
  id: string;
  name: string;
  rs_registro: string; // Chave de validação
  plan: 'Bronze' | 'Silver' | 'Gold';
  status: 'active' | 'delinquent';
}

interface Pauta {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  open_until: string; // Data ISO
  video_url?: string;
  pdf_url?: string;
  votes_count: { favor: number; against: number; abstain: number };
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'lawyer' | 'system';
  timestamp: string;
}