import React, { type PropsWithChildren } from 'react';

/**
 * Root navigator — replace inner tree with `NavigationContainer` + stacks when ready.
 */
export function RootNavigator({ children }: PropsWithChildren): React.JSX.Element {
  return <>{children}</>;
}
