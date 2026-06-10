import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  MOCK_USER,
  MOCK_PAUTAS,
  MOCK_BENEFICIOS,
} from '@/constants/MockData';
import { Colors } from '@/constants/Colors';
import { CarteirinhaModal } from '@/components/CarteirinhaModal';

function getIniciais(name: string): string {
  const partes = name.trim().split(/\s+/);
  if (partes.length >= 2) {
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getStatusLabel(status: string): string {
  return status === 'active' ? 'Ativo' : 'Inadimplente';
}

export default function HomeScreen() {
  const router = useRouter();
  const [carteirinhaAberta, setCarteirinhaAberta] = useState(false);
  const temPautaAberta = MOCK_PAUTAS.some((p) => p.status === 'open');
  const beneficioCardSize = 120;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header de Boas-vindas */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, {MOCK_USER.name.split(' ')[0]}
        </Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getIniciais(MOCK_USER.name)}</Text>
        </View>
      </View>

      {/* Carteirinha Digital */}
      <View style={styles.carteirinha}>
        <View style={styles.carteirinhaContent}>
          <Text style={styles.carteirinhaNome}>{MOCK_USER.name}</Text>
          <Text style={styles.carteirinhaRS}>RS {MOCK_USER.rs_registro}</Text>
          <Text style={styles.carteirinhaPlano}>Plano {MOCK_USER.plan}</Text>
          <View
            style={[
              styles.statusTag,
              MOCK_USER.status === 'active' ? styles.statusAtivo : styles.statusInadimplente,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                MOCK_USER.status === 'active' ? styles.statusTextAtivo : styles.statusTextInadimplente,
              ]}
            >
              Status: {getStatusLabel(MOCK_USER.status)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.qrIcon}
          activeOpacity={0.7}
          onPress={() => setCarteirinhaAberta(true)}
          accessibilityLabel="Abrir carteirinha digital"
        >
          <Ionicons name="qr-code-outline" size={40} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
      </View>

      <CarteirinhaModal
        visible={carteirinhaAberta}
        user={MOCK_USER}
        onClose={() => setCarteirinhaAberta(false)}
      />

      {/* Atalhos Rápidos */}
      <Text style={styles.sectionTitle}>Atalhos Rápidos</Text>
      <View style={styles.atalhosGrid}>
        <TouchableOpacity
          style={styles.atalhoCard}
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/pautas/')}
        >
          {temPautaAberta && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>!</Text>
            </View>
          )}
          <Ionicons name="document-text" size={28} color={Colors.primary} />
          <Text style={styles.atalhoTexto}>Votações Abertas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.atalhoCard}
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/juridico/')}
        >
          <Ionicons name="people" size={28} color={Colors.primary} />
          <Text style={styles.atalhoTexto}>Falar com Jurídico</Text>
        </TouchableOpacity>
      </View>

      {/* Clube de Vantagens */}
      <Text style={styles.sectionTitle}>Benefícios para Associados</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.beneficiosScroll}
      >
        {MOCK_BENEFICIOS.map((beneficio) => (
          <View key={beneficio.id} style={[styles.beneficioCard, { width: beneficioCardSize, height: beneficioCardSize }]}>
            <Ionicons name="pricetag" size={24} color={Colors.primary} />
            <Text style={styles.beneficioTitulo} numberOfLines={1}>
              {beneficio.titulo}
            </Text>
            <Text style={styles.beneficioDesconto}>{beneficio.desconto}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  carteirinha: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#0056D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  carteirinhaContent: {
    flex: 1,
  },
  carteirinhaNome: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  carteirinhaRS: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  carteirinhaPlano: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
  },
  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusAtivo: {
    backgroundColor: Colors.success,
  },
  statusInadimplente: {
    backgroundColor: Colors.error,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextAtivo: {
    color: Colors.white,
  },
  statusTextInadimplente: {
    color: Colors.white,
  },
  qrIcon: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  atalhosGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  atalhoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  atalhoTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  beneficiosScroll: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  beneficioCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  beneficioTitulo: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 10,
  },
  beneficioDesconto: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
});
