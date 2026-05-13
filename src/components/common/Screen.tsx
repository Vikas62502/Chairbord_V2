import { useResponsive } from '@/hooks/useResponsive';
import { useAppTheme } from '@/theme/ThemeProvider';
import React, { type PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
  type Edge,
} from 'react-native-safe-area-context';

export type ScreenProps = PropsWithChildren<{
  /** When true, content scrolls; otherwise fills the safe area. */
  scroll?: boolean;
  /**
   * iOS only: use on screens with text fields. Android uses `adjustResize` in the manifest.
   * @default false
   */
  keyboardAvoiding?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
}>;

const defaultEdges: Edge[] = ['top', 'left', 'right', 'bottom'];

function ContentColumn({
  isTablet,
  maxWidth,
  children,
}: PropsWithChildren<{ isTablet: boolean; maxWidth: number }>): React.JSX.Element {
  if (isTablet) {
    return (
      <View style={[styles.column, { maxWidth, alignSelf: 'center' }]}>{children}</View>
    );
  }
  return <View style={styles.fullWidth}>{children}</View>;
}

export function Screen({
  children,
  scroll = true,
  keyboardAvoiding = false,
  contentContainerStyle,
  edges = defaultEdges,
}: ScreenProps): React.JSX.Element {
  const theme = useAppTheme();
  const responsive = useResponsive();
  const insets = useSafeAreaInsets();

  const { horizontalPadding: paddingH, isTablet, contentColumnMaxWidth } = responsive;
  const bottomPad = Math.max(theme.spacing.xxl, insets.bottom + theme.spacing.md);

  const scrollBody = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingHorizontal: paddingH,
          paddingBottom: bottomPad,
          paddingTop: theme.spacing.xs,
        },
        contentContainerStyle,
      ]}
    >
      <ContentColumn isTablet={isTablet} maxWidth={contentColumnMaxWidth}>
        {children}
      </ContentColumn>
    </ScrollView>
  );

  const wrappedScroll =
    keyboardAvoiding && Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={insets.top}
      >
        {scrollBody}
      </KeyboardAvoidingView>
    ) : (
      scrollBody
    );

  if (scroll) {
    return (
      <SafeAreaView
        edges={edges}
        style={[styles.flex, { backgroundColor: theme.colors.background }]}
      >
        {wrappedScroll}
      </SafeAreaView>
    );
  }

  const staticBody = (
    <View style={[styles.flex, { paddingHorizontal: paddingH }]}>
      <ContentColumn isTablet={isTablet} maxWidth={contentColumnMaxWidth}>
        {children}
      </ContentColumn>
    </View>
  );

  const wrappedStatic =
    keyboardAvoiding && Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={insets.top}
      >
        {staticBody}
      </KeyboardAvoidingView>
    ) : (
      staticBody
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
    >
      {wrappedStatic}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  column: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
});
