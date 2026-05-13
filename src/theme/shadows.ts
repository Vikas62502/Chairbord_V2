import type { ViewStyle } from 'react-native';

export function cardElevation(isDark: boolean): ViewStyle {
  if (isDark) {
    return {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 10,
      elevation: 6,
    };
  }
  return {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  };
}

export function headerGlow(isDark: boolean): ViewStyle {
  if (isDark) {
    return {
      shadowColor: '#38BDF8',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 24,
      elevation: 0,
    };
  }
  return {
    shadowColor: '#0B5CAD',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 0,
  };
}
