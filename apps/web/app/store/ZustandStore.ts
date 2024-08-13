import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export type TSessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface TSessionUser {
  id: string;
  email: string;
}

// TODO: Refactor this and move to packages as in Nest project
interface IJwtPayload {
  id: string;
  email: string;
  maxSessionEndingTime?: number;
}

// interface IAccessToken  {
//   accessToken: string;
// };

interface IAuthStore {
  user: TSessionUser | null;
  authStatus: TSessionStatus;
  isRefetching: boolean;
  accessToken: string | null;
  authSessionMessage: string | null;
  sessionExpiresIn: number | null;
  setUser: (user: TSessionUser) => void;
  signIn: (accessToken: string) => TSessionUser;
  setAuthStatus: (status: TSessionStatus) => void;
  setUnauthenticated: () => void;
  setAccessToken: (token: string) => void;
  decodeToken: (token: string) => IJwtPayload;
  // tryRefreshTokens: () => Promise<boolean>;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    (set, get): IAuthStore => ({
      user: null,
      authStatus: 'loading',
      isRefetching: false,
      accessToken: null,
      authSessionMessage: null,
      sessionExpiresIn: null,
      setUser: (user) => {
        set({ user });
      },
      setAuthStatus: (status) => {
        set({ authStatus: status });
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

      signIn: (accessToken: string) => {
        console.log('response from signIn:', accessToken);

        const { id, email, maxSessionEndingTime } =
          get().decodeToken(accessToken);

        const user: TSessionUser = { id, email };

        set({
          user,
          accessToken,
          authStatus: 'authenticated',
          sessionExpiresIn: maxSessionEndingTime,
        });

        return user;
      },

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
