// import { sharedConfig } from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

// TODO: Fix shared Tailwind COnfig from packages. Here and in web
const config: Pick<Config, 'prefix' | 'presets' | 'content'> = {
    content: ['./src/**/*.tsx'],
    prefix: 'ui-',
    // presets: [sharedConfig],
    presets: [
        {
            theme: {
                extend: {
                    backgroundImage: {
                        'glow-conic':
                            'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
                    },
                },
            },
        },
    ],
};

export default config;
