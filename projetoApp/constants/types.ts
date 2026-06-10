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

export interface MockAccount extends User {
  email: string;
  password: string;
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

export interface ChatAttachment {
  name: string;
  uri: string;
  mimeType?: string | null;
  size?: number | null;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'lawyer' | 'system';
  timestamp: string;
  attachment?: ChatAttachment;
}

export interface Chamado {
  id: string;
  lawyerName: string;
  lastMessage: string;
  lastMessageAt: string;
}
