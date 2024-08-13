// 'use server' // ZZZ: DO NOT REMOVE

import type { FC, PropsWithChildren } from 'react';
import { TopBackButton } from '@w-components/UI';
// import { getSession } from '@/lib/session/get-session';
// import AutoLogout from '@/components/AutoLogout';

const AuthenticatedLayout: FC<PropsWithChildren> = ({ children }) => {
  // const AuthenticatedLayout: FC<PropsWithChildren> = async ({ children }) => {
  // const { user } = await getSession();
  // TODO: Maybereplace with client-side check to avoid SSR and optimize performance
  // Global no auth guard

  // if (!user) {
  //   console.error('Session expired');
  //   return <AutoLogout />;
  // }

  // const maxSessionEndingTime = user.maxSessionEndingTime
  //   ? new Date(user.maxSessionEndingTime).getTime()
  //   : null;

  // const currentTime = Date.now();

  // if (!maxSessionEndingTime || currentTime > maxSessionEndingTime) {
  //   console.error('Session expired');
  //   return <AutoLogout />;
  // }

  return (
    <section className="grid grid-cols-[264px_1fr] gap-4 mt-[64px] h-[calc(100vh_-_64px)]">
      {/* Include shared UI here e.g. a header or sidebar */}
      <aside className="shadow bg-white h-full p-2">Dashboard links here</aside>

      <div className="container mx-auto px-4 py-8">
        <TopBackButton />

        {children}
      </div>
    </section>
  );
};

export default AuthenticatedLayout;
