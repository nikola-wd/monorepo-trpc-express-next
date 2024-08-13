import { type FC, type PropsWithChildren, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@w-store/ZustandStore';

export const excludedPathsForRefreshToken = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setUnauthenticated } = useAuthStore();

  const pathName = usePathname();
  // TODO: Fix this
  useEffect(() => {
    const initAuthStatus = (): void => {
      const path = window.location.pathname;

      if (excludedPathsForRefreshToken.includes(path)) {
        // Directly set the auth status to 'unauthenticated' for specific routes
        setUnauthenticated();
      }
    };

    initAuthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fix
  }, []);

  // try refresh token for pages that don't have queries
  // TODO: DO THIS BETTER!!!!!!!
  useEffect(() => {
    if (!pathName) return;

    if (
      pathName === '/' ||
      (pathName.includes('/dashboard') &&
        !excludedPathsForRefreshToken.includes(pathName))
    ) {
      console.log('___TRYING TO REFRESH TOKENS ON APP IN SESSION PROVIDER___');
      useAuthStore
        .getState()
        .tryRefreshTokens()
        .catch((err: unknown) => {
          console.log('Error refreshing tokens in SessionProvider:', err);
        });
    }
  }, [pathName]);

  return <>{children}</>;
};
