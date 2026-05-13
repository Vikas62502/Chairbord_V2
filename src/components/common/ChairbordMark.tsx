import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

type ChairbordMarkProps = {
  /** When you add `src/assets/images/chairbord-icon.png`, pass `require('@/assets/images/chairbord-icon.png')` here. */
  iconSource?: ImageSourcePropType;
  size?: number;
};

/**
 * Brand mark: optional image, otherwise a circular initials badge.
 */
export function ChairbordMark({
  iconSource,
  size = 104,
}: ChairbordMarkProps): React.JSX.Element {
  const theme = useAppTheme();

  if (iconSource) {
    return (
      <Image
        accessibilityRole="image"
        accessibilityLabel="Chairbord"
        source={iconSource}
        style={{ width: size, height: size, borderRadius: theme.radius.xl }}
        resizeMode="contain"
      />
    );
  }

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel="Chairbord"
      style={[
        styles.fallback,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.primary,
        },
      ]}
    >
      <Text style={[styles.initials, { color: theme.colors.onPrimary, fontSize: size * 0.32 }]}>
        CB
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '800',
    letterSpacing: -1,
  },
});
