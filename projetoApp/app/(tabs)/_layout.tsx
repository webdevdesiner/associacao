import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0056D2',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pautas"
        options={{
          title: 'Pautas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="juridico"
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'index';
          return {
            title: 'Jurídico',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
            tabBarStyle: routeName === '[id]' ? { display: 'none' } : { backgroundColor: '#FFFFFF' },
          };
        }}
      />
    </Tabs>
  );
}
