import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Altura da toolbar do header nativo (abaixo da status bar). */
const STACK_HEADER_TOOLBAR = 56;

/**
 * Padding superior para telas dentro de Stack com header nativo.
 * Na web mantém só o espaçamento base; no celular compensa status bar + toolbar.
 */
export function useStackContentPadding(base = 16): number {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'web') {
    return base;
  }

  return insets.top + STACK_HEADER_TOOLBAR + base;
}

/**
 * Apenas o deslocamento do header (sem padding extra de conteúdo).
 */
export function useStackHeaderOffset(): number {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'web') {
    return 0;
  }

  return insets.top + STACK_HEADER_TOOLBAR;
}
