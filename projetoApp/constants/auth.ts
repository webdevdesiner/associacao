import { MOCK_ACCOUNTS } from '@/constants/MockData';
import type { MockAccount, User } from '@/constants/types';

const RS_INVALIDO = '0000';

export function validateLogin(rs: string, senha: string): User | null {
  const rsTrim = rs.trim();
  const senhaTrim = senha.trim();

  const account = MOCK_ACCOUNTS.find(
    (item) => item.rs_registro === rsTrim && item.password === senhaTrim
  );

  if (!account) {
    return null;
  }

  const { email: _email, password: _password, ...user } = account;
  return user;
}

export function getLoginError(rs: string, senha: string): string | null {
  if (!rs.trim() || !senha.trim()) {
    return 'Preencha RS e senha.';
  }

  if (rs.trim() === RS_INVALIDO) {
    return 'Registro não encontrado na base oficial. Contate a secretaria.';
  }

  if (!validateLogin(rs, senha)) {
    return 'RS ou senha incorretos.';
  }

  return null;
}

export function getAccountByUser(user: User): MockAccount | undefined {
  return MOCK_ACCOUNTS.find(
    (item) => item.id === user.id || item.rs_registro === user.rs_registro,
  );
}
