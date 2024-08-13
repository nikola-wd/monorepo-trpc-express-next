import type {} from '@redux-devtools/extension';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { type AppRouter } from '@w-api/src/routers';

export type TSessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

// TODO: Remove this and use from shared
const UserRoles = {
  owner: 'owner',
  client: 'client',
  employee: 'employee',
  superadmin: 'superadmin',
  // TODO: create one more for auth (unauthenticated)
  all: 'all', // this signifies no specific role requirement
};

type TUserRole = keyof typeof UserRoles;

interface TSessionUser {
  id: string;
  email: string;
  roles?: TUserRole[];
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
  errorToastAuthError: (error: unknown) => void;
  setUser: (user: TSessionUser) => void;
  signIn: (accessToken: string) => TSessionUser;
  setAuthStatus: (status: TSessionStatus) => void;
  setUnauthenticated: () => void;
  setAccessToken: (token: string) => void;
  decodeToken: (token: string) => IJwtPayload;
  tryRefreshTokens: () => Promise<boolean>;
}

export const useAuthStore = create<IAuthStore>()(
  devtools((set, get): IAuthStore => {
    // Create a minimal vanilla tRPC client for refreshTokens
    const vanillaTrpcClient = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3002/trpc', // TODO: Replace with .env
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
              headers: {
                ...options?.headers,
                Authorization: `Bearer ${get().accessToken ?? ''}`,
              },
            });
          },
        }),
      ],
    });

    return {
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

      // TODO: Type better
      errorToastAuthError: (error) => {
        console.log('errorToastAuthError:', JSON.stringify(error, null, 2));
        toast.error('Something went wrong. Please try again.');

        /* if (error instanceof WretchError) {
          console.log('error name:', error.name);
          if (error.json) {
            // Assuming the error response is structured like { message: "...", error: "...", statusCode: ... }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- fix
            const errorJson: IAuthError = error.json;
            toast.error(
              errorJson.message || 'Something bad happened, try again later.'
            );
          } else {
            // Generic catch-all for other types of errors
            toast.error('Something went wrong. Please try again.');
          }
        } else {
          // Fallback for errors not encapsulated by WretchError
          toast.error('An unexpected error occurred. Try again later.'); // might be that the server is down
        } */
      },
      tryRefreshTokens: async () => {
        console.log('CALLED VANILLA TRPC');

        try {
          set({ isRefetching: true });

          // Assuming the refresh token is sent automatically via cookies or headers,
          // and that the server responds with a new access token on success.
          // Use tRPC to call the refreshTokens mutation
          const response = await vanillaTrpcClient.auth.refreshTokens.mutate();

          const { accessToken } = response;

          const { id, email, maxSessionEndingTime } =
            get().decodeToken(accessToken);

          const user: TSessionUser = { id, email };

          console.log(
            'decodedToken from tryRefreshTokens:',
            user,
            maxSessionEndingTime
          );

          set({
            user,
            accessToken,
            authStatus: 'authenticated',
            sessionExpiresIn: maxSessionEndingTime,
            isRefetching: false,
          });

          return true;
        } catch (error: unknown) {
          console.error('Error refreshing tokens', error);

          // if (error instanceof WretchError) {
          //   console.error('Wretch error:', error.message);
          //   if (error.json) {
          //     console.error(
          //       'Wretch error JSON:',
          //       JSON.stringify(error.json, null, 2)
          //     );

          //     if ('message' in error.json) {
          //       if (
          //         // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- TODO: fix later
          //         (error.json.message as string).includes(
          //           'Invalid or expired refresh token.'
          //         )
          //       ) {
          //         console.log(
          //           'Invalid or expired refresh token: ',
          //           window.location.href
          //         );
          //       }
          //     }
          //   }
          // } else {
          //   console.error('Non-Wretch error:', error);
          // }

          get().errorToastAuthError(
            'Your session has expired. Please log in again.'
          );
          get().setUnauthenticated();
          set({ isRefetching: false });

          return false;
        }
      },
    };
  })
);
