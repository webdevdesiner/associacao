import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BrandGradient } from '@/constants/Colors';
import { getAccountByUser } from '@/constants/auth';
import { UserAvatar } from '@/components/UserAvatar';
import { useAuth } from '@/contexts/AuthContext';

function getStatusLabel(status: string): string {
  return status === 'active' ? 'Ativo' : 'Inadimplente';
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

export default function PerfilScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const account = user ? getAccountByUser(user) : undefined;

  if (!user || !account) {
    return null;
  }

  const isGold = user.plan === 'Gold';

  return (
    <View style={styles.screen}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Meu Cadastro</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={isGold ? ['#D4AF37', '#8A6327'] : [...BrandGradient.colors]}
          start={BrandGradient.start}
          end={BrandGradient.end}
          style={styles.profileHero}
        >
          <UserAvatar userId={user.id} name={user.name} size="large" />
          <Text style={styles.heroName}>{user.name}</Text>
          <Text style={styles.heroPlan}>Plano {user.plan}</Text>
        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Dados do Associado</Text>
          <Text style={styles.sectionHint}>
            Informações fictícias para simulação do protótipo
          </Text>

          <Field label="Nome completo" value={account.name} />
          <Field label="E-mail" value={account.email} />
          <Field label="Número de Registro (RS)" value={account.rs_registro} />
          <Field label="Plano" value={account.plan} />
          <Field label="Status" value={getStatusLabel(account.status)} />
          <Field label="ID do associado" value={account.id} />
          <Field label="Senha (simulação)" value={account.password} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.secondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 40,
    height: 40,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  profileHero: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
  },
  heroPlan: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  sectionHint: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 22,
  },
});
