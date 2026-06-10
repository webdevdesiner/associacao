import { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ListRenderItem,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import {
  MOCK_CHAMADOS,
  MOCK_MENSAGENS_POR_CHAMADO,
} from '@/constants/MockData';
import type { ChatAttachment, ChatMessage } from '@/constants/types';
import { Colors } from '@/constants/Colors';
import { BrandGradientView } from '@/components/BrandGradient';
import { useStackHeaderOffset } from '@/hooks/useStackContentPadding';

const RESPOSTA_TEXTO = 'Recebi sua mensagem, vou analisar.';
const RESPOSTA_ANEXO = 'Documento recebido. Vou analisar em breve.';

function formatFileSize(bytes?: number | null): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getAttachmentIcon(mimeType?: string | null, name?: string): keyof typeof Ionicons.glyphMap {
  const type = mimeType?.toLowerCase() ?? '';
  const fileName = name?.toLowerCase() ?? '';
  if (type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/.test(fileName)) {
    return 'image-outline';
  }
  if (type.includes('pdf') || fileName.endsWith('.pdf')) {
    return 'document-text-outline';
  }
  return 'document-outline';
}

function AttachmentPreview({
  attachment,
  isUser,
}: {
  attachment: ChatAttachment;
  isUser: boolean;
}) {
  return (
    <View
      style={[
        styles.attachmentCard,
        isUser ? styles.attachmentCardUser : styles.attachmentCardLawyer,
      ]}
    >
      <View
        style={[
          styles.attachmentIconBox,
          isUser ? styles.attachmentIconBoxUser : styles.attachmentIconBoxLawyer,
        ]}
      >
        <Ionicons
          name={getAttachmentIcon(attachment.mimeType, attachment.name)}
          size={22}
          color={isUser ? Colors.white : Colors.primary}
        />
      </View>
      <View style={styles.attachmentInfo}>
        <Text
          style={[
            styles.attachmentName,
            isUser ? styles.attachmentNameUser : styles.attachmentNameLawyer,
          ]}
          numberOfLines={2}
        >
          {attachment.name}
        </Text>
        {attachment.size ? (
          <Text
            style={[
              styles.attachmentSize,
              isUser ? styles.attachmentSizeUser : styles.attachmentSizeLawyer,
            ]}
          >
            {formatFileSize(attachment.size)}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function MessageBubble({ item }: { item: ChatMessage }) {
  const isUser = item.sender === 'user';
  const isSystem = item.sender === 'system';

  if (isSystem) {
    return (
      <View style={styles.systemRow}>
        <View style={styles.systemContainer}>
          <Text style={styles.systemText}>{item.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.bubbleContainer,
        isUser ? styles.bubbleContainerUser : styles.bubbleContainerLawyer,
      ]}
    >
      {isUser ? (
        <BrandGradientView
          style={[
            styles.bubble,
            styles.bubbleUser,
            item.attachment && styles.bubbleWithAttachment,
          ]}
        >
          {item.attachment ? (
            <AttachmentPreview attachment={item.attachment} isUser={isUser} />
          ) : null}
          {item.text ? (
            <Text
              style={[
                styles.bubbleText,
                styles.bubbleTextUser,
                item.attachment && styles.bubbleTextWithAttachment,
              ]}
            >
              {item.text}
            </Text>
          ) : null}
        </BrandGradientView>
      ) : (
        <View
          style={[
            styles.bubble,
            styles.bubbleLawyer,
            item.attachment && styles.bubbleWithAttachment,
          ]}
        >
          {item.attachment ? (
            <AttachmentPreview attachment={item.attachment} isUser={isUser} />
          ) : null}
          {item.text ? (
            <Text
              style={[
                styles.bubbleText,
                styles.bubbleTextLawyer,
                item.attachment && styles.bubbleTextWithAttachment,
              ]}
            >
              {item.text}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const headerOffset = useStackHeaderOffset();
  const [inputText, setInputText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState<ChatAttachment | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const chamado = MOCK_CHAMADOS.find((c) => c.id === id);
    const msgs = chamado ? MOCK_MENSAGENS_POR_CHAMADO[id!] ?? [] : [];
    return [...msgs].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  });
  const flatListRef = useRef<FlatList>(null);

  const chamado = MOCK_CHAMADOS.find((c) => c.id === id);
  const canSend = Boolean(inputText.trim() || pendingAttachment);

  const appendMessages = useCallback((newMessages: ChatMessage[]) => {
    setMessages((prev) =>
      [...prev, ...newMessages].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
    );
  }, []);

  const selecionarAnexo = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled || !result.assets?.[0]) return;

      const file = result.assets[0];
      setPendingAttachment({
        name: file.name,
        uri: file.uri,
        mimeType: file.mimeType,
        size: file.size,
      });
    } catch {
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo.');
    }
  }, []);

  const enviarMensagem = useCallback(() => {
    if (!canSend) return;

    const trimmed = inputText.trim();
    const attachment = pendingAttachment ?? undefined;

    const novaMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: trimmed || (attachment ? 'Anexo enviado' : ''),
      sender: 'user',
      timestamp: new Date().toISOString(),
      attachment,
    };

    appendMessages([novaMsg]);
    setInputText('');
    setPendingAttachment(null);

    setTimeout(() => {
      const respostaMsg: ChatMessage = {
        id: `msg-${Date.now()}-r`,
        text: attachment ? RESPOSTA_ANEXO : RESPOSTA_TEXTO,
        sender: 'lawyer',
        timestamp: new Date().toISOString(),
      };
      appendMessages([respostaMsg]);
    }, 2000);
  }, [appendMessages, canSend, inputText, pendingAttachment]);

  const renderItem: ListRenderItem<ChatMessage> = ({ item }) => (
    <MessageBubble item={item} />
  );

  if (!chamado) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Chamado não encontrado.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: headerOffset }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputArea}>
        {pendingAttachment ? (
          <View style={styles.pendingAttachment}>
            <View style={styles.pendingAttachmentInfo}>
              <Ionicons
                name={getAttachmentIcon(pendingAttachment.mimeType, pendingAttachment.name)}
                size={20}
                color={Colors.primary}
              />
              <View style={styles.pendingAttachmentText}>
                <Text style={styles.pendingAttachmentName} numberOfLines={1}>
                  {pendingAttachment.name}
                </Text>
                {pendingAttachment.size ? (
                  <Text style={styles.pendingAttachmentSize}>
                    {formatFileSize(pendingAttachment.size)}
                  </Text>
                ) : null}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setPendingAttachment(null)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityLabel="Remover anexo"
            >
              <Ionicons name="close-circle" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={selecionarAnexo}
            activeOpacity={0.7}
            accessibilityLabel="Anexar arquivo"
          >
            <Ionicons name="attach" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={Colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            onSubmitEditing={enviarMensagem}
            returnKeyType="send"
          />
          {canSend ? (
            <TouchableOpacity
              onPress={enviarMensagem}
              activeOpacity={0.7}
              style={styles.sendButtonWrap}
            >
              <BrandGradientView style={styles.sendButton}>
                <Ionicons name="send" size={22} color={Colors.white} />
              </BrandGradientView>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.sendButton, styles.sendButtonDisabled]}
              disabled
              activeOpacity={0.7}
            >
              <Ionicons name="send" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
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
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  bubbleContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bubbleContainerUser: {
    justifyContent: 'flex-end',
  },
  bubbleContainerLawyer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderBottomRightRadius: 4,
  },
  bubbleWithAttachment: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  bubbleUser: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 16,
  },
  bubbleLawyer: {
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 16,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 20,
  },
  bubbleTextWithAttachment: {
    marginTop: 8,
  },
  bubbleTextUser: {
    color: Colors.white,
  },
  bubbleTextLawyer: {
    color: Colors.text,
  },
  attachmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    padding: 10,
  },
  attachmentCardUser: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  attachmentCardLawyer: {
    backgroundColor: Colors.white,
  },
  attachmentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentIconBoxUser: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  attachmentIconBoxLawyer: {
    backgroundColor: '#E3F2FD',
  },
  attachmentInfo: {
    flex: 1,
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  attachmentNameUser: {
    color: Colors.white,
  },
  attachmentNameLawyer: {
    color: Colors.text,
  },
  attachmentSize: {
    fontSize: 12,
    marginTop: 2,
  },
  attachmentSizeUser: {
    color: 'rgba(255,255,255,0.85)',
  },
  attachmentSizeLawyer: {
    color: Colors.textSecondary,
  },
  systemRow: {
    alignItems: 'center',
    marginVertical: 8,
  },
  systemContainer: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    maxWidth: '85%',
  },
  systemText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  inputArea: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  pendingAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(1, 9, 45, 0.15)',
  },
  pendingAttachmentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginRight: 8,
  },
  pendingAttachmentText: {
    flex: 1,
  },
  pendingAttachmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  pendingAttachmentSize: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    gap: 8,
  },
  attachButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    backgroundColor: Colors.secondary,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
  },
  sendButtonWrap: {
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
  },
});
