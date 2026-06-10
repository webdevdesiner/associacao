export const USER_AVATARS: Partial<Record<string, number>> = {
  'user-002': require('@/assets/images/foto-usuario.jpeg'),
};

export function getUserAvatar(userId: string): number | undefined {
  return USER_AVATARS[userId];
}
