'use client';

import { type FC, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import useAuthStore from "@store/ZustandStore"

const AutoLogout: FC = () => {
  const { signOut } = useAuthStore();
  const pathName = usePathname();
  // prevents the double redirect to the URL with correct query params and then to /login?fromPage=%2Flogin
  const initialPathNameRef = useRef(pathName);

  const fromPage = initialPathNameRef.current
    ? `?fromPage=${encodeURIComponent(initialPathNameRef.current)}`
    : '';

  useEffect(() => {
    const handleSignOut = async (): Promise<void> => {
      try {
        await signOut();
        window.location.href = `/login${fromPage}`;
      } catch (error) {
        console.error('Error signing out', error);
      }
    };

    void handleSignOut();
    // .then()
    // .catch((err: unknown) => {
    //     console.error('Error signing out', err)
    // })
  }, [fromPage, signOut]);

  return null;
};

export default AutoLogout;
