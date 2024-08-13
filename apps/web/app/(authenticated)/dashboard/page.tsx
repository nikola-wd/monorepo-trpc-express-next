import React from 'react';

const DashBoardPage = () => {
  return <div>DashBoardPage</div>;
};

export default DashBoardPage;

/*
'use client';

import { type ReactElement } from 'react';
import Link from 'next/link';
// import * as Sentry from '@sentry/nextjs';
import { Flex } from '@w-components/UI';
import { useSession } from '@w-hooks/useSession';

export default function DashboardPage(): ReactElement {
  const { user } = useSession();

  const isSuperAdmin = user?.roles?.includes('superadmin');

  // if (user?.email) {
  //   Sentry.setUser({ email: user.email });
  // }

  return (
    <Flex as="ul" flow="col" className="gap-2 max-w-fit">
      {isSuperAdmin ? (
        <li className="bg-white rounded-md py-2 px-4 text-slate-600">
          <Link href="/dashboard/superadmin">Go to SuperAdmin Dashboard</Link>
        </li>
      ) : (
        <>
          <li>
            <Link
              className="bg-white rounded-md py-2 px-4 text-slate-600 w-fFlexl block"
              href="/dashboard/owner"
            >
              Go to Owner Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="bg-white rounded-md py-2 px-4 text-slate-600 w-full block"
              href="/dashboard/client"
            >
              Go to Client Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="bg-white rounded-md py-2 px-4 text-slate-600 w-full block"
              href="/dashboard/employee"
            >
              Go to Employee Dashboard
            </Link>
          </li>
        </>
      )}
    </Flex>
  );
}


*/
