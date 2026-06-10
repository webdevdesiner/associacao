import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_PAUTAS } from '@/constants/MockData';
import type { Pauta } from '@/constants/types';
import { Colors } from '@/constants/Colors';

const RESUMO_LENGTH = 80;

function getResumo(description: string): string {
  if (description.length <= RESUMO_LENGTH) return description;
  return description.slice(0, RESUMO_LENGTH).trim() + '...';
}

function PautaCard({ item }: { item: Pauta }) {
  const router = useRouter();
  const isOpen = item.status === 'open';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => router.push(`/(tabs)/pautas/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View
          style={[
            styles.badge,
            isOpen ? styles.badgeOpen : styles.badgeClosed,
          ]}
        >
          <Text
            style={[styles.badgeText, isOpen ? styles.badgeTextOpen : styles.badgeTextClosed]}
          >
            {isOpen ? 'Aberta' : 'Encerrada'}
          </Text>
        </View>
      </View>
      <Text style={styles.cardResumo} numberOfLines={2}>
        {getResumo(item.description)}
      </Text>
    </TouchableOpacity>
  );
}

export default function PautasListScreen() {
  const renderItem: ListRenderItem<Pauta> = ({ item }) => (
    <PautaCard item={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_PAUTAS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  listContent: {
    padding: 16,
    paddingBottom: 24,
  },
  separator: {
    height: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeOpen: {
    backgroundColor: '#E8F5E9',
  },
  badgeClosed: {
    backgroundColor: '#EEEEEE',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  badgeTextOpen: {
    color: Colors.success,
  },
  badgeTextClosed: {
    color: Colors.textSecondary,
  },
  cardResumo: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
