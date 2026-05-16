import { client } from '@/client/instances';
import { AppText } from '@/components/common/AppText';
import { DividerWithText } from '@/components/common/DividerWithText';
import { Screen } from '@/components/common/Screen';
import { TextField } from '@/components/common/TextField';
import { Loader } from '@/components/ui/Loader';
import { OutlineButton } from '@/components/ui/OutlineButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { LOGIN_ENDPOINTS } from '@/features/auth/loginEndpoints';
import { persistAgentLoginAndValidate } from '@/features/auth/persistAgentLogin';
import { useCustomAlert } from '@/hooks/useCustomAlert';
import type { RootStackParamList } from '@/navigation/types';
import { clearAllCaches } from '@/services/storage';
import { useAppTheme } from '@/theme/ThemeProvider';
import { encryptData } from '@/utils/encryption/loginEncrypt';
import { getFcmToken } from '@/utils/notifications/getFcmToken';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { VerifyOTPForm } from './VerifyOTPForm';

const SUPPORT_PHONE = '+919251005611';
const TERMS_URL = 'https://www.chairbord.in/termsandconditions';
const PRIVACY_URL = 'https://www.chairbord.in/privacypolicy';

type Tab = 'password' | 'otp';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props): React.JSX.Element {
  const theme = useAppTheme();
  const { showAlert, alertNode } = useCustomAlert();
  const [active, setActive] = useState<Tab>('password');
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
  });

  const setTab = useCallback((t: Tab) => {
    setActive(t);
    setShowOtpField(false);
  }, []);

  const loginApi = useCallback(async (): Promise<void> => {
    const email = formData.email.trim();
    const password = formData.password;
    if (!email || !password) {
      showAlert('Missing details', 'Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      await clearAllCaches();
      const body = {
        email: encryptData(email),
        password: encryptData(password),
        fcmToken: await getFcmToken(),
      };
      const { data } = await client.post(LOGIN_ENDPOINTS.agent, body);
      const { ok } = await persistAgentLoginAndValidate(data);
      if (ok) {
        setFormData({ email: '', password: '', phoneNumber: '' });
        navigation.replace('Home');
        return;
      }
      showAlert(
        'Login incomplete',
        'We could not confirm your session. Please try again or contact support.',
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as { message?: string; desc?: string; description?: string };
        showAlert(
          body?.message ?? 'Login failed',
          body?.description ?? body?.desc ?? 'Please try again.',
        );
        return;
      }
      showAlert('Login failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  }, [formData.email, formData.password, navigation, showAlert]);

  const getOtpByPhoneNumber = useCallback(async (): Promise<void> => {
    const digits = formData.phoneNumber.trim().replace(/\D/g, '');
    if (digits.length !== 10) {
      showAlert('Invalid number', 'Please enter a 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      await client.post(LOGIN_ENDPOINTS.agentMobileOtp, { phoneNumber: digits });
      setShowOtpField(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as { message?: string; desc?: string; description?: string };
        showAlert(
          body?.message ?? 'Something went wrong',
          body?.description ?? body?.desc ?? 'Please try again later.',
        );
        return;
      }
      showAlert('Something went wrong', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [formData.phoneNumber, showAlert]);

  const openWhatsApp = useCallback((): void => {
    const message = encodeURIComponent('Hello, I need help with my account');
    const url = `whatsapp://send?phone=${SUPPORT_PHONE}&text=${message}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
        showAlert('WhatsApp', 'WhatsApp is not installed on this device.');
        return undefined;
      })
      .catch(() => {
        showAlert('WhatsApp', 'Unable to open WhatsApp.');
      });
  }, [showAlert]);

  const dialSupport = useCallback((): void => {
    const url = `tel:${SUPPORT_PHONE}`;
    Linking.openURL(url).catch(() => {
      showAlert('Unable to call', 'Please dial the number manually.');
    });
  }, [showAlert]);

  return (
    <Screen scroll keyboardAvoiding>
      <Loader visible={loading} />
      {alertNode}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Back to welcome"
        hitSlop={12}
        onPress={() => navigation.replace('Welcome')}
        style={styles.backRow}
      >
        <AppText variant="bodyMedium" color="primary">
          ← Welcome
        </AppText>
      </Pressable>

      <View style={[styles.hero, { marginBottom: theme.spacing.lg }]}>
        <AppText variant="headline" color="text">
          Welcome
        </AppText>
        <AppText variant="body" color="textSecondary" style={{ marginTop: theme.spacing.sm }}>
          Please enter your account details here
        </AppText>
      </View>

      <View style={styles.tabWrap}>
        <View
          style={[
            styles.tabRow,
            {
              borderRadius: theme.radius.md,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surfaceMuted,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            onPress={() => setTab('password')}
            style={[
              styles.tabHalf,
              active === 'password' && { backgroundColor: theme.colors.surface },
            ]}
          >
            <AppText
              variant="bodyMedium"
              color={active === 'password' ? 'text' : 'textMuted'}
              style={styles.tabLabel}
            >
              Password
            </AppText>
          </Pressable>
          <View style={[styles.tabDivider, { backgroundColor: theme.colors.border }]} />
          <Pressable
            accessibilityRole="button"
            onPress={() => setTab('otp')}
            style={[
              styles.tabHalf,
              active === 'otp' && { backgroundColor: theme.colors.surface },
            ]}
          >
            <AppText
              variant="bodyMedium"
              color={active === 'otp' ? 'text' : 'textMuted'}
              style={styles.tabLabel}
            >
              OTP
            </AppText>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        {active === 'password' ? (
          <>
            <TextField
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={formData.email}
              onChangeText={(email) => setFormData((p) => ({ ...p, email }))}
              editable={!loading}
            />
            <View style={{ height: theme.spacing.md }} />
            <TextField
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              value={formData.password}
              onChangeText={(password) => setFormData((p) => ({ ...p, password }))}
              editable={!loading}
              rightAccessory={
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
                  hitSlop={8}
                  onPress={() => setIsPasswordVisible((v) => !v)}
                >
                  <AppText variant="caption" color="primary">
                    {isPasswordVisible ? 'Hide' : 'Show'}
                  </AppText>
                </Pressable>
              }
            />
            <View style={{ height: theme.spacing.lg }} />
            <PrimaryButton title="Sign in" onPress={() => loginApi().catch(() => {})} disabled={loading} />
          </>
        ) : (
          <View>
            <TextField
              placeholder="Phone number"
              keyboardType="number-pad"
              maxLength={10}
              value={formData.phoneNumber}
              onChangeText={(phoneNumber) =>
                setFormData((p) => ({ ...p, phoneNumber: phoneNumber.replace(/\D/g, '') }))
              }
              editable={!loading && !showOtpField}
            />
            {!showOtpField ? (
              <View style={{ marginTop: theme.spacing.lg }}>
                <OutlineButton title="Get OTP" onPress={() => getOtpByPhoneNumber().catch(() => {})} disabled={loading} />
              </View>
            ) : (
              <VerifyOTPForm
                phoneNumber={formData.phoneNumber.trim()}
                onClose={() => setShowOtpField(false)}
                navigation={navigation}
                showAlert={showAlert}
              />
            )}
          </View>
        )}

        {!showOtpField ? (
          <View style={{ marginTop: theme.spacing.md }}>
            <DividerWithText />
            <OutlineButton
              title="Sign up"
              onPress={() =>
                showAlert(
                  'Coming soon',
                  'Registration will be available in a future update.',
                )
              }
            />
            <View style={styles.termsBlock}>
              <AppText variant="caption" color="textSecondary" style={styles.termsLine}>
                By signing up you accept the
              </AppText>
              <View style={styles.termsLinks}>
                <Pressable onPress={() => Linking.openURL(TERMS_URL).catch(() => {})}>
                  <AppText variant="caption" color="primary">
                    Terms of Service
                  </AppText>
                </Pressable>
                <AppText variant="caption" color="textSecondary">
                  {' '}&{' '}
                </AppText>
                <Pressable onPress={() => Linking.openURL(PRIVACY_URL).catch(() => {})}>
                  <AppText variant="caption" color="primary">
                    Privacy policy
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}

        <View style={[styles.contactBlock, { marginTop: theme.spacing.xl }]}>
          <AppText variant="bodyMedium" color="textSecondary" style={styles.contactTitle}>
            If any query, contact us
          </AppText>
          <View style={styles.contactRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Call us"
              onPress={dialSupport}
              style={[styles.callBtn, { backgroundColor: theme.colors.primary }]}
            >
              <AppText variant="bodyMedium" color="onPrimary">
                Call
              </AppText>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Contact us via WhatsApp"
              onPress={openWhatsApp}
              style={[styles.waBtn, { borderColor: theme.colors.border }]}
            >
              <AppText variant="bodyMedium" color="text">
                WhatsApp
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backRow: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  hero: {
    width: '100%',
  },
  tabWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    maxWidth: 400,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  tabHalf: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabLabel: {
    textAlign: 'center',
  },
  tabDivider: {
    width: StyleSheet.hairlineWidth,
  },
  section: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  termsBlock: {
    marginTop: 16,
  },
  termsLine: {
    textAlign: 'center',
  },
  termsLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  contactBlock: {
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  contactTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  callBtn: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  waBtn: {
    borderRadius: 999,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
