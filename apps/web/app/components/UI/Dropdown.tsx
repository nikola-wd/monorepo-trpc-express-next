'use client';

import {
  type FC,
  type ReactElement,
  type ReactNode,
  cloneElement,
  useEffect,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from '@w-hooks/index';
import { classNames } from '@w-utils/classNames';
import { Button } from './Button';

type THandleClose = () => void;

export interface IDropdown {
  children: (handleClose: THandleClose) => JSX.Element | ReactNode;
  trigger?: ReactElement | string;
  className?: string;
  classNameContentWrap?: string;
  classNameContent?: string;
  autoClose?: boolean;
  transitionMode?: 'opacity' | 'slide';
  outsideToggle?: boolean;
  onClose?: () => void;
  onToggle?: (open: boolean) => void;
}

export const Dropdown: FC<IDropdown> = ({
  trigger = '',
  className,
  classNameContentWrap,
  classNameContent,
  children,
  autoClose = true,
  transitionMode = 'opacity',
  outsideToggle,
  onClose,
  onToggle,
}) => {
  const [open, setOpen] = useState(false);

  const isSlide = transitionMode === 'slide';

  const handleClose: THandleClose = () => {
    if (open && autoClose) {
      setOpen(false);
      onToggle?.(false);
      onClose?.();
    }
  };

  const getRef = useOnClickOutside(() => {
    handleClose();
  });

  useEffect(() => {
    if (typeof outsideToggle === 'boolean' && outsideToggle !== open) {
      setOpen(outsideToggle);
      onToggle?.(outsideToggle);
    }
  }, [outsideToggle, onToggle, open]);

  const handleClick = (): void => {
    setOpen((prev) => {
      onToggle?.(!prev);
      typeof outsideToggle !== 'boolean' && prev && onClose?.();
      return !prev;
    });
  };

  return (
    <div
      ref={getRef}
      className={classNames('relative inline-block', className)}
    >
      {typeof trigger === 'string' ? (
        <Button onClick={handleClick}>
          {!trigger.length ? 'Open' : trigger}
        </Button>
      ) : (
        cloneElement(trigger, {
          onClick: handleClick,
          ...trigger.props,
          'aria-expanded': open,
        })
      )}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{
              opacity: 0,
              ...(isSlide ? { y: -10 } : {}),
            }}
            animate={{
              opacity: 1,
              ...(isSlide ? { y: 0 } : {}),
            }}
            exit={{
              opacity: 0,
              ...(isSlide ? { y: -10 } : {}),
            }}
            className={classNames(
              'absolute left-0 z-50 w-full top-full',
              classNameContentWrap
            )}
          >
            <div
              className={classNames(
                'absolute top-full left-1/2 -translate-x-1/2 translate-y-2 p-2 w-full bg-white rounded shadow-lg border border-slate-300 max-h-60 overflow-y-auto',
                classNameContent
              )}
            >
              {typeof children === 'function'
                ? children(handleClose)
                : children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
