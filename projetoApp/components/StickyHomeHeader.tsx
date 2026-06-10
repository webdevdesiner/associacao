import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppMenu } from '@/components/AppMenu';
import { UserAvatar } from '@/components/UserAvatar';
import { Colors } from '@/constants/Colors';

type Props = {
  userId: string;
  userName: string;
  firstName: string;
  notificationCount: number;
  onNotificationPress: () => void;
  onAvatarPress: () => void;
};

export function StickyHomeHeader({
  userId,
  userName,
  firstName,
  notificationCount,
  onNotificationPress,
  onAvatarPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top + 8,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.greeting} numberOfLines={1}>
          Olá, {firstName}
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.notificationBell}
            activeOpacity={0.7}
            onPress={onNotificationPress}
            accessibilityLabel="Ver notificações push"
          >
            <Ionicons name="notifications" size={22} color={Colors.primary} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onAvatarPress}
            accessibilityLabel="Abrir cadastro do associado"
          >
            <UserAvatar userId={userId} name={userName} size="small" />
          </TouchableOpacity>
          <AppMenu />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 50,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  greeting: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  notificationBell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },
});
