import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export function HeaderBackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={styles.btn}
      accessibilityLabel="Voltar"
    >
      <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

export function HeaderHomeButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.replace('/(tabs)/')}
      style={styles.btn}
      accessibilityLabel="Início"
    >
      <Ionicons name="home-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
