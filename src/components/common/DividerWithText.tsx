import { AppText } from '@/components/common/AppText';
import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export type DividerWithTextProps = {
  label?: string;
};

export function DividerWithText({ label = 'OR' }: DividerWithTextProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
      <AppText variant="caption" color="textMuted" style={styles.label}>
        {label}
      </AppText>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  label: {
    marginHorizontal: 12,
  },
});
