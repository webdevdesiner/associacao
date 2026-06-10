import { Linking, Platform, Alert } from 'react-native';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import { getContentUriAsync } from 'expo-file-system/legacy';

export const PAUTA_PDFS: Partial<Record<string, number>> = {
  'pauta-001': require('@/assets/pautas/pauta-reforma-estatuto.pdf'),
  'pauta-002': require('@/assets/pautas/aprovacao-orcamento-2025-pauta.pdf'),
};

export const PAUTA_PDF_LABELS: Partial<Record<string, string>> = {
  'pauta-001': 'pauta-reforma-estatuto.pdf',
  'pauta-002': 'aprovacao-orcamento-2025-pauta.pdf',
};

export function hasPautaPdf(pautaId: string): boolean {
  return pautaId in PAUTA_PDFS;
}

export function getPautaPdfLabel(pautaId: string): string | null {
  return PAUTA_PDF_LABELS[pautaId] ?? null;
}

async function resolvePdfUri(pautaId: string): Promise<string | null> {
  const moduleId = PAUTA_PDFS[pautaId];
  if (!moduleId) return null;

  const asset = Asset.fromModule(moduleId);
  await asset.downloadAsync();
  return asset.localUri ?? asset.uri ?? null;
}

export async function openPautaPdf(pautaId: string): Promise<boolean> {
  try {
    const uri = await resolvePdfUri(pautaId);
    if (!uri) return false;

    if (Platform.OS === 'web') {
      window.open(uri, '_blank');
      return true;
    }

    let shareUri = uri;
    if (Platform.OS === 'android' && uri.startsWith('file://')) {
      shareUri = await getContentUriAsync(uri);
    }

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(shareUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Visualizar documento PDF',
        UTI: 'com.adobe.pdf',
      });
      return true;
    }

    if (await Linking.canOpenURL(shareUri)) {
      await Linking.openURL(shareUri);
      return true;
    }

    Alert.alert(
      'Não foi possível abrir',
      'Nenhum aplicativo compatível foi encontrado para visualizar o PDF.',
    );
    return false;
  } catch {
    Alert.alert('Erro', 'Não foi possível abrir o documento PDF.');
    return false;
  }
}
