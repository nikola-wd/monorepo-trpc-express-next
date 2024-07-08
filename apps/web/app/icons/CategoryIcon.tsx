import type { FC, SVGAttributes } from 'react'

export const CategoryIcon: FC<SVGAttributes<SVGSVGElement>> = props => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" {...props}>
            <rect x="0" fill="none" width="20" height="20" />
            <path d="M5 7h13v10H2V4h7l2 2H4v9h1V7z" />
        </svg>
    )
}
