import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { classNames } from '@w-utils/classNames';
import { shared, variants } from './variants';

const flex = cva(shared, {
  variants,

  defaultVariants: {
    display: 'base',
  },
});

interface IFlexProps
  extends HTMLAttributes<HTMLElement>,
    PropsWithChildren,
    VariantProps<typeof flex> {
  as?:
    | 'div'
    | 'span'
    | 'section'
    | 'ul'
    | 'ol'
    | 'li'
    | 'aside'
    | 'header'
    | 'footer'
    | 'button';
}

export const Flex: FC<IFlexProps> = ({
  display,
  flow,
  justify,
  items,
  self,
  selfJustify,
  place,
  className,
  children,
  as: Tag = 'div',
  ...rest
}) => {
  const flexClasses = classNames(
    flex({
      display,
      flow,
      justify,
      items,
      self,
      selfJustify,
      place,
      className,
    })
  );

  return (
    <Tag className={flexClasses} {...rest}>
      {children}
    </Tag>
  );
};
