import { AppText } from '@/components/common/AppText';
import type { HomeDrawerParamList } from '@/navigation/types';
import { useAppTheme } from '@/theme/ThemeProvider';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const rows: { label: string; route?: keyof HomeDrawerParamList }[] = [
  { label: 'Dashboard', route: 'Dashboard' },
  { label: 'Profile' },
  { label: 'Orders' },
  { label: 'Support' },
];

export function DrawerContent(props: DrawerContentComponentProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.scroll,
        { backgroundColor: theme.colors.surface, paddingTop: theme.spacing.lg },
      ]}
    >
      <AppText variant="title" color="text" style={{ marginBottom: theme.spacing.lg }}>
        Menu
      </AppText>
      {rows.map((row) => (
        <Pressable
          key={row.label}
          accessibilityRole="button"
          onPress={() => {
            if (row.route) {
              props.navigation.navigate(row.route);
            }
            props.navigation.closeDrawer();
          }}
          style={({ pressed }) => [
            styles.row,
            {
              borderRadius: theme.radius.md,
              backgroundColor: pressed ? theme.colors.surfaceMuted : 'transparent',
            },
          ]}
        >
          <AppText variant="bodyMedium" color="text">
            {row.label}
          </AppText>
        </Pressable>
      ))}
      <View style={{ height: theme.spacing.xl }} />
      <AppText variant="caption" color="textMuted">
        Wire these rows to your legacy routes when ready.
      </AppText>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  row: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
});
