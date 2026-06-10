import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import { BrandGradient } from '@/constants/Colors';

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
  return (
    <BrandGradientView style={StyleSheet.absoluteFill} />
  );
}
