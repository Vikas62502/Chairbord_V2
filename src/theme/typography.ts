import type { TextStyle } from 'react-native';

export type TextVariant = keyof typeof textVariants;

export const textVariants = {
  display: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 34,
  } satisfies TextStyle,
  headline: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.25,
    lineHeight: 26,
  } satisfies TextStyle,
  title: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
  } satisfies TextStyle,
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } satisfies TextStyle,
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  } satisfies TextStyle,
  caption: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  } satisfies TextStyle,
  overline: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: 14,
    textTransform: 'uppercase',
  } satisfies TextStyle,
} as const;
