import { LAYOUT } from '@/config/layout';
import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

const hitSlop = { top: 8, bottom: 8, left: 6, right: 6 };

export type PrimaryButtonProps = PressableProps & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  title,
  textStyle,
  containerStyle,
  disabled,
  accessibilityLabel,
  ...rest
}: PrimaryButtonProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      hitSlop={hitSlop}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.md,
          paddingHorizontal: theme.spacing.lg,
          minHeight: LAYOUT.minTouchTarget,
        },
        disabled && styles.disabled,
        pressed && !disabled && { backgroundColor: theme.colors.primaryPressed },
        containerStyle,
      ]}
      {...rest}
    >
      <Text
        style={[
          theme.typography.bodyMedium,
          { color: theme.colors.onPrimary },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.45,
  },
});
