import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export type LoaderProps = {
  visible: boolean;
};

export function Loader({ visible }: LoaderProps): React.JSX.Element | null {
  const theme = useAppTheme();

  if (!visible) {
    return null;
  }

  return (
    <Modal transparent animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop} accessibilityViewIsModal>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
