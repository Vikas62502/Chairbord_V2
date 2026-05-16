import { CustomAlertModal } from '@/components/ui/CustomAlert';
import React, { useCallback, useState } from 'react';

export type CustomAlertPayload = {
  title: string;
  message?: string;
  confirmLabel?: string;
};

/**
 * Imperative-style alerts without `Alert.alert` — render `alertNode` once inside your screen tree.
 */
export function useCustomAlert(): {
  showAlert: (title: string, message?: string, confirmLabel?: string) => void;
  alertNode: React.ReactNode;
} {
  const [payload, setPayload] = useState<CustomAlertPayload | null>(null);

  const showAlert = useCallback((title: string, message?: string, confirmLabel?: string) => {
    setPayload({ title, message, confirmLabel });
  }, []);

  const dismiss = useCallback(() => {
    setPayload(null);
  }, []);

  const alertNode =
    payload != null ? (
      <CustomAlertModal
        visible
        title={payload.title}
        message={payload.message}
        confirmLabel={payload.confirmLabel}
        onDismiss={dismiss}
      />
    ) : null;

  return { showAlert, alertNode };
}
