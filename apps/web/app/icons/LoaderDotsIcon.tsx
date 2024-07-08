import type { FC, SVGAttributes } from 'react'

export const LoaderDotsIcon: FC<SVGAttributes<SVGSVGElement>> = props => {
    return (
        <svg
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            {...props}
        >
            <circle stroke="none" cx="6" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1"
                />
            </circle>
            <circle stroke="none" cx="26" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.2"
                />
            </circle>
            <circle stroke="none" cx="46" cy="50" r="6">
                <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.3"
                />
            </circle>
        </svg>
    )
}
