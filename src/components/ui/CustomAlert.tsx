import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { Modal, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type CustomAlertModalProps = {
  visible: boolean;
  title: string;
  message?: string;
  /** Primary action label (default `OK`). */
  confirmLabel?: string;
  onDismiss: () => void;
};

/**
 * In-app replacement for `Alert.alert` — one primary action, themed card on dimmed scrim.
 * Dismiss via the button only (same mental model as a single-button system alert).
 */
export function CustomAlertModal({
  visible,
  title,
  message,
  confirmLabel = 'OK',
  onDismiss,
}: CustomAlertModalProps): React.JSX.Element | null {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardMax = Math.min(width - theme.spacing.xl * 2, 360);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
      accessibilityViewIsModal
    >
      <View
        style={[
          styles.scrim,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 12,
            paddingHorizontal: theme.spacing.lg,
          },
        ]}
      >
        <View
          style={[
            styles.card,
            {
              maxWidth: cardMax,
              borderRadius: theme.radius.lg,
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
            },
            theme.shadows.card,
          ]}
        >
          <AppText variant="title" color="text">
            {title}
          </AppText>
          {message != null && message.length > 0 ? (
            <AppText
              variant="body"
              color="textSecondary"
              style={{ marginTop: theme.spacing.sm }}
            >
              {message}
            </AppText>
          ) : null}
          <View style={{ height: theme.spacing.lg }} />
          <PrimaryButton title={confirmLabel} onPress={onDismiss} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    padding: 22,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
