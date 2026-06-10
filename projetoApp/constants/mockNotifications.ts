export type PushNotificationType = 'pauta' | 'juridico';

export interface MockPushNotification {
  id: string;
  title: string;
  body: string;
  type: PushNotificationType;
  route: string;
  timeLabel: string;
  pautaId?: string;
}

export const MOCK_PUSH_NOTIFICATIONS: MockPushNotification[] = [
  {
    id: 'push-001',
    title: 'Associação Digital',
    body: 'Atenção: A votação do Orçamento encerra em 2 horas!',
    type: 'pauta',
    route: '/(tabs)/pautas/pauta-002',
    pautaId: 'pauta-002',
    timeLabel: 'agora',
  },
  {
    id: 'push-002',
    title: 'Associação Digital',
    body: 'O Departamento Jurídico respondeu seu chamado.',
    type: 'juridico',
    route: '/(tabs)/juridico/chamado-001',
    timeLabel: 'há 5 min',
  },
];
