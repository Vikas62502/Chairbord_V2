import { memoryStorageAdapter } from '@/services/storage/storageAdapter';

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
