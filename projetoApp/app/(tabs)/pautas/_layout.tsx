import { Stack } from 'expo-router';
import { HeaderBackButton, HeaderHomeButton } from '@/components/HeaderButtons';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function PautasLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#0056D2' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Pautas e Votação' }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalhe da Pauta',
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderHomeButton />,
        }}
      />
    </Stack>
  );
}
