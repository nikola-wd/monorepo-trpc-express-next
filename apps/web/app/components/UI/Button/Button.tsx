'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Link, { type LinkProps } from 'next/link';
import { LoaderIcon } from '@w-icons/index';
import { classNames } from '@w-utils/classNames';
import { shared, variants } from './variants';

const button = cva(shared, {
  variants,
  defaultVariants: {
    theme: 'primary',
    size: 'medium',
    rounded: 'md',
  },
});

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  href?: string;
  type?: 'button' | 'submit';
  isLoading?: boolean;
}

interface BaseLinkProps
  extends LinkProps,
    VariantProps<typeof button>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  // aslink: true
  href: LinkProps['href'];
  isLoading?: boolean;
}

interface IasLink {
  aslink?: 'true' | 'false';
}
export type CustomButtonProps = IasLink & (BaseButtonProps | BaseLinkProps);

export const Button: FC<CustomButtonProps> = ({
  theme,
  rounded,
  size,
  isLoading,
  className,
  children,
  ...rest
}) => {
  const buttonClasses = classNames(button({ theme, rounded, size, className }));

  const InnerContent = (
    <>
      {typeof isLoading !== 'undefined' ? (
        <>
          <span className={classNames(isLoading && 'opacity-0')}>
            {children}
          </span>
          {isLoading ? (
            <LoaderIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          ) : null}
        </>
      ) : (
        children
      )}
    </>
  );

  if (rest.href) {
    'disabled' in rest && delete rest.disabled;

    return (
      <Link
        href={rest.href}
        className={buttonClasses}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {InnerContent}
      </Link>
    );
  }

  const { type = 'button' } = rest;
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      className={buttonClasses}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {InnerContent}
    </button>
  );
};
