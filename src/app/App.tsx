import { AppProviders } from '@/app/providers/AppProviders';
import { RootNavigator } from '@/navigation/RootNavigator';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StatusBar } from 'react-native';

function AppShell(): React.JSX.Element {
  const { isDark } = useAppTheme();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <RootNavigator>
        <HomeScreen />
      </RootNavigator>
    </>
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
