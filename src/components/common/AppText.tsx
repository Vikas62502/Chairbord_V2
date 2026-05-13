import { useAppTheme } from '@/theme/ThemeProvider';
import type { ThemePalette } from '@/theme/palettes';
import type { TextVariant } from '@/theme/typography';
import React from 'react';
import { Text, type TextProps } from 'react-native';

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  /** Semantic color key from the active palette. */
  color?: keyof ThemePalette;
  /** Clamp system font scaling for layout stability (still respects a11y up to cap). */
  maxFontSizeMultiplier?: number;
};

const defaultMaxFontMultiplier = 1.35;

/**
 * Themed text with typography variants and safe font scaling defaults.
 */
export function AppText({
  variant = 'body',
  color = 'text',
  style,
  maxFontSizeMultiplier = defaultMaxFontMultiplier,
  allowFontScaling = true,
  ...rest
}: AppTextProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Text
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[theme.typography[variant], { color: theme.colors[color] as string }, style]}
      {...rest}
    />
  );
}
