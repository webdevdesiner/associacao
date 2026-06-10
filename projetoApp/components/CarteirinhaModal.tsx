import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import type { User } from '@/constants/types';

type Props = {
  visible: boolean;
  user: User;
  onClose: () => void;
};

export function CarteirinhaModal({ visible, user, onClose }: Props) {
  const qrPayload = `associacao://membro/${user.id}?rs=${user.rs_registro}&status=${user.status}`;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>

          <Text style={styles.title}>Carteirinha Digital</Text>
          <Text style={styles.subtitle}>
            Apresente este QR para validar sua associação
          </Text>

          <View style={styles.qrBox}>
            <Ionicons name="qr-code" size={120} color={Colors.primary} />
            <Text style={styles.qrCode}>{user.rs_registro}</Text>
          </View>

          <Text style={styles.nome}>{user.name}</Text>
          <Text style={styles.info}>RS {user.rs_registro} · Plano {user.plan}</Text>
          <Text style={styles.payload} numberOfLines={2}>
            {qrPayload}
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  qrBox: {
    width: 180,
    height: 180,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    marginBottom: 16,
  },
  qrCode: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  info: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  payload: {
    marginTop: 12,
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
