import { createAppTheme, type AppTheme } from '@/theme/createAppTheme';
import React, {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext<AppTheme | null>(null);

export function ThemeProvider({ children }: PropsWithChildren): React.JSX.Element {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const theme = useMemo(() => createAppTheme(isDark), [isDark]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): AppTheme {
  const value = useContext(ThemeContext);
  if (value == null) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return value;
}
