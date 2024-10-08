/* eslint-disable react/hook-use-state -- TODO: Fix later */
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { useAuthStore } from '@w-store/ZustandStore';
import { trpc } from '@w-utils/trpc';
import { refreshTokens } from '@w-utils/refreshTokens';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3002/trpc', // TODO: Replace with .env
          async fetch(url, options) {
            const fetchOptions: RequestInit = {
              ...options,
              credentials: 'include',
              headers: {
                ...options?.headers,
                Authorization: `Bearer ${useAuthStore.getState().accessToken ?? ''}`,
              },
            };

            const response = await fetch(url, fetchOptions);

            if (response.status === 401) {
              console.log('SHOULD RETRY REFRESHTOKENS');

              try {
                await refreshTokens();
                return fetch(url, fetchOptions);
              } catch (error) {
                console.log('Refresh token failed', error);
              }
            }

            return response;
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
