import { type FC } from 'react'
import { classNames } from '@w-utils/classNames'

export interface ICard {
    children: React.ReactNode
    className?: string
    asTag?: string
}

export const Card: FC<ICard> = ({
    children,
    className = '',
    asTag = 'div',
}) => {
    const Tag = asTag as keyof JSX.IntrinsicElements

    return (
        <Tag
            className={classNames(
                'rounded shadow py-1 px-4 bg-white',
                className
            )}
        >
            {children}
        </Tag>
    )
}
