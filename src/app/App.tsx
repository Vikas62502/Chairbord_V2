import { AppProviders } from '@/app/providers/AppProviders';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function AppShell(): React.JSX.Element {
  const { isDark } = useAppTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <RootNavigator />
    </GestureHandlerRootView>
  );
}

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}

export default App;
