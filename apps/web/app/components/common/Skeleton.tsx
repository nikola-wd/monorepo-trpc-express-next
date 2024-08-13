import type { FC, HTMLAttributes } from 'react';
import { classNames } from '@w-utils/classNames';

export interface ISkeleton extends HTMLAttributes<HTMLSpanElement> {
  repeat?: number;
}

export const Skeleton: FC<ISkeleton> = ({
  repeat,
  children,
  className,
  ...props
}) => {
  const cls = classNames('inline-flex animate-pulse bg-slate-300', className);

  if (repeat) {
    return (
      <>
        {Array.from({ length: repeat }).map((_, index) => {
          const key = index.toString();
          return <span key={key} className={cls} {...props} />;
        })}
      </>
    );
  }

  return <>{children ?? <span className={cls} {...props} />}</>;
};
