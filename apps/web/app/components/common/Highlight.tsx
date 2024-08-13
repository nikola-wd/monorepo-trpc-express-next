import { type FC } from 'react';
import _ from 'lodash';
import { classNames } from '@w-utils/classNames';

export interface IHighlighted {
  text?: string;
  highlight?: string;
  className?: string;
  highlightClassName?: string;
}

export const Highlighted: FC<IHighlighted> = ({
  text = '',
  highlight = '',
  className,
  highlightClassName,
}) => {
  if (!highlight.trim()) {
    return <span className={className}>{text}</span>;
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts
        .filter((part) => part)
        .map((part, i) => {
          const key = part + i.toString();
          return regex.test(part) ? (
            <mark
              key={key}
              className={classNames(
                'bg-transparent bg-gradient-to-t from-[#FFEA2B] to-transparent text-current',
                highlightClassName
              )}
            >
              {part}
            </mark>
          ) : (
            <span key={key}>{part}</span>
          );
        })}
    </span>
  );
};
