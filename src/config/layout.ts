/**
 * Layout breakpoints and production UI constants (dp / logical px).
 */
export const LAYOUT = {
  /** Shorter screen edge at or above this → treat as tablet / large layout. */
  tabletMinShorterSide: 600,
  /** Narrow phones (e.g. small Android). */
  compactMaxWidth: 360,
  /** Max readable column width on large phones & tablets. */
  maxContentWidth: 560,
  /** Minimum tap target (Material / WCAG-friendly). */
  minTouchTarget: 48,
} as const;
