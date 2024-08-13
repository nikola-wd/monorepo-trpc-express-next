import { z } from 'zod';
// TODO: Rename into signup
export const VS_signup_schema = z.object({
    email: z
        .string({
            required_error: 'Email is required',
            invalid_type_error: 'Email must be a string',
        })
        .min(5, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be a string',
        })
        .min(8, 'Password must be at least 8 characters long'),
    // TODO: Can TRegisterUser be used here
    registerAs: z.enum(['owner', 'client'], {
        required_error: 'registerAs as is required',
    }),
});

// extracting the type
export type TVS_signup_schema = z.infer<typeof VS_signup_schema>;
