import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_CHAMADOS } from '@/constants/MockData';
import type { Chamado } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import { BrandGradientView } from '@/components/BrandGradient';

function getIniciais(name: string): string {
  const partes = name
    .replace(/^(Dr\.|Dra\.)\s*/i, '')
    .trim()
    .split(/\s+/);
  if (partes.length >= 2) {
    return (partes[0][0] + partes[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatarDataHora(iso: string): string {
  const d = new Date(iso);
  const hoje = new Date();
  const ontem = new Date(hoje);
  ontem.setDate(ontem.getDate() - 1);

  if (d.toDateString() === hoje.toDateString()) {
    return d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  if (d.toDateString() === ontem.toDateString()) {
    return 'Ontem';
  }
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
}

function ChamadoItem({ item }: { item: Chamado }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() => router.push(`/(tabs)/juridico/${item.id}`)}
    >
      <BrandGradientView style={styles.avatar}>
        <Text style={styles.avatarText}>{getIniciais(item.lawyerName)}</Text>
      </BrandGradientView>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.nome} numberOfLines={1}>
            {item.lawyerName}
          </Text>
          <Text style={styles.hora}>{formatarDataHora(item.lastMessageAt)}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={Colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

export default function JuridicoListScreen() {
  const router = useRouter();

  const renderItem: ListRenderItem<Chamado> = ({ item }) => (
    <ChamadoItem item={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CHAMADOS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={styles.fabWrap}
      >
        <BrandGradientView style={styles.fab}>
          <Ionicons name="add" size={28} color={Colors.white} />
        </BrandGradientView>
      </TouchableOpacity>
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
    paddingBottom: 100,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 68,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  content: {
    flex: 1,
    marginLeft: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  hora: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  fabWrap: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
