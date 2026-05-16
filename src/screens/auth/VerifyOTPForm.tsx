import { client } from '@/client/instances';
import { TextField } from '@/components/common/TextField';
import { Loader } from '@/components/ui/Loader';
import { OutlineButton } from '@/components/ui/OutlineButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { LOGIN_ENDPOINTS } from '@/features/auth/loginEndpoints';
import {
  persistAgentLoginAndValidate,
  type AgentLoginPayload,
} from '@/features/auth/persistAgentLogin';
import type { RootStackParamList } from '@/navigation/types';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type LoginNav = NativeStackScreenProps<RootStackParamList, 'Login'>['navigation'];

export type VerifyOTPFormProps = {
  phoneNumber: string;
  onClose: () => void;
  navigation: LoginNav;
  showAlert: (title: string, message?: string) => void;
};

export function VerifyOTPForm({
  phoneNumber,
  onClose,
  navigation,
  showAlert,
}: VerifyOTPFormProps): React.JSX.Element {
  const theme = useAppTheme();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const verify = useCallback(async (): Promise<void> => {
    const code = otp.trim();
    if (code.length < 4) {
      showAlert('Invalid OTP', 'Please enter the code you received.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await client.post<AgentLoginPayload>(
        LOGIN_ENDPOINTS.agentMobileOtpVerify,
        { phoneNumber, otp: code },
      );
      const { ok } = await persistAgentLoginAndValidate(data);
      if (ok) {
        navigation.replace('Home');
        return;
      }
      showAlert(
        'Could not verify session',
        'Login succeeded but session check failed. Please try again or contact support.',
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as { message?: string; desc?: string; description?: string };
        showAlert(
          body?.message ?? 'Verification failed',
          body?.description ?? body?.desc ?? 'Please try again.',
        );
        return;
      }
      showAlert('Verification failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigation, otp, phoneNumber, showAlert]);

  return (
    <View style={[styles.block, { marginTop: theme.spacing.lg }]}>
      <Loader visible={loading} />
      <TextField
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={8}
        value={otp}
        onChangeText={setOtp}
        editable={!loading}
      />
      <View style={{ height: theme.spacing.md }} />
      <PrimaryButton title="Verify & sign in" onPress={() => verify().catch(() => {})} disabled={loading} />
      <View style={{ height: theme.spacing.sm }} />
      <OutlineButton title="Change number" onPress={onClose} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
  },
});
