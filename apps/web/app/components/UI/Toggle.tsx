'use client'

// TODO: Make this comonent better
// Maybe shadui

import { useId, type FC } from 'react'
import { motion } from 'framer-motion'
import { classNames } from '@w-utils/classNames'
import { Flex } from './Flex'

// TODO: Add disabled / loading state. Used in owner toggle schedule tempalte day

// TODO: Rewrite this toggle
interface IToggleProps {
    labelLeft?: string
    labelRight?: string
    checked: boolean
    isDark?: boolean
    setChecked: (checked: boolean) => void
}

// TODO: Refactor props and id htmlFor. Maybe useId
export const Toggle: FC<IToggleProps> = ({
    labelLeft,
    labelRight,
    checked,
    isDark,
    setChecked,
}) => {
    const toggleId = useId()

    const variants = {
        checked: { x: '100%' },
        unchecked: { x: '0%' },
    }

    const handleToggle = (): void => {
        setChecked(!checked)
    }

    const labelCls = classNames(
        'cursor-pointer font-medium',
        isDark ? 'text-slate-200' : 'text-slate-800'
    )

    return (
        <Flex place="center">
            <button
                type="button"
                onClick={() => {
                    setChecked(false)
                }}
                className={labelCls}
            >
                {labelLeft}
            </button>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- fix */}
            <label
                htmlFor={toggleId}
                className="relative inline-block w-10 mr-2 ml-3 align-middle select-none transition duration-200 ease-in"
                onClick={handleToggle}
            >
                <input
                    type="checkbox"
                    name="toggle"
                    id={toggleId}
                    checked={checked}
                    onChange={handleToggle}
                    className="absolute left-0 block w-6 h-6 bg-white border-4 appearance-none cursor-pointer outline-none focus:outline-none opacity-0"
                    style={{
                        borderRadius: '1rem',
                        borderColor: checked ? 'transparent' : '#c1c1c1',
                    }}
                />
                <motion.div
                    initial={checked ? 'checked' : 'unchecked'}
                    animate={checked ? 'checked' : 'unchecked'}
                    variants={variants}
                    className={classNames(
                        'absolute left-0 block size-6  border-4  cursor-pointer rounded-full',
                        isDark
                            ? 'bg-slate-800 border-slate-400'
                            : 'bg-slate-100 border-slate-200'
                    )}
                />
                <span
                    className="block h-6 overflow-hidden bg-gray-300 cursor-pointer"
                    style={{
                        borderRadius: '1rem',
                    }}
                />
            </label>
            <button
                type="button"
                onClick={() => {
                    setChecked(true)
                }}
                className={labelCls}
            >
                {labelRight}
            </button>
        </Flex>
    )
}
