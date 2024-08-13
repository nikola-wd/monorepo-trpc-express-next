'use client';

import { type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {useAuthStore} from '@store/ZustandStore';

const SignOut: FC = () => {
  const { signOut } = useAuthStore();
  const pathName = usePathname();

  const fromPage = pathName ? `?fromPage=${encodeURIComponent(pathName)}` : '';

  const router = useRouter();

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();

      router.push(`/login${fromPage}`);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
