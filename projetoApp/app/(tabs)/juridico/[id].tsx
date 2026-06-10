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
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  MOCK_CHAMADOS,
  MOCK_MENSAGENS_POR_CHAMADO,
} from '@/constants/MockData';
import type { ChatMessage } from '@/constants/types';
import { Colors } from '@/constants/Colors';

const RESPOSTA_AUTOMATICA = 'Recebi sua mensagem, vou analisar.';

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
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleLawyer,
        ]}
      >
        <Text
          style={[
            styles.bubbleText,
            isUser ? styles.bubbleTextUser : styles.bubbleTextLawyer,
          ]}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const chamado = MOCK_CHAMADOS.find((c) => c.id === id);
    const msgs = chamado ? MOCK_MENSAGENS_POR_CHAMADO[id!] ?? [] : [];
    return [...msgs].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  });
  const flatListRef = useRef<FlatList>(null);

  const chamado = MOCK_CHAMADOS.find((c) => c.id === id);

  const enviarMensagem = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const novaMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text: trimmed,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, novaMsg].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ));
    setInputText('');

    setTimeout(() => {
      const respostaMsg: ChatMessage = {
        id: `msg-${Date.now()}-r`,
        text: RESPOSTA_AUTOMATICA,
        sender: 'lawyer',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) =>
        [...prev, respostaMsg].sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
      );
    }, 2000);
  }, [inputText]);

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
      style={styles.container}
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
      <View style={styles.inputContainer}>
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
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={enviarMensagem}
          disabled={!inputText.trim()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="send"
            size={22}
            color={inputText.trim() ? Colors.white : Colors.textSecondary}
          />
        </TouchableOpacity>
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
    padding: 16,
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
  bubbleUser: {
    backgroundColor: Colors.primary,
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
  bubbleTextUser: {
    color: Colors.white,
  },
  bubbleTextLawyer: {
    color: Colors.text,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 8,
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
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
  },
});
