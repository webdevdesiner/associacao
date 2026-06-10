import type { MockAccount, Pauta, ChatMessage, Chamado } from '@/constants/types';

/**
 * Mock Data - Dados fictícios para protótipo
 * Baseado nas interfaces do CONTEXT.md
 */

export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    id: 'user-001',
    name: 'Maria da Silva',
    rs_registro: '12345',
    plan: 'Gold',
    status: 'active',
    email: 'maria@email.com',
    password: '123456',
  },
  {
    id: 'user-002',
    name: 'Fernando de Oliveira Guedes',
    rs_registro: '9999999999',
    plan: 'Gold',
    status: 'active',
    email: 'fernando@email.com',
    password: '123456',
  },
];

/** @deprecated Use useAuth() para o usuário logado */
export const MOCK_USER = MOCK_ACCOUNTS[0];

export const MOCK_PAUTAS: Pauta[] = [
  {
    id: 'pauta-001',
    title: 'Reforma do Estatuto Social',
    description:
      'Proposta de alteração nos artigos 15 a 22 do Estatuto Social, referente aos direitos e deveres dos associados. A reforma visa modernizar o regimento interno e adequar às novas exigências legais.',
    status: 'open',
    open_until: '2025-03-15T23:59:59.000Z',
    video_url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
    pdf_url: 'assets/pautas/pauta-reforma-estatuto.pdf',
    votes_count: { favor: 42, against: 8, abstain: 5 },
  },
  {
    id: 'pauta-002',
    title: 'Aprovação do Orçamento 2025',
    description:
      'Discussão e votação do orçamento anual da associação para o exercício de 2025. Inclui investimentos em infraestrutura e ampliação dos benefícios aos associados.',
    status: 'open',
    open_until: '2025-02-28T23:59:59.000Z',
    pdf_url: 'assets/pautas/aprovacao-orcamento-2025-pauta.pdf',
    votes_count: { favor: 38, against: 12, abstain: 3 },
  },
  {
    id: 'pauta-003',
    title: 'Eleição da Nova Diretoria',
    description:
      'Processo eleitoral para escolha dos novos membros da diretoria executiva para o biênio 2025-2027. Candidatos apresentarão propostas em assembleia prévia.',
    status: 'closed',
    open_until: '2024-12-10T23:59:59.000Z',
    video_url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    pdf_url: 'https://example.com/edital-eleicao.pdf',
    votes_count: { favor: 120, against: 15, abstain: 10 },
  },
];

/** Chamados fictícios para o Atendimento Jurídico */
export const MOCK_CHAMADOS: Chamado[] = [
  {
    id: 'chamado-001',
    lawyerName: 'Dr. Carlos',
    lastMessage: 'Chamado em análise. Retornaremos em até 48h úteis.',
    lastMessageAt: '2025-02-04T10:37:00.000Z',
  },
  {
    id: 'chamado-002',
    lawyerName: 'Dra. Ana',
    lastMessage: 'Documentos recebidos. O parecer será elaborado em breve.',
    lastMessageAt: '2025-02-03T14:20:00.000Z',
  },
];

/** Mensagens fictícias por chamado (chamadoId -> mensagens) */
export const MOCK_MENSAGENS_POR_CHAMADO: Record<string, ChatMessage[]> = {
  'chamado-001': [
    {
      id: 'msg-001',
      text: 'Olá! Gostaria de tirar dúvidas sobre minha situação tributária como associado.',
      sender: 'user',
      timestamp: '2025-02-04T10:30:00.000Z',
    },
    {
      id: 'msg-002',
      text: 'Olá, Maria! Sou o Dr. Carlos, advogado da associação. Como posso ajudá-la?',
      sender: 'lawyer',
      timestamp: '2025-02-04T10:35:00.000Z',
    },
    {
      id: 'msg-003',
      text: 'Preciso saber se posso declarar minha associação como despesa dedutível no IR.',
      sender: 'user',
      timestamp: '2025-02-04T10:36:00.000Z',
    },
    {
      id: 'msg-004',
      text: 'Chamado em análise. Retornaremos em até 48h úteis.',
      sender: 'system',
      timestamp: '2025-02-04T10:37:00.000Z',
    },
  ],
  'chamado-002': [
    {
      id: 'msg-101',
      text: 'Boa tarde. Preciso de orientação sobre contrato de prestação de serviços.',
      sender: 'user',
      timestamp: '2025-02-03T09:00:00.000Z',
    },
    {
      id: 'msg-102',
      text: 'Boa tarde! Por favor, envie o contrato em anexo para análise.',
      sender: 'lawyer',
      timestamp: '2025-02-03T11:15:00.000Z',
    },
    {
      id: 'msg-103',
      text: 'Documentos recebidos. O parecer será elaborado em breve.',
      sender: 'lawyer',
      timestamp: '2025-02-03T14:20:00.000Z',
    },
  ],
};

/** Benefícios para associados (Clube de Vantagens) */
export const MOCK_BENEFICIOS = [
  { id: 'b1', titulo: 'Farmácia X', desconto: '10% OFF' },
  { id: 'b2', titulo: 'Posto Y', desconto: '5% OFF' },
  { id: 'b3', titulo: 'Cinema Z', desconto: 'Meia' },
  { id: 'b4', titulo: 'Academia FitPro', desconto: '20% OFF' },
  { id: 'b5', titulo: 'Restaurante Sabor & Arte', desconto: '15% OFF' },
  { id: 'b6', titulo: 'Ótica Visão Clara', desconto: '12% OFF' },
  { id: 'b7', titulo: 'Supermercado Bom Preço', desconto: '8% OFF' },
  { id: 'b8', titulo: 'Hotel Praia Azul', desconto: 'Diária -25%' },
];

/** Mensagens fictícias para o Chat Jurídico (legado - usar MOCK_MENSAGENS_POR_CHAMADO) */
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-001',
    text: 'Olá! Gostaria de tirar dúvidas sobre minha situação tributária como associado.',
    sender: 'user',
    timestamp: '2025-02-04T10:30:00.000Z',
  },
  {
    id: 'msg-002',
    text: 'Olá, Maria! Sou o Dr. Carlos, advogado da associação. Como posso ajudá-la?',
    sender: 'lawyer',
    timestamp: '2025-02-04T10:35:00.000Z',
  },
  {
    id: 'msg-003',
    text: 'Preciso saber se posso declarar minha associação como despesa dedutível no IR.',
    sender: 'user',
    timestamp: '2025-02-04T10:36:00.000Z',
  },
  {
    id: 'msg-004',
    text: 'Chamado em análise. Retornaremos em até 48h úteis.',
    sender: 'system',
    timestamp: '2025-02-04T10:37:00.000Z',
  },
];
