import { ErrorBoundary } from '@/app/ErrorBoundary';
import { ThemeProvider } from '@/theme/ThemeProvider';
import React, { type PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Global providers (safe area, theme, query client, redux, etc.).
 */
export function AppProviders({ children }: PropsWithChildren): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
