import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BrandGradient } from '@/constants/Colors';
import { getLoginError, validateLogin } from '@/constants/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rs, setRs] = useState('');
  const [erro, setErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setErro('');

    if (!email.trim() || !senha.trim() || !rs.trim()) {
      setErro('Preencha todos os campos.');
      setIsLoading(false);
      return;
    }

    const loginError = getLoginError(rs, senha);
    if (loginError) {
      setErro(loginError);
      setIsLoading(false);
      return;
    }

    const user = validateLogin(rs, senha);
    if (!user) {
      setErro('RS ou senha incorretos.');
      setIsLoading(false);
      return;
    }

    login(user);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)/');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={[...BrandGradient.colors]}
          start={BrandGradient.start}
          end={BrandGradient.end}
          style={styles.logoBox}
        >
          <Ionicons name="shield-checkmark" size={48} color={Colors.white} />
        </LinearGradient>
        <Text style={styles.title}>Associação Digital</Text>
        <Text style={styles.subtitle}>
          Acesso exclusivo para associados
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="••••••"
            placeholderTextColor={Colors.textSecondary}
            secureTextEntry
          />

          <Text style={styles.label}>Número de Registro (RS)</Text>
          <TextInput
            style={styles.input}
            value={rs}
            onChangeText={setRs}
            placeholder="Ex: 9999999999"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="number-pad"
          />

          {erro ? (
            <View style={styles.erroBox}>
              <Ionicons name="alert-circle" size={18} color={Colors.error} />
              <Text style={styles.erroText}>{erro}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.buttonWrap}
          >
            <LinearGradient
              colors={[...BrandGradient.colors]}
              start={BrandGradient.start}
              end={BrandGradient.end}
              style={styles.button}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.hint}>
            Fernando: RS 9999999999 · senha 123456
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  form: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  erroBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  erroText: {
    flex: 1,
    fontSize: 14,
    color: Colors.error,
    fontWeight: '500',
  },
  buttonWrap: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
  hint: {
    marginTop: 16,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
