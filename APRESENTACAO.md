# Roteiro de Apresentação — Associação Digital

## Antes de começar (5 min antes)

1. Abra o terminal em `C:\dev\associacao`
2. Execute `start-web.bat` ou `npm run web` dentro de `projetoApp`
3. Abra **http://localhost:8081** no navegador (tela cheia: F11)
4. Tenha o celular com Expo Go como plano B (opcional)

## Roteiro sugerido (10–15 min)

### 1. Problema e solução (1 min)
- Associação precisa de **governança**, **comunicação jurídica** e **benefícios** em um só lugar
- App mobile com identidade institucional e acesso restrito a associados

### 2. Login e segurança (2 min)
- Mostrar campos: e-mail, senha e **RS (Registro do Associado)**
- Demonstrar RS inválido (`0000`) → mensagem de erro vermelha
- Entrar com RS `12345` → acesso liberado
- Destaque: **sem cadastro público** (regra App Store)

### 3. Home — Dashboard (2 min)
- Carteirinha digital com status (Ativo/Inadimplente)
- **Toque no QR** → modal da carteirinha (validação em parceiros/eventos)
- Atalhos: Votações Abertas e Falar com Jurídico
- Benefícios do Clube de Vantagens

### 4. Governança — Pautas e Votação (3 min)
- Aba **Pautas** → lista com status Aberta/Encerrada
- Abrir pauta aberta → descrição, vídeo/PDF (placeholders)
- Votar **A Favor** → confirmação visual
- Mostrar que voto fica bloqueado após confirmar

### 5. Jurídico — Chat (3 min)
- Aba **Jurídico** → lista de chamados estilo WhatsApp
- Abrir chat com Dra. Ana
- Enviar mensagem → resposta automática do advogado (demo)
- Mostrar botões **Voltar** e **Início** no topo

### 6. Próximos passos / visão (2 min)
- Integração com API real (MySQL + Prisma já estruturado)
- Socket.io para chat em tempo real
- Publicação nas lojas (iOS/Android)

## Credenciais de demo

| Campo | Valor |
|-------|-------|
| E-mail | maria@email.com |
| Senha | 123456 |
| RS válido | 12345 |
| RS inválido | 0000 |

## Se algo der errado

- Feche o terminal e rode `start-web.bat` novamente
- Use `Ctrl+Shift+R` no navegador para recarregar
- **Não abra o projeto pelo OneDrive** — use `C:\dev\associacao`
