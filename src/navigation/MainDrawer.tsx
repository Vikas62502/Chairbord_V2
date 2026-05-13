import { DrawerContent } from '@/navigation/DrawerContent';
import type { HomeDrawerParamList } from '@/navigation/types';
import { DashboardScreen } from '@/screens/home/DashboardScreen';
import { useAppTheme } from '@/theme/ThemeProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export function MainDrawer(): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Drawer.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 288,
          backgroundColor: theme.colors.surface,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.textSecondary,
        overlayColor: 'rgba(0,0,0,0.45)',
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Home' }}
      />
    </Drawer.Navigator>
  );
}
