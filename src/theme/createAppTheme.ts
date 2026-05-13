import { darkPalette, lightPalette, type ThemePalette } from '@/theme/palettes';
import { radius } from '@/theme/radius';
import { cardElevation, headerGlow } from '@/theme/shadows';
import { spacing } from '@/theme/spacing';
import { textVariants } from '@/theme/typography';
import type { TextStyle, ViewStyle } from 'react-native';

export type AppTheme = {
  colors: ThemePalette;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof textVariants;
  shadows: {
    card: ViewStyle;
    header: ViewStyle;
  };
  isDark: boolean;
};

export function createAppTheme(isDark: boolean): AppTheme {
  const colors = isDark ? darkPalette : lightPalette;
  return {
    colors,
    spacing,
    radius,
    typography: textVariants,
    shadows: {
      card: cardElevation(isDark),
      header: headerGlow(isDark),
    },
    isDark,
  };
}

export function variantStyle(
  theme: AppTheme,
  variant: keyof typeof textVariants,
  color: keyof ThemePalette = 'text',
): TextStyle {
  return {
    ...theme.typography[variant],
    color: theme.colors[color] as string,
  };
}
