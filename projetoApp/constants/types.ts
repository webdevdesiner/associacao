/**
 * Interfaces TypeScript baseadas no CONTEXT.md
 * Estrutura de dados do Ecossistema da Associação Digital
 */

export interface User {
  id: string;
  name: string;
  rs_registro: string;
  plan: 'Bronze' | 'Silver' | 'Gold';
  status: 'active' | 'delinquent';
}

export interface Pauta {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  open_until: string;
  video_url?: string;
  pdf_url?: string;
  votes_count: {
    favor: number;
    against: number;
    abstain: number;
  };
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'lawyer' | 'system';
  timestamp: string;
}

export interface Chamado {
  id: string;
  lawyerName: string;
  lastMessage: string;
  lastMessageAt: string;
}
