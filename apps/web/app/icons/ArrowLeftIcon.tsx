import type { FC, SVGAttributes } from 'react'

export const ArrowLeftIcon: FC<SVGAttributes<SVGSVGElement>> = props => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M6 8L2 12L6 16" />
        <path d="M2 12H22" />
    </svg>
)
