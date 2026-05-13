/**
 * Central place for API base URL — wire env (react-native-config, etc.) later.
 */
export function getApiBaseUrl(): string {
  if (__DEV__) {
    return 'https://api-dev.example.com';
  }
  return 'https://api.example.com';
}
