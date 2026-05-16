import { client } from '@/client/instances';
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  USER_DATA_CACHE_KEY,
  setCache,
} from '@/services/storage';
import { LOGIN_ENDPOINTS } from '@/features/auth/loginEndpoints';
import type { AxiosResponse } from 'axios';

export type AgentLoginPayload = {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: unknown;
};

/**
 * Persists tokens + user, then validates session with `/login/check-token` (legacy flow).
 * @returns whether `check-token` reported `success: true`
 */
export async function persistAgentLoginAndValidate(
  data: AgentLoginPayload,
): Promise<{ ok: boolean; checkResponse?: AxiosResponse<unknown> }> {
  const access = data.token ?? data.accessToken;
  if (!access || !data.refreshToken) {
    throw new Error('Missing access or refresh token from login response');
  }
  await setCache(AUTH_ACCESS_TOKEN_KEY, access);
  await setCache(AUTH_REFRESH_TOKEN_KEY, data.refreshToken);
  if (data.user != null) {
    const serialized =
      typeof data.user === 'string' ? data.user : JSON.stringify(data.user);
    await setCache(USER_DATA_CACHE_KEY, serialized);
  }
  const checkResponse = await client.get(LOGIN_ENDPOINTS.checkToken);
  const body = checkResponse.data as { success?: boolean } | undefined;
  return { ok: body?.success === true, checkResponse };
}
