import type { FC, Key, PropsWithChildren } from 'react'
import {
    type AnimatePresenceProps,
    type HTMLMotionProps,
    type Variants,
    AnimatePresence,
    motion,
} from 'framer-motion'

export interface IAnimate
    extends PropsWithChildren,
        Omit<HTMLMotionProps<'div'>, 'children'> {
    isVisible: boolean
    isInitial?: AnimatePresenceProps['initial']
    mode?: AnimatePresenceProps['mode']
    keyID?: Key
}

const DEFAULT_ANIMATION = {
    opacity: 1,
    height: 'auto',
    overflow: 'hidden',
    transitionEnd: {
        overflow: 'visible',
    },
}

export const Animate: FC<IAnimate> = ({
    isVisible,
    className,
    children,
    animate,
    mode,
    isInitial,
    keyID,
    ...props
}) => {
    const variants = {
        initial: { opacity: 0, height: 0, overflow: 'visible' },
        show:
            typeof animate !== 'undefined'
                ? (animate as Variants)
                : DEFAULT_ANIMATION,
        exit: {
            opacity: 0,
            height: 0,
            overflow: 'hidden',
        },
    }

    return (
        <AnimatePresence mode={mode ?? 'wait'} initial={isInitial ?? false}>
            {isVisible ? (
                <motion.div
                    key={keyID}
                    variants={variants}
                    animate="show"
                    initial="initial"
                    exit="exit"
                    transition={{
                        duration: 0.15,
                        ease: 'linear',
                    }}
                    className={className}
                    {...props}
                >
                    {children}
                </motion.div>
            ) : null}
        </AnimatePresence>
    )
}
