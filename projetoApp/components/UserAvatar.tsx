import { View, Text, Image, StyleSheet, type ViewStyle } from 'react-native';
import { BrandGradientView } from '@/components/BrandGradient';
import { Colors } from '@/constants/Colors';
import { getUserAvatar } from '@/constants/userAvatars';

type Size = 'small' | 'large';

type Props = {
  userId: string;
  name: string;
  size?: Size;
  style?: ViewStyle;
};

function getIniciais(name: string): string {
  const partes = name.trim().split(/\s+/);
  if (partes.length >= 2) {
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const SIZES: Record<Size, { box: number; font: number; border: number }> = {
  small: { box: 44, font: 16, border: 0 },
  large: { box: 88, font: 32, border: 2 },
};

export function UserAvatar({ userId, name, size = 'small', style }: Props) {
  const photo = getUserAvatar(userId);
  const { box, font, border } = SIZES[size];

  if (photo) {
    return (
      <Image
        source={photo}
        style={[
          styles.photo,
          {
            width: box,
            height: box,
            borderRadius: box / 2,
            borderWidth: border,
          },
          style,
        ]}
        accessibilityLabel={`Foto de ${name}`}
      />
    );
  }

  return (
    <BrandGradientView
      style={[
        styles.initialsBox,
        size === 'large' && styles.initialsBoxLarge,
        { width: box, height: box, borderRadius: box / 2 },
        style,
      ]}
    >
      <Text style={[styles.initialsText, { fontSize: font }]}>
        {getIniciais(name)}
      </Text>
    </BrandGradientView>
  );
}

const styles = StyleSheet.create({
  photo: {
    borderColor: 'rgba(255,255,255,0.5)',
  },
  initialsBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsBoxLarge: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  initialsText: {
    fontWeight: '700',
    color: Colors.white,
  },
});
