import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  enabled?: boolean;
};

export function AppMenu({ compact = false }: { compact?: boolean }) {
  const [aberto, setAberto] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    setAberto(false);
    logout();
    router.replace('/login');
  };

  const itens: MenuItem[] = [
    {
      id: 'logout',
      label: 'Sair',
      icon: 'log-out-outline',
      onPress: handleLogout,
      enabled: true,
    },
  ];

  return (
    <>
      <TouchableOpacity
        style={[styles.trigger, compact && styles.triggerCompact]}
        onPress={() => setAberto(true)}
        accessibilityLabel="Abrir menu"
        activeOpacity={0.7}
      >
        <Ionicons
          name="menu"
          size={26}
          color={compact ? '#FFFFFF' : Colors.text}
        />
      </TouchableOpacity>

      <Modal
        visible={aberto}
        transparent
        animationType="fade"
        onRequestClose={() => setAberto(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setAberto(false)}>
          <Pressable style={styles.menu} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.menuTitle}>Menu</Text>
            <Text style={styles.menuSubtitle}>
              Novas opções serão adicionadas aqui
            </Text>

            {itens.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  !item.enabled && styles.menuItemDisabled,
                ]}
                onPress={item.enabled ? item.onPress : undefined}
                disabled={!item.enabled}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.enabled ? Colors.primary : Colors.textSecondary}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    !item.enabled && styles.menuItemTextDisabled,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  triggerCompact: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    width: 40,
    height: 40,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 56,
    paddingRight: 20,
  },
  menu: {
    width: 240,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  menuItemTextDisabled: {
    color: Colors.textSecondary,
  },
});
