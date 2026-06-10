import { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_PAUTAS, MOCK_BENEFICIOS } from '@/constants/MockData';
import {
  MOCK_PUSH_NOTIFICATIONS,
  type MockPushNotification,
} from '@/constants/mockNotifications';
import { Colors } from '@/constants/Colors';
import { CarteirinhaModal } from '@/components/CarteirinhaModal';
import { StickyHomeHeader } from '@/components/StickyHomeHeader';
import { PushNotificationBanner } from '@/components/PushNotificationBanner';
import { NotificationsListModal } from '@/components/NotificationsListModal';
import { ActiveAlertsSection } from '@/components/ActiveAlertsSection';
import { useAuth } from '@/contexts/AuthContext';

const PUSH_INITIAL_DELAY_MS = 2500;
const PUSH_AUTO_DISMISS_MS = 6000;

function getStatusLabel(status: string): string {
  return status === 'active' ? 'Ativo' : 'Inadimplente';
}

function getBeneficioIcon(
  titulo: string,
): keyof typeof Ionicons.glyphMap {
  const lower = titulo.toLowerCase();
  if (lower.includes('farmácia') || lower.includes('farmacia')) return 'medkit';
  if (lower.includes('posto')) return 'car';
  if (lower.includes('cinema')) return 'film';
  if (lower.includes('academia') || lower.includes('fit')) return 'barbell-outline';
  if (lower.includes('restaurante')) return 'restaurant-outline';
  if (lower.includes('ótica') || lower.includes('otica')) return 'eye-outline';
  if (lower.includes('supermercado')) return 'cart-outline';
  if (lower.includes('hotel')) return 'bed-outline';
  return 'pricetag';
}

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [carteirinhaAberta, setCarteirinhaAberta] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [notificationsListVisible, setNotificationsListVisible] = useState(false);
  const pushQueueRef = useRef(MOCK_PUSH_NOTIFICATIONS);
  const temPautaAberta = MOCK_PAUTAS.some((p) => p.status === 'open');

  const currentBanner = pushQueueRef.current[bannerIndex] ?? null;

  const openNotification = useCallback(
    (notification: MockPushNotification) => {
      setBannerVisible(false);
      setNotificationsListVisible(false);
      router.push(notification.route as never);
    },
    [router],
  );

  const dismissBanner = useCallback(() => {
    setBannerVisible(false);
    const nextIndex = bannerIndex + 1;
    if (nextIndex < pushQueueRef.current.length) {
      setTimeout(() => {
        setBannerIndex(nextIndex);
        setBannerVisible(true);
      }, 800);
    }
  }, [bannerIndex]);

  useEffect(() => {
    const showTimer = setTimeout(() => setBannerVisible(true), PUSH_INITIAL_DELAY_MS);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!bannerVisible || !currentBanner) return;

    const autoDismissTimer = setTimeout(dismissBanner, PUSH_AUTO_DISMISS_MS);
    return () => clearTimeout(autoDismissTimer);
  }, [bannerVisible, currentBanner, dismissBanner]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.screen}>
      <PushNotificationBanner
        notification={currentBanner}
        visible={bannerVisible}
        onDismiss={dismissBanner}
        onPress={() => currentBanner && openNotification(currentBanner)}
      />

      <NotificationsListModal
        visible={notificationsListVisible}
        notifications={MOCK_PUSH_NOTIFICATIONS}
        onClose={() => setNotificationsListVisible(false)}
        onPress={openNotification}
      />

      <StickyHomeHeader
        userId={user.id}
        userName={user.name}
        firstName={user.name.split(' ')[0]}
        notificationCount={MOCK_PUSH_NOTIFICATIONS.length}
        onNotificationPress={() => {
          setBannerVisible(false);
          setNotificationsListVisible(true);
        }}
        onAvatarPress={() => router.push('/(tabs)/perfil')}
      />

    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
    >
      {/* Carteirinha Digital */}
      <LinearGradient
        colors={['#D4AF37', '#8A6327']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.carteirinha}
      >
        <View style={styles.carteirinhaContent}>
          <Text style={styles.carteirinhaNome}>{user.name}</Text>
          <Text style={styles.carteirinhaRS}>RS {user.rs_registro}</Text>
          <Text style={styles.carteirinhaPlano}>Plano {user.plan}</Text>
          <View
            style={[
              styles.statusTag,
              user.status === 'active' ? styles.statusAtivo : styles.statusInadimplente,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                user.status === 'active' ? styles.statusTextAtivo : styles.statusTextInadimplente,
              ]}
            >
              Status: {getStatusLabel(user.status)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.qrIcon}
          activeOpacity={0.7}
          onPress={() => setCarteirinhaAberta(true)}
          accessibilityLabel="Abrir carteirinha digital"
        >
          <Ionicons name="qr-code-outline" size={40} color="rgba(255,255,255,0.95)" />
        </TouchableOpacity>
      </LinearGradient>

      <CarteirinhaModal
        visible={carteirinhaAberta}
        user={user}
        onClose={() => setCarteirinhaAberta(false)}
      />

      <ActiveAlertsSection
        notifications={MOCK_PUSH_NOTIFICATIONS}
        onPress={openNotification}
      />

      {/* Atalhos Rápidos */}
      <Text style={styles.sectionTitle}>Atalhos Rápidos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.atalhosScroll}
      >
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
        <TouchableOpacity
          style={[styles.atalhoCard, styles.atalhoCardRoadmap]}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              'Em breve',
              'Este módulo está previsto para a próxima fase de desenvolvimento do app.',
            )
          }
        >
          <Ionicons name="wallet-outline" size={28} color={Colors.primary} />
          <Text style={styles.atalhoTexto}>Financeiro</Text>
          <Text style={styles.atalhoEmBreve}>Em breve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.atalhoCard, styles.atalhoCardRoadmap]}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              'Em breve',
              'Este módulo está previsto para a próxima fase de desenvolvimento do app.',
            )
          }
        >
          <Ionicons name="calendar-outline" size={28} color={Colors.primary} />
          <Text style={styles.atalhoTexto}>Eventos</Text>
          <Text style={styles.atalhoEmBreve}>Em breve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.atalhoCard, styles.atalhoCardRoadmap]}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              'Em breve',
              'Este módulo está previsto para a próxima fase de desenvolvimento do app.',
            )
          }
        >
          <Ionicons name="school-outline" size={28} color={Colors.primary} />
          <Text style={styles.atalhoTexto}>Cursos EAD</Text>
          <Text style={styles.atalhoEmBreve}>Em breve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.atalhoCard, styles.atalhoCardRoadmap]}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              'Em breve',
              'Este módulo está previsto para a próxima fase de desenvolvimento do app.',
            )
          }
        >
          <Ionicons name="megaphone-outline" size={28} color={Colors.primary} />
          <Text style={styles.atalhoTexto}>Classificados</Text>
          <Text style={styles.atalhoEmBreve}>Em breve</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Clube de Vantagens */}
      <View style={styles.beneficiosSectionHeader}>
        <Text style={styles.beneficiosSectionTitle}>Benefícios para Associados</Text>
        <TouchableOpacity activeOpacity={0.7} accessibilityLabel="Ver todos os benefícios">
          <Text style={styles.verTodosLink}>Ver todos {'>'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.beneficiosScroll}
      >
        {MOCK_BENEFICIOS.map((beneficio) => (
          <View key={beneficio.id} style={styles.beneficioCard}>
            <Ionicons
              name={getBeneficioIcon(beneficio.titulo)}
              size={28}
              color={Colors.primary}
            />
            <Text style={styles.beneficioTitulo} numberOfLines={2}>
              {beneficio.titulo}
            </Text>
            <View style={styles.descontoBadge}>
              <Text style={styles.descontoBadgeText}>{beneficio.desconto}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  content: {
    padding: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  carteirinha: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#8A6327',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
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
  atalhosScroll: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 4,
    paddingBottom: 4,
    marginBottom: 28,
  },
  atalhoCard: {
    width: 150,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  atalhoCardRoadmap: {
    opacity: 0.7,
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
  atalhoEmBreve: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  beneficiosSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  beneficiosSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  verTodosLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  beneficiosScroll: {
    flexDirection: 'row',
    gap: 14,
    paddingRight: 4,
    paddingBottom: 4,
  },
  beneficioCard: {
    width: 140,
    minHeight: 136,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  beneficioTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 10,
    lineHeight: 18,
  },
  descontoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  descontoBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
  },
});
