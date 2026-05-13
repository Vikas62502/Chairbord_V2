import { getApiBaseUrl, getAuthApiBaseUrl } from '@/config/api';
import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

const JSON_HEADERS = { 'Content-Type': 'application/json' } as const;

/** Main API (legacy `customBaseUrl`). */
export const client = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 60_000,
  headers: { ...JSON_HEADERS },
});

/** Auth service (`:3001/v1/api` on the same host in the legacy app). */
export const authClient = axios.create({
  baseURL: getAuthApiBaseUrl(),
  timeout: 20_000,
  headers: { ...JSON_HEADERS },
});

setupInterceptorsTo(client);
setupInterceptorsTo(authClient);
