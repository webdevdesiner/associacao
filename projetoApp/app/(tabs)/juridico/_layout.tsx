import { Stack } from 'expo-router';
import { HeaderBackButton, HeaderHomeButton } from '@/components/HeaderButtons';

export default function JuridicoLayout() {
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
        options={{ title: 'Atendimento Jurídico' }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Chat',
          headerLeft: () => <HeaderBackButton />,
          headerRight: () => <HeaderHomeButton />,
        }}
      />
    </Stack>
  );
}
