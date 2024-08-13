import type { FC, HTMLAttributes } from 'react';
import { classNames } from '@w-utils/classNames';

export type TTxt = HTMLAttributes<HTMLParagraphElement>;

export const Txt: FC<TTxt> = ({ children, className, ...props }) => {
  return (
    <p
      className={classNames('text-slate-600 leading-tight', className)}
      {...props}
    >
      {children}
    </p>
  );
};
