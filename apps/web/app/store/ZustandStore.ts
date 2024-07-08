import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

export type TSessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

type TSessionUser = {
  id: string;
  email: string;
};

type IJwtPayload = {
  id: string;
  email: string;
};

type IAccessToken = {
  accessToken: string;
};

interface IAuthStore {
  user: TSessionUser | null;
  authStatus: TSessionStatus;
  isRefetching: boolean;
  accessToken: string | null;
  authSessionMessage: string | null;
  // sessionExpiresIn: number | null;
  errorToastAuthError: (error: unknown) => void;
  setUser: (user: TSessionUser) => void;
  signIn: (accessToken: string) => TSessionUser;
  // signOut: () => Promise<void>;
  setAuthStatus: (status: TSessionStatus) => void;
  setAuthenticated: (user: TSessionUser, token: string) => void;
  setUnauthenticated: () => void;
  setAccessToken: (token: string) => void;
  decodeToken: (token: string) => IJwtPayload;
  // tryRefreshTokens: () => Promise<boolean>;
}

const useAuthStore = create<IAuthStore>()(
  devtools(
    (set, get): IAuthStore => ({
      user: null,
      authStatus: 'loading',
      isRefetching: false,
      accessToken: null,
      authSessionMessage: null,
      // sessionExpiresIn: null,
      setUser: (user) => {
        set({ user });
      },
      setAuthStatus: (status) => {
        set({ authStatus: status });
      },
      setAuthenticated: (user: TSessionUser, token: string) => {
        set({
          user,
          accessToken: token,
          authStatus: 'authenticated',
          // sessionExpiresIn: maxSessionEndingTime,
        });
      },
      setUnauthenticated: () => {
        set({
          authStatus: 'unauthenticated',
          user: null,
          accessToken: null,
        });
      },
      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
      decodeToken: (token: string) => {
        return jwtDecode<IJwtPayload>(token);
      },
      errorToastAuthError: (error: unknown) => {
        console.log('errorToastAuthError:', JSON.stringify(error, null, 2));

        toast.error('Something went wrong. Please try again.');
      },
      signIn: (accessToken: string) => {
        console.log('response from signIn:', accessToken);

        const { id, email } = get().decodeToken(accessToken);

        const user: TSessionUser = { id, email };

        get().setAuthenticated(user, accessToken);
        return user;
      },

      // signOut: async () => {
      //   try {
      //     const isRefreshed = await get().tryRefreshTokens();

      //     if (!isRefreshed) {
      //       throw new Error('Failed to refresh tokens');
      //     }

      //     await authApi
      //       .headers({
      //         Authorization: `Bearer ${String(get().accessToken)}`,
      //       })
      //       .url('/logout')
      //       .post({});

      //     get().setUnauthenticated();
      //   } catch (error: unknown) {
      //     console.error('Error logging out:', error);
      //     get().errorToastAuthError(error);
      //   }
      // },
      // tryRefreshTokens: async () => {
      //   try {
      //     set({ isRefetching: true });

      //     const { accessToken }: IAccessToken = (await authApi
      //       .url('/try-refresh-tokens')
      //       .post({})) as IAccessToken;

      //     const { user, maxSessionEndingTime } =
      //       get().decodeToken(accessToken);

      //     console.log(
      //       'decodedToken from tryRefreshTokens:',
      //       user,
      //       maxSessionEndingTime
      //     );

      //     set({
      //       user,
      //       accessToken,
      //       authStatus: 'authenticated',
      //       sessionExpiresIn: maxSessionEndingTime,
      //       isRefetching: false,
      //     });

      //     return true;
      //   } catch (error: unknown) {
      //     console.error('Error refreshing tokens', error);

      //     get().errorToastAuthError(
      //       'Your session has expired. Please log in again.'
      //     );
      //     get().setUnauthenticated();
      //     set({ isRefetching: false });

      //     return false;
      //   }
      // },
    })
  )
);

export default useAuthStore;
