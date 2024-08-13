const shared = [
    'transition',
    'inline-flex',
    'justify-center',
    'items-center',
    'rounded-md',
    'focus:outline-none',
    'text-center',
    'text-uppercase',
    'tracking-wider',
    'focus:ring-4',
    'focus:!ring-blue-200',
    'focus:ring-opacity-50',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
]

const variants = {
    theme: {
        primary: [
            'bg-violet-500',
            'text-white',
            'border-transparent',
            'hover:bg-violet-600',
        ],
        secondary: ['bg-red-400', 'text-white', 'hover:bg-red-500'],
        neutral: ['bg-white', 'text-slate-600', 'hover:bg-slate-100'],
        dark: ['bg-slate-800', 'hover:bg-slate-900', 'text-white'],
        ghost: ['bg-transparent', 'text-slate-600'],
        'dashed-dark': [
            'border-2',
            'border-dashed',
            'border-slate-400',
            'text-slate-400',
            'transition',
            'hover:border-slate-900',
            'hover:text-slate-900',
        ],
    },
    size: {
        small: ['text-sm', 'py-1', 'p-2'],
        medium: ['text-base', 'py-2', 'px-4'],
        wide: ['w-full', 'text-base', 'py-2', 'px-4'],
    },
    rounded: {
        none: ['rounded-none'],
        sm: ['rounded-sm'],
        md: ['rounded-md'],
        lg: ['rounded-lg'],
        full: ['rounded-full'],
    },
}

export { shared, variants }
