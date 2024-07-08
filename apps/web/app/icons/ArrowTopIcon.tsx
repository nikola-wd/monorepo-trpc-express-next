import type { FC, SVGAttributes } from 'react'

export const ArrowTopIcon: FC<SVGAttributes<SVGSVGElement>> = props => (
    <svg viewBox="0 0 20 20" width="20" height="20" {...props}>
        <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 1 1-1.414 1.414L11 5.414V16a1 1 0 1 1-2 0V5.414L6.707 7.707a1 1 0 0 1-1.414 0z"
            clipRule="evenodd"
        />
    </svg>
)
