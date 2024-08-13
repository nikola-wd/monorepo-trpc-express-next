'use client';

import { type FC } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeftIcon } from '@w-icons/index';
import { Button } from './Button/Button';

export const TopBackButton: FC = () => {
  const pathName = usePathname() || '/dashboard';

  const backURL = pathName.split('/').slice(0, -1).join('/');

  if (pathName === '/dashboard') return null;

  return (
    <div className="mb-4 pb-2 border-b-[1px] border-white">
      <Button
        aslink="true"
        href={backURL}
        theme="neutral"
        size="small"
        className="px-8 shadow-md"
      >
        <ArrowLeftIcon className="stroke-slate-800 size-6 mr-2" />
        Back
      </Button>
    </div>
  );
};
