import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

export type TextFieldProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  /** Shown on the right inside the field (e.g. password visibility toggle). */
  rightAccessory?: React.ReactNode;
};

export function TextField({
  containerStyle,
  rightAccessory,
  style,
  editable = true,
  ...rest
}: TextFieldProps): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <View
        style={[
          styles.wrap,
          {
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surface,
          },
          !editable && styles.wrapDisabled,
          containerStyle,
        ]}
    >
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        editable={editable}
        style={[
          theme.typography.body,
          styles.input,
          { color: theme.colors.text, padding: theme.spacing.md },
          style,
        ]}
        {...rest}
      />
      {rightAccessory != null ? <View style={styles.right}>{rightAccessory}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  wrapDisabled: {
    opacity: 0.65,
  },
  input: {
    flex: 1,
    minWidth: 0,
  },
  right: {
    paddingRight: 8,
  },
});
