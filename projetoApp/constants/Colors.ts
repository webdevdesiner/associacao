/**
 * Paleta de cores do app - Associação Digital
 * Baseado nas especificações do CONTEXT.md
 */
export const Colors = {
  /** Azul Institucional - Cor Primária (Brand) */
  primary: '#0056D2',
  /** Fundo Cinza Claro - Cor Secundária */
  secondary: '#F4F6F8',
  /** Validação de RS inválido / Erros */
  error: '#D32F2F',
  /** Voto confirmado / Sucesso */
  success: '#2E7D32',
  /** Texto principal */
  text: '#1A1A1A',
  /** Texto secundário */
  textSecondary: '#666666',
  /** Fundo branco */
  white: '#FFFFFF',
  /** Cinza para bordas/divisórias */
  border: '#E0E0E0',
} as const;

export type ColorsType = typeof Colors;
