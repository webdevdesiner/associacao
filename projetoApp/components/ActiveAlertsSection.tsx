import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import type { MockPushNotification } from '@/constants/mockNotifications';

type Props = {
  notifications: MockPushNotification[];
  onPress: (notification: MockPushNotification) => void;
};

export function ActiveAlertsSection({ notifications, onPress }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (notifications.length === 0) return null;

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        activeOpacity={0.75}
        onPress={() => setExpanded((prev) => !prev)}
        accessibilityLabel={
          expanded
            ? 'Recolher notificações push'
            : 'Expandir notificações push'
        }
      >
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.sectionTitle}>Notificações Push (Ativas)</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{notifications.length}</Text>
          </View>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={Colors.textSecondary}
          />
        </View>
      </TouchableOpacity>

      {expanded &&
        notifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.alertCard}
            activeOpacity={0.75}
            onPress={() => onPress(item)}
          >
            <View
              style={[
                styles.alertIcon,
                item.type === 'pauta' ? styles.alertIconPauta : styles.alertIconJuridico,
              ]}
            >
              <Ionicons
                name={item.type === 'pauta' ? 'megaphone-outline' : 'briefcase-outline'}
                size={20}
                color={item.type === 'pauta' ? '#E65100' : Colors.primary}
              />
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertBody}>{item.body}</Text>
              <Text style={styles.alertMeta}>
                {item.timeLabel} · Toque para abrir
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  countBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginTop: 10,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertIconPauta: {
    backgroundColor: '#FFF3E0',
  },
  alertIconJuridico: {
    backgroundColor: '#E3F2FD',
  },
  alertContent: {
    flex: 1,
  },
  alertBody: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
  },
  alertMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
