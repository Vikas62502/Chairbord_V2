/**
 * Semantic color roles — same keys for light and dark for predictable styling.
 */
export type ThemePalette = {
  primary: string;
  primaryPressed: string;
  secondary: string;
  onPrimary: string;
  onSecondary: string;
  background: string;
  backgroundElevated: string;
  surface: string;
  surfaceMuted: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderSubtle: string;
  error: string;
  success: string;
  /** Large header / hero band tint */
  heroTint: string;
};

export const lightPalette: ThemePalette = {
  primary: '#0B5CAD',
  primaryPressed: '#084A8F',
  secondary: '#0D9488',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  background: '#F3F6FA',
  backgroundElevated: '#E8EEF5',
  surface: '#FFFFFF',
  surfaceMuted: '#F8FAFC',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  border: '#E2E8F0',
  borderSubtle: '#F1F5F9',
  error: '#DC2626',
  success: '#059669',
  heroTint: '#E0F2FE',
};

export const darkPalette: ThemePalette = {
  primary: '#38BDF8',
  primaryPressed: '#0EA5E9',
  secondary: '#2DD4BF',
  onPrimary: '#0B1220',
  onSecondary: '#0B1220',
  background: '#0B1220',
  backgroundElevated: '#111B2E',
  surface: '#151E2E',
  surfaceMuted: '#1E293B',
  text: '#F1F5F9',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  border: '#334155',
  borderSubtle: '#1E293B',
  error: '#F87171',
  success: '#34D399',
  heroTint: '#0C4A6E',
};
