import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { HeaderBackButton, HeaderHomeButton } from '@/components/HeaderButtons';
import { HeaderMenuButton } from '@/components/HeaderMenuButton';
import { getGradientStackScreenOptions } from '@/components/BrandGradient';

export const unstable_settings = {
  initialRouteName: 'index',
};

function HeaderNavActions() {
  return (
    <View style={styles.navActions}>
      <HeaderHomeButton />
      <HeaderMenuButton />
    </View>
  );
}

const styles = StyleSheet.create({
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function PautasLayout() {
  return (
    <Stack screenOptions={getGradientStackScreenOptions()}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Pautas e Votação',
          headerRight: () => <HeaderMenuButton />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalhe da Pauta',
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderNavActions />,
        }}
      />
    </Stack>
  );
}
