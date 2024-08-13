'use client';

import { type FC } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { trpc } from '@w-utils/trpc';
import { useAuthStore } from '@w-store/ZustandStore';

export const SignOut: FC = () => {
  const { setUnauthenticated } = useAuthStore();
  const pathName = usePathname();
  const router = useRouter();

  const fromPage = pathName ? `?fromPage=${encodeURIComponent(pathName)}` : '';

  const signOutMutation = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      setUnauthenticated();
      router.push(`/login${fromPage}`);
    },
    onError: (error) => {
      console.error('Error signing out', error);
      toast.error(JSON.stringify(error));
    },
  });

  const handleSignOut = () => {
    signOutMutation.mutate();
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
