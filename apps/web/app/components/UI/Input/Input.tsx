'use client';

import {
  type InputHTMLAttributes,
  type ForwardedRef,
  type FC,
  forwardRef,
  useState,
} from 'react';
import { classNames } from '../../../util';
import { EyeClosedIcon, EyeOpenIcon } from '../../../icons';

export interface IInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isError?: boolean;
  className?: string;
  revealable?: boolean; // new prop to determine if the field is a revealable password field
}

export const Input: FC<IInput> = forwardRef(function Input(
  { className, isError, revealable, type, ...props },
  ref: ForwardedRef<HTMLInputElement>
) {
  const [revealed, setRevealed] = useState(false);

  const toggleReveal = (): void => {
    setRevealed((prev) => !prev);
  };

  const inputType = revealable && revealed ? 'text' : type;

  return (
    <div className="relative">
      <input
        ref={ref}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className={classNames(
          'border border-slate-300 p-2 rounded w-full text-slate-800',
          isError && 'border-red-500',
          className
        )}
        type={inputType}
        {...props}
      />

      {type === 'password' && revealable ? (
        <button
          type="button"
          onClick={toggleReveal}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-slate-400"
        >
          {revealed ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
      ) : null}
    </div>
  );
});
