import { AppText } from '@/components/common/AppText';
import type { HomeDrawerParamList } from '@/navigation/types';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useMemo, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** Replace with profile / auth context when wired. */
const DASHBOARD_USER_NAME = 'User';

const SWIPER_SLIDES = [
  { key: '1', title: 'FASTag & wallet', subtitle: 'Top up, track tolls, and manage tags in one place.' },
  { key: '2', title: 'Issuance & orders', subtitle: 'Follow Bajaj and SBI flows with clear status updates.' },
  { key: '3', title: 'RC & compliance', subtitle: 'Get RC and keep vehicle paperwork within reach.' },
] as const;

const DASHBOARD_ACTIONS = [
  { key: 'wallet', label: 'Wallet', abbr: 'W', tint: '#0D9488' },
  { key: 'bajaj-rg', label: 'Bajaj RG', abbr: 'RG', tint: '#E46B1F' },
  { key: 'bajaj-rep', label: 'Bajaj Rep', abbr: 'BR', tint: '#EA580C' },
  { key: 'sbi-reg', label: 'SBI Reg', abbr: 'SR', tint: '#0B5CAD' },
  { key: 'sbi-rep', label: 'SBI Rep', abbr: 'SP', tint: '#0369A1' },
  { key: 'order', label: 'Order', abbr: 'Or', tint: '#7C3AED' },
  { key: 'issuance', label: 'Issuance tracker', abbr: 'Is', tint: '#059669' },
  { key: 'get-rc', label: 'Get RC', abbr: 'RC', tint: '#D97706' },
] as const;

type Props = DrawerScreenProps<HomeDrawerParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props): React.JSX.Element {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const responsive = useResponsive();
  const pad = responsive.horizontalPadding;
  const [slideIndex, setSlideIndex] = useState(0);

  const slideWidth = windowWidth;

  const tileWidth = useMemo(() => {
    const gaps = 12;
    const cols = 4;
    const usable = windowWidth - pad * 2 - gaps * (cols - 1);
    return usable / cols;
  }, [pad, windowWidth]);

  const onSwiperScroll = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / slideWidth);
    if (i !== slideIndex && i >= 0 && i < SWIPER_SLIDES.length) {
      setSlideIndex(i);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + theme.spacing.sm,
            paddingBottom: theme.spacing.md,
            paddingHorizontal: pad,
            backgroundColor: theme.colors.backgroundElevated,
            borderBottomColor: theme.colors.borderSubtle,
          },
          theme.shadows.header,
        ]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open menu"
          hitSlop={12}
          onPress={() => navigation.openDrawer()}
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.65 }]}
        >
          <HamburgerIcon color={theme.colors.text} />
        </Pressable>

        <View style={styles.headerCenter}>
          <AppText variant="caption" color="textMuted" numberOfLines={1}>
            Welcome back
          </AppText>
          <AppText variant="bodyMedium" color="text" numberOfLines={1}>
            {DASHBOARD_USER_NAME}
          </AppText>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={12}
          onPress={() => {}}
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.65 }]}
        >
          <NotificationGlyph color={theme.colors.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(theme.spacing.xxl, insets.bottom + theme.spacing.lg),
        }}
      >
        <View style={{ paddingTop: theme.spacing.lg }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onScroll={onSwiperScroll}
            scrollEventThrottle={16}
            snapToInterval={slideWidth}
            snapToAlignment="center"
            disableIntervalMomentum
          >
            {SWIPER_SLIDES.map((slide) => (
              <View key={slide.key} style={[styles.slidePage, { width: slideWidth }]}>
                <View
                  style={[
                    styles.slideCard,
                    {
                      marginHorizontal: pad,
                      borderRadius: theme.radius.lg,
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.borderSubtle,
                    },
                    theme.shadows.card,
                  ]}
                >
                  <AppText variant="title" color="text" style={{ marginBottom: theme.spacing.sm }}>
                    {slide.title}
                  </AppText>
                  <AppText variant="body" color="textSecondary">
                    {slide.subtitle}
                  </AppText>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.dotsRow, { marginTop: theme.spacing.md }]}>
            {SWIPER_SLIDES.map((s, i) => (
              <View
                key={s.key}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      i === slideIndex ? theme.colors.primary : theme.colors.border,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: pad, marginTop: theme.spacing.xl }}>
          <AppText variant="title" color="text" style={{ marginBottom: theme.spacing.md }}>
            Quick actions
          </AppText>
          <View style={[styles.gridRow]}>
            {DASHBOARD_ACTIONS.map((item) => (
              <Pressable
                key={item.key}
                accessibilityRole="button"
                accessibilityLabel={item.label}
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.tile,
                  {
                    width: tileWidth,
                    opacity: pressed ? 0.88 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.tileIcon,
                    {
                      borderRadius: theme.radius.md,
                      backgroundColor: `${item.tint}28`,
                    },
                  ]}
                >
                  <AppText
                    variant="caption"
                    style={[
                      styles.tileAbbr,
                      item.abbr.length > 2 ? styles.tileAbbrCompact : styles.tileAbbrWide,
                      { color: item.tint },
                    ]}
                  >
                    {item.abbr}
                  </AppText>
                </View>
                <AppText
                  variant="caption"
                  color="text"
                  numberOfLines={2}
                  style={styles.tileCaption}
                >
                  {item.label}
                </AppText>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function HamburgerIcon({ color }: { color: string }): React.JSX.Element {
  const bar = [styles.hamBar, { backgroundColor: color }];
  return (
    <View style={styles.ham} accessibilityElementsHidden>
      <View style={bar} />
      <View style={bar} />
      <View style={bar} />
    </View>
  );
}

function NotificationGlyph({ color }: { color: string }): React.JSX.Element {
  const theme = useAppTheme();
  return (
    <View style={styles.bellWrap}>
      <View style={[styles.bellDome, { borderColor: color }]} />
      <View style={[styles.bellClapper, { backgroundColor: color }]} />
      <View style={[styles.bellDot, { backgroundColor: theme.colors.error }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerCenter: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 12,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ham: {
    width: 22,
    gap: 5,
  },
  hamBar: {
    height: 2,
    borderRadius: 1,
    width: 22,
  },
  bellWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  bellDome: {
    width: 14,
    height: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  bellClapper: {
    width: 4,
    height: 3,
    marginTop: -1,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 2,
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  slidePage: {
    justifyContent: 'center',
  },
  slideCard: {
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    minHeight: 132,
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    alignItems: 'center',
  },
  tileIcon: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileAbbr: {
    fontWeight: '700',
  },
  tileAbbrCompact: {
    fontSize: 11,
  },
  tileAbbrWide: {
    fontSize: 14,
  },
  tileCaption: {
    marginTop: 10,
    textAlign: 'center',
  },
});
