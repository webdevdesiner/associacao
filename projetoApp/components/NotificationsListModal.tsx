import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import type { MockPushNotification } from '@/constants/mockNotifications';

type Props = {
  visible: boolean;
  notifications: MockPushNotification[];
  onClose: () => void;
  onPress: (notification: MockPushNotification) => void;
};

export function NotificationsListModal({
  visible,
  notifications,
  onClose,
  onPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.panel, { marginTop: insets.top + 56 }]}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Ionicons name="notifications" size={22} color={Colors.primary} />
              <Text style={styles.title}>Notificações</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{notifications.length}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel="Fechar notificações"
            >
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {notifications.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.item,
                  index < notifications.length - 1 && styles.itemBorder,
                ]}
                activeOpacity={0.75}
                onPress={() => onPress(item)}
              >
                <View
                  style={[
                    styles.itemIcon,
                    item.type === 'pauta' ? styles.itemIconPauta : styles.itemIconJuridico,
                  ]}
                >
                  <Ionicons
                    name={item.type === 'pauta' ? 'megaphone-outline' : 'briefcase-outline'}
                    size={20}
                    color={item.type === 'pauta' ? '#E65100' : Colors.primary}
                  />
                </View>
                <View style={styles.itemContent}>
                  <View style={styles.itemTopRow}>
                    <Text style={styles.itemType}>
                      {item.type === 'pauta' ? 'Governança' : 'Jurídico'}
                    </Text>
                    <Text style={styles.itemTime}>{item.timeLabel}</Text>
                  </View>
                  <Text style={styles.itemBody}>{item.body}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 16,
  },
  panel: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    maxHeight: '70%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconPauta: {
    backgroundColor: '#FFF3E0',
  },
  itemIconJuridico: {
    backgroundColor: '#E3F2FD',
  },
  itemContent: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  itemType: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  itemTime: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  itemBody: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
});
