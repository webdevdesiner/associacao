/** IDs de vídeos do YouTube para simulação das pautas */
export const PAUTA_VIDEOS: Partial<Record<string, string>> = {
  'pauta-001': 'M7lc1UVf-VE',
  'pauta-003': 'ysz5S6PUM-U',
};

export function hasPautaVideo(pautaId: string): boolean {
  return pautaId in PAUTA_VIDEOS;
}

export function getPautaVideoEmbedUrl(pautaId: string): string | null {
  const videoId = PAUTA_VIDEOS[pautaId];
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function getPautaVideoWatchUrl(pautaId: string): string | null {
  const videoId = PAUTA_VIDEOS[pautaId];
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=${videoId}`;
}
