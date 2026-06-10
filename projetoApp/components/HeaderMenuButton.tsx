import { View, StyleSheet } from 'react-native';
import { AppMenu } from '@/components/AppMenu';

export function HeaderMenuButton() {
  return (
    <View style={styles.wrap}>
      <AppMenu compact />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginRight: 4,
  },
});
