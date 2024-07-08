import type { FC, SVGAttributes } from 'react'

export const CloseIcon: FC<SVGAttributes<SVGSVGElement>> = props => (
    <svg viewBox="0 0 18 18" {...props}>
        <path d="M9 7.1L15.6.5l1.9 1.9L10.9 9l6.6 6.6-1.9 1.9L9 10.9l-6.6 6.6-1.9-1.9L7.1 9 .5 2.4 2.4.5 9 7.1z" />
    </svg>
)
