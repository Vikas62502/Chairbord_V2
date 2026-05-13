import { LAYOUT } from '@/config/layout';
import { useWindowDimensions } from 'react-native';

export type ResponsiveInfo = {
  width: number;
  height: number;
  /** Shorter side of the window (rotation-safe). */
  shorterSide: number;
  fontScale: number;
  isTablet: boolean;
  isCompactWidth: boolean;
  isLandscape: boolean;
  /** Horizontal inset for screen padding (logical px). */
  horizontalPadding: number;
  /** Max width for a centered content column (logical px). */
  contentColumnMaxWidth: number;
};

/**
 * Window dimensions + breakpoints for responsive padding and max content width.
 * Re-renders on rotation and fold changes.
 */
export function useResponsive(): ResponsiveInfo {
  const { width, height, fontScale } = useWindowDimensions();
  const shorterSide = Math.min(width, height);
  const isLandscape = width > height;
  const isTablet = shorterSide >= LAYOUT.tabletMinShorterSide;
  const isCompactWidth = width < LAYOUT.compactMaxWidth;

  const horizontalPadding = isTablet
    ? 28
    : isCompactWidth
      ? 12
      : 20;

  const contentColumnMaxWidth = isTablet
    ? Math.min(LAYOUT.maxContentWidth, width - horizontalPadding * 2)
    : width - horizontalPadding * 2;

  return {
    width,
    height,
    shorterSide,
    fontScale,
    isTablet,
    isCompactWidth,
    isLandscape,
    horizontalPadding,
    contentColumnMaxWidth,
  };
}
