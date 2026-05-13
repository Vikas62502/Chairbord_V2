import { AppText } from '@/components/common/AppText';
import { Screen } from '@/components/common/Screen';
import { OutlineButton } from '@/components/ui/OutlineButton';
import type { RootStackParamList } from '@/navigation/types';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props): React.JSX.Element {
  const theme = useAppTheme();

  return (
    <Screen keyboardAvoiding>
      <View style={[styles.header, { marginBottom: theme.spacing.xl }]}>
        <AppText variant="headline" color="text">
          Sign in
        </AppText>
        <AppText variant="body" color="textSecondary" style={{ marginTop: theme.spacing.sm }}>
          Use your Chairbord account. Form wiring comes next.
        </AppText>
      </View>

      <View
        style={[
          styles.field,
          {
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <TextInput
          placeholder="Mobile or email"
          placeholderTextColor={theme.colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            theme.typography.body,
            { color: theme.colors.text, padding: theme.spacing.md },
          ]}
        />
      </View>

      <View style={{ height: theme.spacing.md }} />

      <View
        style={[
          styles.field,
          {
            borderColor: theme.colors.border,
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry
          style={[
            theme.typography.body,
            { color: theme.colors.text, padding: theme.spacing.md },
          ]}
        />
      </View>

      <View style={{ height: theme.spacing.xl }} />

      <OutlineButton
        title="Back to welcome"
        onPress={() => navigation.replace('Welcome')}
        accessibilityLabel="Back to welcome screen"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  field: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
