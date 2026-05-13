import { AppText } from '@/components/common/AppText';
import { Screen } from '@/components/common/Screen';
import { Card } from '@/components/ui/Card';
import { OutlineButton } from '@/components/ui/OutlineButton';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { APP_NAME } from '@/constants';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppTheme } from '@/theme/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const highlights = [
  { label: 'FASTag', hint: 'Issue & manage tags', tone: 'primary' as const },
  { label: 'Wallet', hint: 'Top up & pay tolls', tone: 'secondary' as const },
  { label: 'Trips', hint: 'History & alerts', tone: 'muted' as const },
];

/**
 * Branded home — swap body for your real dashboard when migrating routes.
 */
export function HomeScreen(): React.JSX.Element {
  const theme = useAppTheme();
  const responsive = useResponsive();
  const pad = responsive.horizontalPadding;

  return (
    <Screen>
      <View
        style={[
          styles.hero,
          {
            marginHorizontal: -pad,
            paddingHorizontal: pad,
            paddingVertical: theme.spacing.xl,
            backgroundColor: theme.colors.heroTint,
            borderBottomLeftRadius: theme.radius.xl,
            borderBottomRightRadius: theme.radius.xl,
          },
          theme.shadows.header,
        ]}
      >
        <AppText
          variant="overline"
          color="secondary"
          style={{ marginBottom: theme.spacing.sm }}
        >
          Mobility & tolls
        </AppText>
        <AppText variant="display" color="text">
          {APP_NAME}
        </AppText>
        <AppText
          variant="body"
          color="textSecondary"
          style={{
            marginTop: theme.spacing.sm,
            maxWidth: responsive.isTablet ? 480 : '100%',
          }}
        >
          One calm place for FASTag, wallet, and trip tools — built for the road.
        </AppText>
      </View>

      <View style={{ height: theme.spacing.xl }} />

      <Card>
        <AppText
          variant="title"
          color="text"
          style={{ marginBottom: theme.spacing.md }}
        >
          Quick access
        </AppText>
        {highlights.map((item, index) => (
          <View
            key={item.label}
            style={[
              styles.row,
              {
                paddingVertical: theme.spacing.md,
                borderBottomWidth: index === highlights.length - 1 ? 0 : StyleSheet.hairlineWidth,
                borderBottomColor: theme.colors.borderSubtle,
              },
            ]}
          >
            <View
              style={[
                styles.badge,
                {
                  borderRadius: theme.radius.md,
                  backgroundColor:
                    item.tone === 'primary'
                      ? theme.colors.heroTint
                      : item.tone === 'secondary'
                        ? `${theme.colors.secondary}22`
                        : theme.colors.surfaceMuted,
                },
              ]}
            >
              <Text style={[theme.typography.title, { color: theme.colors.primary }]}>
                {item.label.charAt(0)}
              </Text>
            </View>
            <View style={styles.rowText}>
              <AppText variant="bodyMedium" color="text">
                {item.label}
              </AppText>
              <AppText variant="caption" color="textMuted">
                {item.hint}
              </AppText>
            </View>
          </View>
        ))}
      </Card>

      <View style={{ height: theme.spacing.xl }} />

      <View style={[styles.actions, { gap: theme.spacing.md }]}>
        <PrimaryButton title="Continue to app" onPress={() => {}} />
        <OutlineButton title="View demo tour" onPress={() => {}} />
      </View>

      <AppText
        variant="caption"
        color="textMuted"
        style={{ textAlign: 'center', marginTop: theme.spacing.xl }}
      >
        {__DEV__ ? 'Development build' : 'Signed release build'}
      </AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowText: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
