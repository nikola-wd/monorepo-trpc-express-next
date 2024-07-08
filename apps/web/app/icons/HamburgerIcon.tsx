import type { FC, SVGAttributes } from 'react'

export const HamburgerIcon: FC<SVGAttributes<SVGSVGElement>> = props => (
    <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        stroke="currentColor"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
)
