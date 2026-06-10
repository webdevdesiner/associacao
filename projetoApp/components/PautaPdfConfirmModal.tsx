import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { openPautaPdf } from '@/constants/pautaAssets';

type Props = {
  visible: boolean;
  pautaId: string;
  pautaTitle: string;
  pdfFileName: string;
  onClose: () => void;
};

export function PautaPdfConfirmModal({
  visible,
  pautaId,
  pautaTitle,
  pdfFileName,
  onClose,
}: Props) {
  const [opening, setOpening] = useState(false);

  const handleOpen = async () => {
    setOpening(true);
    try {
      await openPautaPdf(pautaId);
      onClose();
    } finally {
      setOpening(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <View style={styles.iconWrap}>
            <Ionicons name="document-text" size={40} color={Colors.primary} />
          </View>

          <Text style={styles.title}>Documento PDF disponível</Text>
          <Text style={styles.pautaName}>{pautaTitle}</Text>

          <View style={styles.fileBox}>
            <Ionicons name="attach-outline" size={18} color={Colors.textSecondary} />
            <Text style={styles.fileName} numberOfLines={2}>
              {pdfFileName}
            </Text>
          </View>

          <Text style={styles.message}>
            Há um documento PDF vinculado a esta pauta. Deseja abrir e visualizar
            agora?
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              disabled={opening}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Agora não</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={handleOpen}
              disabled={opening}
              activeOpacity={0.8}
            >
              {opening ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Text style={styles.openText}>Abrir PDF</Text>
              )}
            </TouchableOpacity>
          </View>
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
    maxWidth: 340,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  pautaName: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  fileName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  openButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  openText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});
