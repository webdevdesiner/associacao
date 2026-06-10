import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { HeaderBackButton, HeaderHomeButton } from '@/components/HeaderButtons';
import { HeaderMenuButton } from '@/components/HeaderMenuButton';
import { getGradientStackScreenOptions } from '@/components/BrandGradient';

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

export default function JuridicoLayout() {
  return (
    <Stack screenOptions={getGradientStackScreenOptions()}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Atendimento Jurídico',
          headerRight: () => <HeaderMenuButton />,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Chat',
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderNavActions />,
        }}
      />
    </Stack>
  );
}
