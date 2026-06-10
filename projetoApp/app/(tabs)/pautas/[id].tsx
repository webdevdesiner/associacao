import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_PAUTAS } from '@/constants/MockData';
import { hasPautaPdf, getPautaPdfLabel } from '@/constants/pautaAssets';
import { hasPautaVideo } from '@/constants/pautaVideos';
import { PautaVideoModal } from '@/components/PautaVideoModal';
import { PautaPdfConfirmModal } from '@/components/PautaPdfConfirmModal';
import { Colors } from '@/constants/Colors';
import { useStackContentPadding } from '@/hooks/useStackContentPadding';

export default function PautaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contentPaddingTop = useStackContentPadding(20);
  const [hasVoted, setHasVoted] = useState(false);
  const [votoPendente, setVotoPendente] = useState<string | null>(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [pdfModalVisible, setPdfModalVisible] = useState(false);

  const pauta = MOCK_PAUTAS.find((p) => p.id === id);
  const isOpen = pauta?.status === 'open';

  const handleVote = (opcao: string) => {
    setVotoPendente(opcao);
  };

  const confirmarVoto = () => {
    if (votoPendente) {
      setHasVoted(true);
      setVotoPendente(null);
    }
  };

  if (!pauta) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Pauta não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: contentPaddingTop }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Título e Status */}
      <Text style={styles.title}>{pauta.title}</Text>
      <View
        style={[
          styles.badge,
          isOpen ? styles.badgeOpen : styles.badgeClosed,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            isOpen ? styles.badgeTextOpen : styles.badgeTextClosed,
          ]}
        >
          {isOpen ? 'Aberta' : 'Encerrada'}
        </Text>
      </View>

      {/* Descrição */}
      <Text style={styles.description}>{pauta.description}</Text>

      {/* Placeholders Vídeo e PDF */}
      <View style={styles.mediaRow}>
        <TouchableOpacity
          style={[
            styles.mediaPlaceholder,
            hasPautaVideo(pauta.id) && styles.mediaPlaceholderActive,
          ]}
          activeOpacity={hasPautaVideo(pauta.id) ? 0.7 : 1}
          disabled={!hasPautaVideo(pauta.id)}
          onPress={() => setVideoModalVisible(true)}
        >
          <Ionicons
            name="videocam-outline"
            size={32}
            color={hasPautaVideo(pauta.id) ? Colors.primary : Colors.textSecondary}
          />
          <Text
            style={[
              styles.mediaLabel,
              hasPautaVideo(pauta.id) && styles.mediaLabelActive,
            ]}
          >
            {hasPautaVideo(pauta.id) ? 'Assistir vídeo' : 'Vídeo'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mediaPlaceholder,
            hasPautaPdf(pauta.id) && styles.mediaPlaceholderActive,
          ]}
          activeOpacity={hasPautaPdf(pauta.id) ? 0.7 : 1}
          disabled={!hasPautaPdf(pauta.id)}
          onPress={() => setPdfModalVisible(true)}
        >
          <Ionicons
            name="document-text-outline"
            size={32}
            color={hasPautaPdf(pauta.id) ? Colors.primary : Colors.textSecondary}
          />
          <Text
            style={[
              styles.mediaLabel,
              hasPautaPdf(pauta.id) && styles.mediaLabelActive,
            ]}
          >
            {hasPautaPdf(pauta.id) ? 'Abrir PDF' : 'PDF'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Área de Votação */}
      <View style={styles.votingSection}>
        {!isOpen ? (
          <View style={styles.closedBox}>
            <Ionicons name="lock-closed-outline" size={40} color={Colors.textSecondary} />
            <Text style={styles.closedText}>Votação Encerrada</Text>
          </View>
        ) : hasVoted ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={40} color={Colors.success} />
            <Text style={styles.successText}>Você já votou nesta pauta</Text>
          </View>
        ) : (
          <>
            <Text style={styles.votingTitle}>Sua votação</Text>
            <TouchableOpacity
              style={[styles.voteButton, styles.voteFavor]}
              activeOpacity={0.8}
              onPress={() => handleVote('A Favor')}
            >
              <Text style={styles.voteButtonText}>A Favor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.voteButton, styles.voteContra]}
              activeOpacity={0.8}
              onPress={() => handleVote('Contra')}
            >
              <Text style={styles.voteButtonText}>Contra</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.voteButton, styles.voteAbster]}
              activeOpacity={0.8}
              onPress={() => handleVote('Abster')}
            >
              <Text style={[styles.voteButtonText, styles.voteAbsterText]}>
                Abster
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <PautaVideoModal
        visible={videoModalVisible}
        title={pauta.title}
        pautaId={pauta.id}
        onClose={() => setVideoModalVisible(false)}
      />

      {hasPautaPdf(pauta.id) && (
        <PautaPdfConfirmModal
          visible={pdfModalVisible}
          pautaId={pauta.id}
          pautaTitle={pauta.title}
          pdfFileName={getPautaPdfLabel(pauta.id) ?? 'documento.pdf'}
          onClose={() => setPdfModalVisible(false)}
        />
      )}

      <Modal
        visible={votoPendente !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setVotoPendente(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVotoPendente(null)}
        >
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Ionicons name="checkmark-circle" size={48} color={Colors.success} />
            <Text style={styles.modalTitle}>Voto Confirmado!</Text>
            <Text style={styles.modalText}>
              Você votou {votoPendente}.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={confirmarVoto}
              activeOpacity={0.8}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    lineHeight: 32,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 20,
  },
  badgeOpen: {
    backgroundColor: '#E8F5E9',
  },
  badgeClosed: {
    backgroundColor: '#EEEEEE',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  badgeTextOpen: {
    color: Colors.success,
  },
  badgeTextClosed: {
    color: Colors.textSecondary,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  mediaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  mediaPlaceholder: {
    flex: 1,
    height: 100,
    backgroundColor: Colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaPlaceholderActive: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  mediaLabel: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  mediaLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  votingSection: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  votingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  voteButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  voteFavor: {
    backgroundColor: Colors.success,
  },
  voteContra: {
    backgroundColor: Colors.error,
  },
  voteAbster: {
    backgroundColor: Colors.border,
    marginBottom: 0,
  },
  voteButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.white,
  },
  voteAbsterText: {
    color: Colors.text,
  },
  closedBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  closedText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.success,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 12,
  },
  modalText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});
