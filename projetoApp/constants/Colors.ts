/**
 * Paleta de cores do app - Associação Digital
 * Baseado nas especificações do CONTEXT.md
 */
export const Colors = {
  /** Azul Institucional - Cor Primária (Brand) */
  primary: '#01092D',
  /** Tom final do degradé institucional */
  primaryGradientEnd: '#112F65',
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

/** Degradé azul institucional (#01092D → #112F65) */
export const BrandGradient = {
  colors: [Colors.primary, Colors.primaryGradientEnd] as [string, string],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
} as const;

export type ColorsType = typeof Colors;
