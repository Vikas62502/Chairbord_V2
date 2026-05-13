import { AppText } from '@/components/common/AppText';
import type { RootStackParamList } from '@/navigation/types';
import { getCache } from '@/services/storage';
import { useAppTheme } from '@/theme/ThemeProvider';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Relative path so Metro resolves the asset reliably (`@/` in require() often breaks). */
const LOGO = require('../../assets/chairbordlogo.png');
const TAGLINE_ART = require('../../assets/chairbordTagLine.png');

const LOGO_META = Image.resolveAssetSource(LOGO);
const TAGLINE_META = Image.resolveAssetSource(TAGLINE_ART);

const ACCESS_TOKEN_KEY = 'accessToken';
/** Mirrors legacy splash: brief hold before the post-login route when signed out. */
const UNSIGNED_REDIRECT_MS = 1200;

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props): React.JSX.Element {
  const theme = useAppTheme();
  const { width: windowWidth } = useWindowDimensions();
  const redirectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logoSize = useMemo(() => {
    const maxW = Math.min(windowWidth * 0.82, 320);
    const w = LOGO_META?.width ?? 0;
    const h = LOGO_META?.height ?? 0;
    if (w <= 0 || h <= 0) {
      return { width: maxW, height: 160 };
    }
    const scale = maxW / w;
    return { width: maxW, height: Math.round(h * scale) };
  }, [windowWidth]);

  const clearRedirectTimer = useCallback(() => {
    if (redirectTimer.current != null) {
      clearTimeout(redirectTimer.current);
      redirectTimer.current = null;
    }
  }, []);

  const goHome = useCallback(() => {
    clearRedirectTimer();
    navigation.replace('Home');
  }, [clearRedirectTimer, navigation]);

  const goLogin = useCallback(() => {
    clearRedirectTimer();
    navigation.replace('Login');
  }, [clearRedirectTimer, navigation]);

  useEffect(() => {
    let cancelled = false;

    const run = async (): Promise<void> => {
      const token = await getCache(ACCESS_TOKEN_KEY);
      if (cancelled) {
        return;
      }
      if (token) {
        navigation.replace('Home');
        return;
      }
      redirectTimer.current = setTimeout(() => {
        navigation.replace('Login');
      }, UNSIGNED_REDIRECT_MS);
    };

    void run();

    return () => {
      cancelled = true;
      clearRedirectTimer();
    };
  }, [clearRedirectTimer, navigation]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={stylesBase.ink} />
      <AmbientBackdrop />

      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Continues to sign in or your workspace if already signed in"
          onPress={() => {
            void (async () => {
              const token = await getCache(ACCESS_TOKEN_KEY);
              if (token) {
                goHome();
              } else {
                goLogin();
              }
            })();
          }}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressablePressed]}
        >
          <View style={styles.content}>
            <View style={[styles.card, { borderColor: 'rgba(255,255,255,0.12)' }]}>
              <View style={styles.logoShell}>
                <Image source={LOGO} style={logoSize} resizeMode="contain" />
              </View>
              <Image
                source={TAGLINE_ART}
                style={[
                  styles.taglineArt,
                  taglineArtSize(windowWidth),
                  { marginTop: theme.spacing.xl },
                ]}
                resizeMode="contain"
              />
              <AppText
                variant="body"
                style={styles.supportLine}
              >
                Working with 1K+ workers — past 4 years
              </AppText>
              <AvatarCluster />
            </View>

            <AppText variant="caption" style={styles.tapHint}>
              Tap anywhere to continue
            </AppText>
          </View>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

function AmbientBackdrop(): React.JSX.Element {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[styles.blob, styles.blobA]} />
      <View style={[styles.blob, styles.blobB]} />
      <View style={[styles.blob, styles.blobC]} />
      <View style={styles.vignette} />
    </View>
  );
}

function taglineArtSize(windowWidth: number): { width: number; height: number } {
  const maxW = Math.min(windowWidth * 0.88, 320);
  const w = TAGLINE_META?.width ?? 0;
  const h = TAGLINE_META?.height ?? 0;
  if (w <= 0 || h <= 0) {
    return { width: maxW, height: 48 };
  }
  const scale = maxW / w;
  return { width: maxW, height: Math.max(40, Math.round(h * scale)) };
}

function AvatarCluster(): React.JSX.Element {
  const faces = [0, 1, 2, 3, 4];
  return (
    <View style={styles.clusterRow}>
      {faces.map((i) => (
        <View
          key={i}
          style={[
            styles.face,
            { marginLeft: i === 0 ? 0 : -10, zIndex: faces.length - i },
          ]}
        />
      ))}
    </View>
  );
}

const stylesBase = {
  ink: '#050a12',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: stylesBase.ink,
  },
  safe: {
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  pressablePressed: {
    opacity: 0.92,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: '8%',
    paddingBottom: '6%',
  },
  card: {
    borderWidth: 1,
    borderRadius: 28,
    paddingVertical: '10%',
    paddingHorizontal: '8%',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  /**
   * Dark plate matching the screen: the logo PNG is black + white ring + mark.
   * A light plate (#f8fafc) made the white ring disappear into the background.
   */
  logoShell: {
    alignSelf: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 28,
    backgroundColor: stylesBase.ink,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  taglineArt: {
    alignSelf: 'center',
  },
  supportLine: {
    marginTop: '8%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  clusterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
    paddingVertical: 4,
  },
  face: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(148,163,184,0.45)',
  },
  tapHint: {
    marginTop: '12%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.45)',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
  },
  blobA: {
    width: 320,
    height: 320,
    top: -80,
    right: -100,
    backgroundColor: 'rgba(34, 211, 238, 0.22)',
  },
  blobB: {
    width: 280,
    height: 280,
    bottom: '12%',
    left: -120,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  blobC: {
    width: 200,
    height: 200,
    bottom: -40,
    right: '20%',
    backgroundColor: 'rgba(244, 114, 182, 0.12)',
  },
  vignette: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
