'use client';

import { type FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
// import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { SignOut } from '@w-components/auth/SignOut';
import { useSession } from '@w-hooks/useSession';
import { Button, Dropdown, Flex } from '@w-components/UI';
import { Skeleton } from '@w-components/common/Skeleton';
import { ArrowTopIcon, CloseIcon, HamburgerIcon } from '@w-icons/index';

const EXPIRATION_THRESHOLD = 5000; // 5 seconds in milliseconds

interface ITopBarLink {
  href: string;
  label: string;
}
const TopBarLink: FC<ITopBarLink> = ({ href, label }) => {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      {label}
    </Link>
  );
};

export const TopBar: FC = () => {
  const { authStatus, user, sessionExpiresIn } = useSession();

  const [showMenu, setShowMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const [showExpirationNotification, setShowExpirationNotification] =
    useState(false);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      if (sessionExpiresIn) {
        const remainingTime = new Date(sessionExpiresIn).getTime() - now;
        setTimeLeft(Math.max(0, remainingTime));
        setShowExpirationNotification(remainingTime <= EXPIRATION_THRESHOLD);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [sessionExpiresIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // const userNameInitials = user?.name
  //   ?.split(' ')
  //   .map((n: string) => n[0])
  //   .join('');

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-[2]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Flex items="center">
          <div className="h-8 w-8 bg-purple-200 rounded-md mr-4 text-purple-600" />
          <Link href="/" className="text-purple-900 text-lg font-medium">
            Saloon5
          </Link>

          <Link
            href="/"
            className="px-2 text-purple-600 ml-4 hover:text-purple-800 transition text-sm"
          >
            Home
          </Link>
          <Link
            href="/test-ssr-example"
            className="px-2 text-purple-600 hover:text-purple-800 transition text-sm"
          >
            Test SSR (protected)
          </Link>

          {authStatus === 'loading' ? (
            <Skeleton className="h-6 w-20 rounded-md" />
          ) : null}

          {authStatus === 'authenticated' && user ? (
            <>
              <Link
                href="/dashboard"
                className="px-2 text-purple-600 hover:text-purple-800 transition text-sm"
              >
                Dashboard
              </Link>

              <div className="p-2 bg-slate-800 text-white text-xs">
                {sessionExpiresIn ? (
                  <>
                    <span className="mr-1">Expires in:</span>
                    {format(new Date(sessionExpiresIn), 'MM/dd/yyyy/HH:mm:ss')}

                    <span>
                      <br />
                      Current time:{' '}
                      {format(new Date(currentTime), 'MM/dd/yyyy/HH:mm:ss')}
                    </span>

                    {showExpirationNotification ? (
                      <div className="fixed bottom-2 right-2 p-2 bg-yellow-500 text-black rounded">
                        Your session expires in{' '}
                        <strong>{format(new Date(timeLeft), 'mm:ss')}</strong> .
                        Make sure to save your work before it expires, or
                        relogin to increase the time.
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            </>
          ) : null}
        </Flex>

        {authStatus !== 'loading' ? (
          <>
            {user ? (
              <Dropdown
                classNameContent="w-60 right-0 left-auto translate-x-0"
                transitionMode="slide"
                trigger={
                  <Button size="small" theme="neutral">
                    <span className="hidden sm:inline mr-2 text-purple-600">
                      {user.email}
                      {/* {userName?.split(' ')[0] ?? user?.email} */}
                    </span>
                    <Flex
                      place="center"
                      className="h-8 w-8 bg-slate-600 rounded-full mr-2"
                    >
                      {/* {typeof user?.image === 'string' ? (
                        <Image
                          src={user.image}
                          width={32}
                          height={32}
                          alt={`${userName ?? user.email}'s avatar`}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <>
                          {userNameInitials ? (
                            <span className="text-white text-xs">
                              {userNameInitials}
                            </span>
                          ) : null}
                        </>
                      )} */}
                    </Flex>
                    <ArrowTopIcon />
                  </Button>
                }
              >
                {(handleClose) => (
                  <>
                    <Link
                      href="/dashboard/profile/"
                      onClick={handleClose}
                      className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded"
                    >
                      Profile
                    </Link>

                    <hr className="my-2" />
                    <SignOut />
                  </>
                )}
              </Dropdown>
            ) : (
              <Flex>
                <Link href="/login" className="text-purple-900 text-sm mr-4">
                  Log in
                </Link>
                <Link href="/signup" className="text-purple-900 text-sm">
                  Sign up
                </Link>
              </Flex>
            )}
          </>
        ) : (
          <Skeleton className="h-6 w-48 rounded-md" />
        )}

        <button
          type="button"
          className="sm:hidden text-purple-900"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <HamburgerIcon />
        </button>
      </nav>

      <AnimatePresence>
        {showMenu ? (
          <motion.nav
            key="mobile-menu"
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right"
            initial={{ opacity: 0, translateY: -16 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -16 }}
          >
            <div className="rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex justify-between items-center">
                <div>
                  <div className="h-8 w-8 bg-purple-200 rounded-md" />
                </div>
                <div className="-mr-2">
                  <Button
                    theme="neutral"
                    size="small"
                    className=" text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => {
                      setShowMenu(false);
                    }}
                  >
                    <span className="sr-only">Close menu</span>
                    <CloseIcon />
                  </Button>
                </div>
              </div>
              <div className="pt-5 pb-6">
                <div className="px-2 space-y-1">
                  <TopBarLink href="/" label="Home" />

                  {user ? (
                    <TopBarLink href="/dashboard" label="Dashboard" />
                  ) : null}
                </div>
              </div>
              <div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  {user ? (
                    <Flex items="center" justify="between" className="px-5">
                      <Flex items="center">
                        <div className="h-10 w-10 bg-purple-200 rounded-full mr-4" />
                        <span>{user.email}</span>
                      </Flex>

                      <Link
                        href="/dashboard/profile/"
                        className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full rounded"
                      >
                        Profile
                      </Link>

                      <hr className="my-2" />
                      <SignOut />
                    </Flex>
                  ) : (
                    <div className="mt-3 px-2 space-y-1">
                      <TopBarLink href="/login" label="Log in" />
                      <TopBarLink href="/signup" label="Sign up" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
