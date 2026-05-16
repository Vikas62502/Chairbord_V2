import { clearMemoryStorage, memoryStorageAdapter } from '@/services/storage/storageAdapter';

export const AUTH_ACCESS_TOKEN_KEY = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
/** JSON string of user object from login (legacy also used encrypted storage). */
export const USER_DATA_CACHE_KEY = 'userData';

const AUTH_SESSION_KEYS = [AUTH_ACCESS_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY] as const;

/** Clears persisted auth tokens (call after refresh failure or forced logout). */
export async function clearAuthSession(): Promise<void> {
  await Promise.all(AUTH_SESSION_KEYS.map((key) => memoryStorageAdapter.removeItem(key)));
}

/** Clears all in-memory keys (matches legacy pre-login `removeAllCache`). */
export async function clearAllCaches(): Promise<void> {
  clearMemoryStorage();
}

/**
 * Simple string cache — swap the adapter for MMKV / EncryptedStorage in production.
 */
export async function getCache(key: string): Promise<string | null> {
  return memoryStorageAdapter.getItem(key);
}

export async function setCache(key: string, value: string): Promise<void> {
  return memoryStorageAdapter.setItem(key, value);
}

export async function removeCache(key: string): Promise<void> {
  return memoryStorageAdapter.removeItem(key);
}
