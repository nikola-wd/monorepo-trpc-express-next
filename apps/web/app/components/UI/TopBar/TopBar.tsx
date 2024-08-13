'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from '../../../hooks/useSession';
import SignOut from 'app/components/auth/SignOut';

export const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { authStatus, user, sessionExpiresIn } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <Image
              src="/path-to-your-logo.png"
              alt="Logo"
              width={32}
              height={32}
            /> */}
            <div className="rounded-md bg-slate-600 w-[140px] h-10" />
          </div>

          {/* Avatar and Dropdown */}
          {user?.email ? (
            <span className="text-slate-800">{user.email}</span>
          ) : null}
          <div className="relative z-10" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
              }}
              className="flex items-center justify-center size-12 rounded-full bg-gray-200 focus:outline-none"
            >
              {/* <Image
                src="https://source.unsplash.com/random/64x64"
                alt="User Avatar"
                width={64}
                height={64}
                className="rounded-full object-cover size-16"
              /> */}
              <div className="size-10 rounded-full bg-slate-600" />
            </button>

            {isDropdownOpen ? (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <SignOut />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
