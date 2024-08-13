import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

export interface IForm
    extends HTMLAttributes<HTMLFormElement>,
        PropsWithChildren {}

export const Form: FC<IForm> = ({ children, ...props }) => {
    return <form {...props}>{children}</form>
}
