import { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors, BrandGradient } from '@/constants/Colors';
import { BrandGradientView } from '@/components/BrandGradient';
import type { MockPushNotification } from '@/constants/mockNotifications';

type Props = {
  notification: MockPushNotification | null;
  visible: boolean;
  onDismiss: () => void;
  onPress: () => void;
};

export function PushNotificationBanner({
  notification,
  visible,
  onDismiss,
  onPress,
}: Props) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && notification) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 18,
          stiffness: 220,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, notification, translateY, opacity]);

  if (!notification) return null;

  const iconName =
    notification.type === 'pauta' ? 'document-text' : 'chatbubble-ellipses';

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.wrapper,
        {
          top: insets.top + 8,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.banner}>
        <Pressable style={styles.pressableArea} onPress={onPress}>
          <View style={styles.iconBox}>
            <BrandGradientView style={styles.iconBoxGradient}>
              <Ionicons name="shield-checkmark" size={22} color={Colors.white} />
            </BrandGradientView>
          </View>
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.appName}>{notification.title}</Text>
              <Text style={styles.time}>{notification.timeLabel}</Text>
            </View>
            <Text style={styles.body} numberOfLines={2}>
              {notification.body}
            </Text>
            <View style={styles.typeRow}>
              <Ionicons name={iconName} size={14} color={Colors.primary} />
              <Text style={styles.typeLabel}>
                {notification.type === 'pauta' ? 'Governança' : 'Jurídico'}
              </Text>
            </View>
          </View>
        </Pressable>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onDismiss}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 12,
    right: 12,
    zIndex: 100,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(1, 9, 45, 0.12)',
  },
  pressableArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
  },
  iconBoxGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    gap: 8,
  },
  appName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  body: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    fontWeight: '500',
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  closeButton: {
    padding: 2,
  },
});
