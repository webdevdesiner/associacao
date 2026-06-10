import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { BrandGradient, Colors } from '@/constants/Colors';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function BrandGradientView({ style, children }: Props) {
  return (
    <LinearGradient
      colors={[...BrandGradient.colors]}
      start={BrandGradient.start}
      end={BrandGradient.end}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}

export function HeaderGradientBackground() {
  return <BrandGradientView style={StyleSheet.absoluteFillObject} />;
}

/** Opções do Stack com header azul — evita header transparente no celular. */
export function getGradientStackScreenOptions() {
  const isWeb = Platform.OS === 'web';

  return {
    headerBackground: () => <HeaderGradientBackground />,
    headerStyle: {
      backgroundColor: isWeb ? 'transparent' : Colors.primary,
    },
    headerTintColor: '#FFFFFF',
    headerTitleStyle: { fontWeight: '600' as const },
    headerShadowVisible: false,
    statusBarStyle: 'light' as const,
  };
}
