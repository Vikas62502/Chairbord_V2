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

export type OutlineButtonProps = PressableProps & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export function OutlineButton({
  title,
  textStyle,
  containerStyle,
  disabled,
  accessibilityLabel,
  ...rest
}: OutlineButtonProps): React.JSX.Element {
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
          borderRadius: theme.radius.md,
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
          paddingHorizontal: theme.spacing.lg,
          minHeight: LAYOUT.minTouchTarget,
          backgroundColor: pressed && !disabled ? theme.colors.heroTint : 'transparent',
        },
        disabled && styles.disabled,
        containerStyle,
      ]}
      {...rest}
    >
      <Text
        style={[
          theme.typography.bodyMedium,
          { color: theme.colors.primary },
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
