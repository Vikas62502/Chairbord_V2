/**
 * API hosts — replace with react-native-config or your deployment values.
 * Legacy app used `customBaseUrl` for the main API and `${customBaseUrl}:3001/v1/api` for auth.
 */
const CUSTOM_BASE_URL = __DEV__
  ? 'https://cbpl.chairbord.in/v1/api'
  : 'https://cbpl.chairbord.in/v1/api';

export function getApiBaseUrl(): string {
  return CUSTOM_BASE_URL.replace(/\/$/, '');
}

/** Auth microservice base (legacy `:3001/v1/api` suffix on the same host). */
export function getAuthApiBaseUrl(): string {
  return `${getApiBaseUrl()}:3001/v1/api`;
}
