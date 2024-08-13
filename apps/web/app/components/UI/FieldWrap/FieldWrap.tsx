import type {
  FC,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { classNames } from '@w-utils/classNames';

export interface IFieldWrap
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  label?: string | ReactElement;
  error?: string | { message?: string; type?: string };
  className?: string;
  labelClassName?: string;
}

export const FieldWrap: FC<IFieldWrap> = ({
  label,
  error,
  className,
  labelClassName,
  children,
  ...props
}) => {
  const labelCls = classNames(
    'absolute top-0 left-2 leading-tight text-sm bg-white px-1 font-semibold z-10 -translate-y-[0.75em] pointer-events-none text-slate-500',
    labelClassName
  );

  const errorMessage = typeof error === 'object' ? error.message : error;
  return (
    <div className={classNames('relative', className)} {...props}>
      {Boolean(label) && <span className={labelCls}>{label}</span>}
      {children}

      <AnimatePresence initial={false}>
        {Boolean(error) && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={classNames(
              'text-red-500 text-sm absolute z-[1] top-full left-0 mt-0.5 whitespace-nowrap',
              className
            )}
          >
            {errorMessage}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};
