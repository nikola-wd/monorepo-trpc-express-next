import { z } from 'zod';

export const VS_reset_password = z
    .object({
        password: z.string().min(8, 'Password is required'),
        password_confirmation: z
            .string()
            .min(8, 'Password confirmation is required'),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
        if (password !== password_confirmation) {
            ctx.addIssue({
                code: 'custom',
                path: ['password_confirmation'],
                message: 'Passwords do not match',
            });
        }
    });

// extracting the type
export type TVS_reset_password = z.infer<typeof VS_reset_password>;
